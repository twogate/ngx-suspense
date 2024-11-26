import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({ selector: '[ngxSuspenseErrorView]', standalone: true })
export class ErrorViewDirective {
  readonly templateRef = inject(TemplateRef);
}
