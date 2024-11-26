import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({ selector: '[ngxSuspenseFallbackView]', standalone: true })
export class FallbackViewDirective {
  readonly templateRef = inject(TemplateRef);
}
