import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent}  from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { Product } from '../../../../shared/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { ProductListComponent } from '../../components/product/product-list/product-list.component';

@Component({
  selector: 'app-product-list-page',
  imports: [CommonModule, ProductListComponent, LoadingSpinnerComponent, PaginationComponent],
  templateUrl: './product-list-page.html',
  standalone: true,
  styleUrl: './product-list-page.css'
})
export class ProductListPage implements OnInit {
  products: Product[] = [];
  isLoading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;

  productService: ProductService = inject(ProductService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.loadPage();
  }

  private loadPage(): void {
    this.isLoading = true;
    this.productService.getPagedProducts(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.products = response.items;
        this.totalCount = response.totalCount;
      },
      error: (error) => {
        console.log('Error fetching products', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onAddProduct() {
    this.router.navigate(['/products/new']);
  }

  onProductSelected(product: Product): void {
    this.router.navigate(['/products/edit', product.id]);
  }

  onProductDelete(product: Product): void {
    if (!confirm(`Delete product: "${product.name}"?`)) return;

    this.productService.deleteProductById(product.id).subscribe({
      next: (response) => {
        // After deletion, reload the page and adjust current page if needed
        this.totalCount = Math.max(0, this.totalCount - 1);
        const lastPage = Math.max(1, Math.ceil(this.totalCount / this.pageSize));
        if (this.currentPage > lastPage) {
          this.currentPage = lastPage;
        }
        this.loadPage();
      },
      error: (error) => {
        console.log('Error deleting product', error);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPage();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
    this.loadPage();
  }
}
