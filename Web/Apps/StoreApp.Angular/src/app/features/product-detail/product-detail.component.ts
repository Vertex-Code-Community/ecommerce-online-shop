import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, AsyncPipe, LoadingIndicatorComponent, ReviewListComponent, ProductInfoComponent, ProductListComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private store = inject(Store<AppState>);
  private destroy$ = new Subject<void>();

  productId: number = 0;

  currentProduct$: Observable<FullProduct | null> = this.store.select(selectCurrentProduct);
  isLoading$: Observable<boolean> = this.store.select(selectProductLoading);
  error$: Observable<any> = this.store.select(selectProductError);

  reviews$: Observable<Review[]> = this.store.select(selectReviews);
  reviewsLoading$: Observable<boolean> = this.store.select(selectReviewsLoading);
  reviewsError$: Observable<any> = this.store.select(selectReviewsError);

  alsoLikeProducts$: Observable<Product[]> = this.store.select(selectTopSellingProducts);
  alsoLikeLoading$: Observable<boolean> = this.store.select(selectProductLoading);
  alsoLikeError$: Observable<any> = this.store.select(selectTopSellingError);

  isAuthenticated$: Observable<boolean> = this.store.select(selectIsAuthenticated);

  ngOnInit(): void {
    this.store.dispatch(HomeActions.loadTopSellingProducts());
    
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
