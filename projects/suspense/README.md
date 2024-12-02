# `@twogate/ngx-suspense`

`ngx-suspense` is a library that handle asynchronous data by showing loading and error content based on an Observable's state. pass your Observable and templates for loading and error states, and ngx-suspense manages the rest with minimal code.

This library offers two approaches:

- Structural Directives
- Components

Choose the one that best fits your application.

## Installation

```bash
npm install @twogate/ngx-suspense
```

## Using Structural Directive

```typescript
import { Component } from '@angular/core';
import { timer } from 'rxjs';

import { SuspenseComponents } from '@twogate/ngx-suspense';

@Component({
  imports: [SuspenseComponents],
})
export class SomeComponent {
  source$ = timer(5000);
}
```

```html
<ng-container *ngxSuspense="source$; fallback Fallback; error Error"> Loaded</ng-container>
<ng-template #Fallback> Loading... </ng-template>
<ng-template #Error> Error </ng-template>
```

### Accessing Observable Values in Templates

```html
<ng-container *ngxSuspense="source$; let data = value"> Loaded {{ data }}</ng-container>
```

```html
<ng-template
  [ngxSuspense]="source$"
  [ngxSuspenseFallback]="Loading"
  [ngxSuspenseError]="Error"
  let-data="value"
  (errorCaptured)="onError($event)"
  (completed)="onNext($event)"
>
  Loaded
</ng-template>
<ng-template #Loading>loading ...</ng-template>
<ng-template #Error let-error="error">Error: {{ error }}</ng-template>
```

## Using Component

```typescript
import { SuspenseComponents } from '@twogate/ngx-suspense';

@Component({
  standalone: true,
  imports: [SuspenseComponents],
})
export class SomeComponent {
  source$ = timer(5000);
}
```

```html
<ngx-suspense [source]="source$">
  <ng-template ngxSuspenseAsyncView> Loaded </ng-template>
  <ng-template ngxSuspenseFallbackView> Loading... </ng-template>
  <ng-template ngxSuspenseErrorView> Error </ng-template>
</ngx-suspense>
```

### Refresh

```html
<tbx-suspense #suspense [source]="source$"></tbx-suspense>
```

```typescript
export class SomeComponent {
  @ViewChild('suspense') suspense: SuspenseComponent;

  refresh() {
    this.suspense.refreshManually({
      didComplete: () => {
        // on complete hook
      },
    });
  }
}
```

### Accessing Observable Values in Templates

```html
<tbx-suspense [source]="source$" (errorCaptured)="onError($event)" (completed)="onNext($event)"></tbx-suspense>
```

## Using Common Components

```typescript
providers: [
  provideDefaultSuspenseFallbackComponent(CommonLoadingComponent, {
    message: 'Loading...',
    spinnerSize: 'large',
    theme: 'dark',
  }),
  provideDefaultSuspenseErrorComponent(CommonErrorComponent),
];
```
