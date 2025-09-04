import { Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';
import { StartComponent } from './components/start/start.component';
import { BrandsComponent } from './components/brands/brands.component';
import { StylesComponent } from './components/styles/styles.component';
import { CustomerReviewsComponent } from './components/customer-reviews/customer-reviews.component';
import { AppState } from '../../store/app.state';
import { Product } from '../../shared/models/product/product';
import { 
  selectTopSellingProducts, 
  selectNewArrivals, 
  selectTopSellingLoading, 
  selectNewArrivalsLoading,
  selectTopSellingError,
  selectNewArrivalsError
} from '../../store/home/home.selectors';
import { loadTopSellingProducts, loadNewArrivals } from '../../store/home/home.actions';
import { MOCK_STYLES } from '../../mocks/styles.mock';
import { MOCK_BRANDS } from '../../mocks/brands.mock';
import { MOCK_REVIEWS } from '../../mocks/reviews.mock';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductListComponent, StartComponent, BrandsComponent, StylesComponent, CustomerReviewsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private store = inject(Store<AppState>);

  // Top Selling Products
  topSellingProducts$: Observable<Product[]> = this.store.select(selectTopSellingProducts);
  topSellingLoading$: Observable<boolean> = this.store.select(selectTopSellingLoading);
  topSellingError$: Observable<any> = this.store.select(selectTopSellingError);

  // New Arrivals
  newArrivals$: Observable<Product[]> = this.store.select(selectNewArrivals);
  newArrivalsLoading$: Observable<boolean> = this.store.select(selectNewArrivalsLoading);
  newArrivalsError$: Observable<any> = this.store.select(selectNewArrivalsError);

  ngOnInit(): void {
    // Завантажуємо обидва списки продуктів
    this.store.dispatch(loadTopSellingProducts());
    this.store.dispatch(loadNewArrivals());
  }

  protected readonly MOCK_STYLES = MOCK_STYLES;
  protected readonly MOCK_BRANDS = MOCK_BRANDS;
  protected readonly MOCK_REVIEWS = MOCK_REVIEWS;
}
