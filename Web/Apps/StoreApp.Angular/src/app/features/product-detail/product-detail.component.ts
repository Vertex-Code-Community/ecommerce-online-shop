import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule, AsyncPipe } from '@angular/common';
import { LoadingIndicatorComponent } from '../../shared/components/loading-indicator/loading-indicator.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { ProductInfoComponent, ProductSelection } from './components/product-info/product-info.component';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';
import { FullProduct } from '../../shared/models/product/fullProduct';
import { Product } from '../../shared/models/product/product';
import { Review } from '../../shared/models/review/review';
import { AppState } from '../../store/app.state';
import * as ProductActions from '../../store/products/product.actions';
import { selectCurrentProduct, selectProductLoading, selectProductError } from '../../store/products/product.selectors';
import * as ReviewActions from '../../store/reviews/review.actions';
import { selectReviews, selectReviewsLoading, selectReviewsError } from '../../store/reviews/review.selectors';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, AsyncPipe, LoadingIndicatorComponent, ReviewListComponent, ProductInfoComponent, ProductListComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  productId: number = 0;
  
  // Product observables
  currentProduct$: Observable<FullProduct | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<any>;
  
  // Review observables
  reviews$: Observable<Review[]>;
  reviewsLoading$: Observable<boolean>;
  reviewsError$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    // Product selectors
    this.currentProduct$ = this.store.select(selectCurrentProduct);
    this.isLoading$ = this.store.select(selectProductLoading);
    this.error$ = this.store.select(selectProductError);
    
    // Review selectors
    this.reviews$ = this.store.select(selectReviews);
    this.reviewsLoading$ = this.store.select(selectReviewsLoading);
    this.reviewsError$ = this.store.select(selectReviewsError);
  }



  // Demo "Also Like" products (можна залишити поки немає API для related products)
  alsoLikeProducts: Product[] = [
    {
      id: 2,
      name: 'Polo with Contrast Trims',
      description: 'Classic polo shirt with modern contrast details',
      price: 212,
      imageUrl: 'https://via.placeholder.com/300x300/4F46E5/FFFFFF?text=Polo+Shirt',
      discount: 0.2,
      rating: 4.0,
      unitsInStock: 50
    },
    {
      id: 3,
      name: 'Gradient Graphic T-shirt',
      description: 'Modern gradient design perfect for casual wear',
      price: 145,
      imageUrl: 'https://via.placeholder.com/300x300/EF4444/FFFFFF?text=Gradient+Tee',
      rating: 3.5,
      unitsInStock: 30
    },
    {
      id: 4,
      name: 'Polo with Tipping Details',
      description: 'Premium polo with distinctive tipping accents',
      price: 180,
      imageUrl: 'https://via.placeholder.com/300x300/10B981/FFFFFF?text=Tipping+Polo',
      rating: 4.5,
      unitsInStock: 25
    },
    {
      id: 5,
      name: 'Black Striped T-shirt',
      description: 'Classic black and white striped design',
      price: 120,
      imageUrl: 'https://via.placeholder.com/300x300/1F2937/FFFFFF?text=Striped+Tee',
      discount: 0.3,
      rating: 4.5,
      unitsInStock: 40
    }
  ];

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      this.productId = +params['id'] || 1;
      this.loadProduct();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProduct(): void {
    this.store.dispatch(ProductActions.loadProduct({ id: this.productId }));
    this.loadReviews();
  }

  loadReviews(): void {
    this.store.dispatch(ReviewActions.loadProductReviews({ productId: this.productId }));
  }

  onProductAddToCart(selection: ProductSelection): void {
    console.log('Product added to cart:', selection);
    // Тут можна додати логіку додавання в кошик через NgRx
    const colorName = selection.selectedProductDetail?.colorName || 'Unknown';
    const sizeName = selection.selectedProductDetail?.sizeName || 'Unknown';
    alert(`Added to cart: ${selection.quantity}x Product (${colorName}, ${sizeName})`);
  }

  onWriteReview(): void {
    console.log('Write review clicked');
    // Тут можна додати навігацію до сторінки написання відгуку
    alert('Write review functionality would be implemented here');
  }

  onAlsoLikeProductClick(product: Product): void {
    console.log('Also like product clicked:', product);
    // Навігація до сторінки продукту
    this.router.navigate(['/products', product.id]);
  }
}