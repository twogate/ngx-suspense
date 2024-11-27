import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { SuspenseComponents } from '@twogate/ngx-suspense';
import { concatMap, throwError, timer } from 'rxjs';
import { LoadedComponent } from '../loaded/loaded.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-demo-page',
  imports: [SuspenseComponents, LoadedComponent, SpinnerComponent],
  templateUrl: './demo-page.component.html',
  styleUrl: './demo-page.component.scss',
})
export class DemoPageComponent {
  source1$ = timer(3000);
  source2$ = timer(3000).pipe(concatMap(() => throwError(() => new Error('error'))));
  fetchRandomDog$;

  private readonly http = inject(HttpClient);

  constructor() {
    this.fetchRandomDog$ = this.fetchRandomDog();
  }

  refreshDog() {
    this.fetchRandomDog$ = this.fetchRandomDog();
  }

  fetchRandomDog() {
    return this.http.get<{
      message: string;
    }>('https://dog.ceo/api/breeds/image/random');
  }
}
