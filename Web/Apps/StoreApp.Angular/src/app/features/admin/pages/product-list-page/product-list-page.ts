import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductListComponent } from '../../components/product/product-list/product-list.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { AppState } from '../../../../store/app.state';
import { Product } from '../../../../shared/models/product/product';
import {
  selectCurrentPage, selectPageSize,
  selectProductLoading,
  selectProducts,
  selectTotalCount
} from '../../../../store/products/product.selectors';
import * as ProductActions from '../../../../store/products/product.actions';
import { combineLatest } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-list-page',
  imports: [CommonModule, ProductListComponent, LoadingSpinnerComponent, PaginationComponent, AsyncPipe],
  templateUrl: './product-list-page.html',
  standalone: true,
  styleUrls: ['./product-list-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListPage implements OnInit {
  private store = inject(Store<AppState>);
  private router = inject(Router);

  productData$ = combineLatest({
    products: this.store.select(selectProducts),
    totalCount: this.store.select(selectTotalCount),
    currentPage: this.store.select(selectCurrentPage),
    pageSize: this.store.select(selectPageSize),
    isLoading: this.store.select(selectProductLoading)
  });

  ngOnInit(): void {
    setTimeout(() => {
      this.store.dispatch(ProductActions.loadProducts());
    }, 0);
  }

  onAddProduct() {
    this.router.navigate(['/products/new']);
  }

  onProductSelected(product: Product) {
    if (!product?.id) return;
    this.router.navigate(['/products/edit', product.id]);
  }

  onProductDelete(product: Product) {
    if (!product?.id || !product?.name) return;
    if (!confirm(`Delete product: "${product.name}"?`)) return;
    this.store.dispatch(ProductActions.deleteProduct({ id: product.id }));
  }

  onPageChange(page: number) {
    if (!page || page < 1) return;
    this.store.dispatch(ProductActions.setCurrentPage({ page }));
  }

  onPageSizeChange(size: number) {
    if (!size || size < 1) return;
    this.store.dispatch(ProductActions.setPageSize({ pageSize: size }));
  }
}
