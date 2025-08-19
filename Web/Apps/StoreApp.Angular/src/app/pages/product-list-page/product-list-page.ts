import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../../components/product/product-list/product-list.component';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from "../../components/loading-spinner/loading-spinner.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";

@Component({
  selector: 'app-product-list-page',
  imports: [CommonModule, ProductListComponent, LoadingSpinnerComponent, PaginationComponent],
  templateUrl: './product-list-page.html',
  styleUrl: './product-list-page.css'
})
export class ProductListPage implements OnInit {
  
  products: Product[] = [];
  isLoading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

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
