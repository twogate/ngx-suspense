import {
  ChangeDetectorRef,
  EventEmitter,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  filter,
  firstValueFrom,
  from,
  take,
} from 'rxjs';

import {
  DEFAULT_SUSPENSE_ERROR_COMPONENT,
  DEFAULT_SUSPENSE_FALLBACK_COMPONENT,
  SuspenseComponentData,
  SuspenseRefreshOptions,
  SuspenseViewState,
} from './suspense.type';

function isPromise<T = any>(obj: any): obj is Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return !!obj && typeof obj.then === 'function';
}

export abstract class SuspenseBase<T> {
  abstract errorCaptured: EventEmitter<any>;
  abstract completed: EventEmitter<T>;

  viewState: SuspenseViewState = 'fallback';
  currentSource!: Observable<T>;

  abstract defaultView: TemplateRef<unknown>;
  abstract fallbackView: TemplateRef<unknown> | undefined;
  abstract errorView: TemplateRef<unknown> | undefined;

  protected readonly cdRef = inject(ChangeDetectorRef);
  protected readonly defaultFallbackComponent = inject(
    DEFAULT_SUSPENSE_FALLBACK_COMPONENT,
    { optional: true }
  );
  protected readonly defaultErrorComponent = inject(
    DEFAULT_SUSPENSE_ERROR_COMPONENT,
    { optional: true }
  );
  protected abstract readonly viewContainerRef: ViewContainerRef;
  protected readonly readyViewInit$ = new BehaviorSubject(false);

  private subscription?: Subscription;

  get viewReady() {
    return firstValueFrom(this.readyViewInit$.pipe(filter((v) => v)));
  }

  setSource(source: Observable<T> | Promise<T>) {
    if (isPromise(source)) {
      this.currentSource = from(source);
    } else {
      this.currentSource = source;
    }
    this.refreshManually();
  }

  refreshManually(options?: SuspenseRefreshOptions) {
    this.viewState = 'fallback';
    this.onFallback();

    this.subscription?.unsubscribe();
    this.subscription = this.currentSource.pipe(take(1)).subscribe({
      next: (value) => {
        this.onComplete(value);
        this.completed.emit(value);
        if (options?.didComplete) {
          options.didComplete();
        }
      },
      error: (error) => {
        this.onError(error);
        if (options?.didComplete) {
          options.didComplete();
        }
      },
    });
  }

  protected async onFallback() {
    await this.viewReady;

    this.viewState = 'fallback';
    this.updateView(
      this.viewContainerRef,
      this.fallbackView,
      this.defaultFallbackComponent
    );
    this.cdRef.detectChanges();
  }

  protected async onError(error: unknown) {
    await this.viewReady;

    this.viewState = 'error';
    this.updateView(
      this.viewContainerRef,
      this.errorView,
      this.defaultErrorComponent,
      { error }
    );
    this.errorCaptured.emit(error);
    this.cdRef.detectChanges();
  }

  protected async onComplete(value: T) {
    await this.viewReady;

    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(this.defaultView, { value });
    this.viewState = 'resolve';
    this.cdRef.detectChanges();
  }

  protected updateView(
    viewContainerRef: ViewContainerRef,
    templateRef: TemplateRef<unknown> | undefined,
    defaultComponentData?: SuspenseComponentData | null,
    context?: unknown
  ) {
    viewContainerRef.clear();

    if (templateRef) {
      viewContainerRef.createEmbeddedView(templateRef, context);
    } else if (defaultComponentData) {
      const { component, componentProps } = defaultComponentData;
      const componentRef = viewContainerRef.createComponent(component);
      if (componentProps) {
        Object.entries(componentProps).forEach(([key, value]) => {
          (componentRef.instance as Record<string, unknown>)[key] = value;
        });
        Object.entries(context ?? {}).forEach(([key, value]) => {
          (componentRef.instance as Record<string, unknown>)[key] = value;
        });
      }
    }
  }
}
