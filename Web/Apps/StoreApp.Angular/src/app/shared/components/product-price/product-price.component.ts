import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss'],
  standalone: true,
  imports: [CurrencyPipe]
})
export class ProductPriceComponent {
  @Input() currentPrice: number = 0;
  @Input() oldPrice?: number;
  @Input() discount?: number;
  @Input() textSize: string = '1em';
}
