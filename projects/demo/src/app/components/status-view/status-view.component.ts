import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status-view',
  imports: [NgClass],
  templateUrl: './status-view.component.html',
  styleUrl: './status-view.component.scss',
})
export class StatusViewComponent {
  status = input.required<'loading' | 'error' | 'loaded'>();
  message = input.required<string>();
}
