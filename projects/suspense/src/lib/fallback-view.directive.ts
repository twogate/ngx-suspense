import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({ selector: '[susFallbackView]', standalone: true })
export class FallbackViewDirective {
  readonly templateRef = inject(TemplateRef);
}
