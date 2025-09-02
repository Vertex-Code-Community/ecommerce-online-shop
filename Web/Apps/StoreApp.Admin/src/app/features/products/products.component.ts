import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product/product';
import { ProductListComponent } from './product-list/product-list.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { ConfirmationModalComponent } from '../../shared/components/confirmation-modal/confirmation-modal.component';
import * as ProductSelectors from '../../store/products/product.selectors';
import * as ProductActions from '../../store/products/product.actions';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ProductListComponent, PaginationComponent, ConfirmationModalComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  private store = inject(Store);
  private router = inject(Router);

  products$: Observable<Product[]> = this.store.select(ProductSelectors.selectProducts);
  currentPage$: Observable<number> = this.store.select(ProductSelectors.selectCurrentPage);
  totalPages$: Observable<number> = this.store.select(ProductSelectors.selectTotalPages);
  totalCount$: Observable<number> = this.store.select(ProductSelectors.selectTotalCount);
  pageSize$: Observable<number> = this.store.select(ProductSelectors.selectPageSize);

  showDeleteModal = false;
  productToDelete: Product | null = null;
  deleteModalMessage = '';

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
    this.productToDelete = product;
    this.deleteModalMessage = `Are you sure you want to delete "${product.name}"? This action cannot be undone.`;
    this.showDeleteModal = true;
  }

  onConfirmDelete(): void {
    if (this.productToDelete) {
      this.store.dispatch(ProductActions.deleteProduct({ id: this.productToDelete.id }));
      this.closeDeleteModal();
    }
  }

  onCancelDelete(): void {
    this.closeDeleteModal();
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.productToDelete = null;
  }

  onPageChange(page: number): void {
    this.store.dispatch(ProductActions.setCurrentPage({ page }));
  }

  onPageSizeChange(pageSize: number): void {
    this.store.dispatch(ProductActions.setPageSize({ pageSize }));
  }
}
