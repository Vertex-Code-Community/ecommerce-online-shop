import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductRatingComponent } from '../product-rating/product-rating.component';
import { ProductPriceComponent } from '../product-price/product-price.component';
import { Product } from '../../models/product/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [ProductRatingComponent, ProductPriceComponent]
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() cardClick = new EventEmitter<Product>();

  onCardClick(): void {
    this.cardClick.emit(this.product);
  }

  getOldPrice(): number {
    if (this.product.discount) {
      return this.product.price / (1 - this.product.discount / 100);
    }
    return this.product.price;
  }
}
