import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.css'],
  standalone: true
})
export class ProductRatingComponent {
  @Input() rating: number = 0;
  @Input() textSize: string = '1em';
  @Input() showText: boolean = true;

  getStarsArray(): number[] {
    return Array.from({ length: Math.floor(this.rating) }, (_, i) => i);
  }
}
