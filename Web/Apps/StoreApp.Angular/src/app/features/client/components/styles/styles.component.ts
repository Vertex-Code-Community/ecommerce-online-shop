import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StyleItem {
  name: string;
  imagePath: string;
  isSmall: boolean;
}

@Component({
  selector: 'app-styles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.css']
})
export class StylesComponent {
  @Input() styles: StyleItem[] = [];

  getStyleClass(item: StyleItem): string {
    return item.isSmall ? 'small-style-item' : 'wide-style-item';
  }
}
