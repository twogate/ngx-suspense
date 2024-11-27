import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-default-error',
  imports: [],
  templateUrl: './default-error.component.html',
  styleUrl: './default-error.component.scss',
})
export class DefaultErrorComponent {
  @Input() message = 'Something went wrong';
  @Input() error: unknown;
}
