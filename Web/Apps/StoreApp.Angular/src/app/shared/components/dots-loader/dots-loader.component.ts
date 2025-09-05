import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dots-loader',
  standalone: true,
  imports: [],
  templateUrl: './dots-loader.component.html',
  styleUrl: './dots-loader.component.scss'
})
export class DotsLoaderComponent {
  @Input() color: string = '#000000';
  @Input() size: number = 8; // розмір крапки в пікселях
  @Input() animationDuration: number = 1.4; // тривалість анімації в секундах
}
