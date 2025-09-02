import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  private router = inject(Router);

  products$: Observable<Product[]> = this.store.select(ProductSelectors.selectProducts);

  constructor() {
    this.store.dispatch(ProductActions.loadProducts());
  }

  onCreate(): void {
    this.router.navigate(['/products/create']);
  }

  onEdit(product: Product): void {
    this.router.navigate(['/products/edit', product.id]);
  }

  onDelete(product: Product): void {
    // TODO: Add confirmation dialog
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      this.store.dispatch(ProductActions.deleteProduct({ id: product.id }));
    }
  }
}
