import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule, AsyncPipe } from '@angular/common';
import { LoadingIndicatorComponent } from '../../shared/components/loading-indicator/loading-indicator.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';
import { FullProduct } from '../../shared/models/product/fullProduct';
import { Product } from '../../shared/models/product/product';
import { Review } from '../../shared/models/review/review';
import { AppState } from '../../store/app.state';
import * as ProductActions from '../../store/products/product.actions';
import * as HomeActions from '../../store/home/home.actions';
import {
  selectCurrentProduct,
  selectProductLoading,
  selectProductError
} from '../../store/products/product.selectors';
import * as ReviewActions from '../../store/reviews/review.actions';
import { selectReviews, selectReviewsLoading, selectReviewsError } from '../../store/reviews/review.selectors';
import { selectTopSellingError, selectTopSellingProducts } from '../../store/home/home.selectors';

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
    private store: Store<AppState>
  ) {
    this.currentProduct$ = this.store.select(selectCurrentProduct);
    this.isLoading$ = this.store.select(selectProductLoading);
    this.error$ = this.store.select(selectProductError);

    this.reviews$ = this.store.select(selectReviews);
    this.reviewsLoading$ = this.store.select(selectReviewsLoading);
    this.reviewsError$ = this.store.select(selectReviewsError);

    this.store.dispatch(HomeActions.loadTopSellingProducts());
    this.alsoLikeProducts$ = this.store.select(selectTopSellingProducts);
    this.alsoLikeLoading$ = this.store.select(selectProductLoading);
    this.alsoLikeError$ = this.store.select(selectTopSellingError);
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

  onWriteReview(): void {
    console.log('Write review clicked');
  }
}
