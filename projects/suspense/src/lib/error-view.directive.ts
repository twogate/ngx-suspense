import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({ selector: '[susErrorView]', standalone: true })
export class ErrorViewDirective {
  readonly templateRef = inject(TemplateRef);
}
