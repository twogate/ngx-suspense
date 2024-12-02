import {
  AfterViewInit,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Observable } from 'rxjs';

import { SuspenseBase } from './suspense-base';

@Directive({
  selector: '[ngxSuspense]',
  standalone: true,
})
export class SuspenseDirective<T = unknown> extends SuspenseBase<T> implements AfterViewInit {
  @Input('ngxSuspense')
  set source(source: Observable<T> | Promise<T>) {
    this.setSource(source);
  }

  @Output()
  errorCaptured = new EventEmitter<any>();

  @Output()
  completed = new EventEmitter<T>();

  @Input('ngxSuspenseFallback')
  fallbackView!: TemplateRef<unknown>;

  @Input('ngxSuspenseError')
  errorView!: TemplateRef<unknown>;

  defaultView = inject(TemplateRef);
  readonly viewContainerRef = inject(ViewContainerRef);

  ngAfterViewInit() {
    this.readyViewInit$.next(true);
  }

  static ngTemplateContextGuard<U>(_directive: SuspenseDirective<U>, context: unknown): context is { value: U } {
    return true;
  }
}
