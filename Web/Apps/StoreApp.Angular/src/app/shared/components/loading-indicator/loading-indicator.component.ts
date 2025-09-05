import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  imports: [],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.scss'
})
export class LoadingIndicatorComponent {
  @Input() text: string = 'Loading...';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: string = '#000000';
}