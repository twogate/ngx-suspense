import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideDefaultSuspenseErrorComponent, provideDefaultSuspenseFallbackComponent } from '@twogate/ngx-suspense';
import { routes } from './app.routes';
import { DefaultErrorComponent } from './components/default-error/default-error.component';
import { DefaultFallbackComponent } from './components/default-fallback/default-fallback.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideDefaultSuspenseFallbackComponent(DefaultFallbackComponent, { message: 'default message' }),
    provideDefaultSuspenseErrorComponent(DefaultErrorComponent, { message: 'default error' }),
  ],
};
