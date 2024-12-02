import { Component, InjectionToken, Type } from '@angular/core';

export type SuspenseViewState = 'resolve' | 'fallback' | 'error';

export interface SuspenseComponentData<T = Component> {
  component: Type<T>;
  componentProps?: Partial<T>;
}
export const DEFAULT_SUSPENSE_FALLBACK_COMPONENT = new InjectionToken<SuspenseComponentData>(
  'SuspenseFallbackComponent',
);
export const DEFAULT_SUSPENSE_ERROR_COMPONENT = new InjectionToken<SuspenseComponentData>('SuspenseErrorComponent');

export interface SuspenseRefreshOptions {
  didComplete?: () => void;
}
