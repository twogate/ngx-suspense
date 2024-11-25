import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({ selector: '[susAsyncView]', standalone: true })
export class AsyncViewDirective {
  readonly templateRef = inject(TemplateRef);
}
