import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({ selector: '[ngxSuspenseAsyncView]', standalone: true })
export class AsyncViewDirective {
  readonly templateRef = inject(TemplateRef);
}
