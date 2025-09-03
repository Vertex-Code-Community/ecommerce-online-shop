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
import {
  selectCurrentProduct,
  selectProductLoading,
  selectProductError,
  selectProducts
} from '../../store/products/product.selectors';
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

  currentProduct$: Observable<FullProduct | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<any>;

  reviews$: Observable<Review[]>;
  reviewsLoading$: Observable<boolean>;
  reviewsError$: Observable<any>;

  alsoLikeProducts$: Observable<Product[]>;
  alsoLikeLoading$: Observable<boolean>;
  alsoLikeError$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.currentProduct$ = this.store.select(selectCurrentProduct);
    this.isLoading$ = this.store.select(selectProductLoading);
    this.error$ = this.store.select(selectProductError);

    this.reviews$ = this.store.select(selectReviews);
    this.reviewsLoading$ = this.store.select(selectReviewsLoading);
    this.reviewsError$ = this.store.select(selectReviewsError);

    this.store.dispatch(ProductActions.loadProducts());
    this.alsoLikeProducts$ = this.store.select(selectProducts);
    this.alsoLikeLoading$ = this.store.select(selectProductLoading);
    this.alsoLikeError$ = this.store.select(selectProductError);
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)
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
    console.log('Add to cart clicked with selection:', selection);
  }

  onWriteReview(): void {
    console.log('Write review clicked');
  }

  onAlsoLikeProductClick(product: Product): void {
    console.log('Also like product clicked:', product);
    this.router.navigate(['/products', product.id]);
  }
}
