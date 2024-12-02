import { Provider, Type } from '@angular/core';

import { DEFAULT_SUSPENSE_ERROR_COMPONENT, DEFAULT_SUSPENSE_FALLBACK_COMPONENT } from './suspense.type';

export function provideDefaultSuspenseFallbackComponent<T>(component: Type<T>, componentProps?: Partial<T>): Provider {
  return {
    provide: DEFAULT_SUSPENSE_FALLBACK_COMPONENT,
    useValue: { component, componentProps },
  };
}

export function provideDefaultSuspenseErrorComponent<T>(component: Type<T>, componentProps?: Partial<T>): Provider {
  return {
    provide: DEFAULT_SUSPENSE_ERROR_COMPONENT,
    useValue: { component, componentProps },
  };
}
