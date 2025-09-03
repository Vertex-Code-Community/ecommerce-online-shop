import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { Product } from '../../models/product/product';
import {LoadingIndicatorComponent} from '../loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [ProductComponent, LoadingIndicatorComponent]
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Input() headerText: string = '';
  @Input() showViewAllButton: boolean = true;
  @Input() isScrollable: boolean = false;
  @Input() isLoading: boolean = false;

  @Output() productClick = new EventEmitter<Product>();
  @Output() viewAllClick = new EventEmitter<void>();

  onProductClick(product: Product): void {
    this.productClick.emit(product);
  }

  onViewAllClick(): void {
    this.viewAllClick.emit();
  }
}
