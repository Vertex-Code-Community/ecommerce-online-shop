import { Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';
import { StartComponent } from './components/start/start.component';
import { BrandsComponent } from './components/brands/brands.component';
import { StylesComponent } from './components/styles/styles.component';
import { CustomerReviewsComponent } from './components/customer-reviews/customer-reviews.component';
import { DotsLoaderComponent } from '../../shared/components/dots-loader/dots-loader.component';
import { AppState } from '../../store/app.state';
import { Product } from '../../shared/models/product/product';
import { Review } from '../../shared/models/review/review';
import {
  selectTopSellingProducts,
  selectNewArrivals,
  selectTopSellingLoading,
  selectNewArrivalsLoading,
  selectTopSellingError,
  selectNewArrivalsError,
  selectTopRatingReviews,
  selectTopRatingReviewsLoading,
  selectTopRatingReviewsError
} from '../../store/home/home.selectors';
import { loadTopSellingProducts, loadNewArrivals, loadTopRatingReviews } from '../../store/home/home.actions';
import { MOCK_STYLES } from '../../mocks/styles.mock';
import { MOCK_BRANDS } from '../../mocks/brands.mock';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductListComponent, StartComponent, BrandsComponent, StylesComponent, CustomerReviewsComponent, DotsLoaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private store = inject(Store<AppState>);

  topSellingProducts$: Observable<Product[]> = this.store.select(selectTopSellingProducts);
  topSellingLoading$: Observable<boolean> = this.store.select(selectTopSellingLoading);
  topSellingError$: Observable<any> = this.store.select(selectTopSellingError);

  newArrivals$: Observable<Product[]> = this.store.select(selectNewArrivals);
  newArrivalsLoading$: Observable<boolean> = this.store.select(selectNewArrivalsLoading);
  newArrivalsError$: Observable<any> = this.store.select(selectNewArrivalsError);

  topRatingReviews$: Observable<Review[]> = this.store.select(selectTopRatingReviews);
  topRatingReviewsLoading$: Observable<boolean> = this.store.select(selectTopRatingReviewsLoading);
  topRatingReviewsError$: Observable<any> = this.store.select(selectTopRatingReviewsError);

  ngOnInit(): void {
    this.store.dispatch(loadTopSellingProducts());
    this.store.dispatch(loadNewArrivals());
    this.store.dispatch(loadTopRatingReviews());
  }

  protected readonly MOCK_STYLES = MOCK_STYLES;
  protected readonly MOCK_BRANDS = MOCK_BRANDS;
}
