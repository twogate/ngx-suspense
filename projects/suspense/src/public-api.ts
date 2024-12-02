/*
 * Public API Surface of suspense
 */

import { AsyncViewDirective } from './lib/async-view.directive';
import { ErrorViewDirective } from './lib/error-view.directive';
import { FallbackViewDirective } from './lib/fallback-view.directive';
import { SuspenseComponent } from './lib/suspense.component';
import { SuspenseDirective } from './lib/suspense.directive';

export * from './lib/suspense-providers';
export * from './lib/suspense.type';
export { AsyncViewDirective, ErrorViewDirective, FallbackViewDirective, SuspenseComponent, SuspenseDirective };

export const SuspenseComponents = [
  SuspenseComponent,
  AsyncViewDirective,
  ErrorViewDirective,
  FallbackViewDirective,
  SuspenseDirective,
] as const;
