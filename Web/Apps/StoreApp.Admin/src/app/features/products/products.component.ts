import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product/product';
import { ProductListComponent } from './product-list/product-list.component';
import * as ProductSelectors from '../../store/products/product.selectors';
import * as ProductActions from '../../store/products/product.actions';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  private store = inject(Store);

  products$: Observable<Product[]> = this.store.select(ProductSelectors.selectProducts);

  constructor() {
    this.store.dispatch(ProductActions.loadProducts());
  }

  onCreate(): void {}
  onProductClick(_: Product): void {}
  onEdit(product: Product): void {}
  onDelete(product: Product): void {}
}
