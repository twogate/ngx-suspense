import { Component, Input } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-default-fallback',
  imports: [SpinnerComponent],
  templateUrl: './default-fallback.component.html',
  styleUrl: './default-fallback.component.scss',
})
export class DefaultFallbackComponent {
  @Input() message = 'loading...';
}
