import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';

import { AsyncViewDirective } from './async-view.directive';
import { ErrorViewDirective } from './error-view.directive';
import { FallbackViewDirective } from './fallback-view.directive';
import { SuspenseBase } from './suspense-base';

@Component({
  selector: 'ngx-suspense',
  standalone: true,
  imports: [CommonModule],
  template: ` <ng-template #anchor></ng-template> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuspenseComponent<T = unknown>
  extends SuspenseBase<T>
  implements AfterViewInit
{
  @Input()
  set source(source: Observable<T> | Promise<T>) {
    this.setSource(source);
  }

  @Output()
  errorCaptured = new EventEmitter<any>();

  @Output()
  completed = new EventEmitter<T>();

  @ViewChild('anchor', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;

  @ContentChild(AsyncViewDirective, { read: TemplateRef })
  defaultView!: TemplateRef<unknown>;

  @ContentChild(FallbackViewDirective, { read: TemplateRef })
  fallbackView!: TemplateRef<unknown>;

  @ContentChild(ErrorViewDirective, { read: TemplateRef })
  errorView!: TemplateRef<unknown>;

  ngAfterViewInit() {
    this.readyViewInit$.next(true);
  }
}
