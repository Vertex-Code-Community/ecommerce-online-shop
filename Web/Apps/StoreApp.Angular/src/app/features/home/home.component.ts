import { Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';
import { StartComponent } from './components/start/start.component';
import { BrandsComponent } from './components/brands/brands.component';
import { StylesComponent } from './components/styles/styles.component';
import { CustomerReviewsComponent } from './components/customer-reviews/customer-reviews.component';
import { AppState } from '../../store/app.state';
import { selectProductLoading, selectProducts } from '../../store/products/product.selectors';
import { loadProducts } from '../../store/products/product.actions';
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
  products$ = this.store.select(selectProducts);
  loading$ = this.store.select(selectProductLoading);

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  protected readonly MOCK_STYLES = MOCK_STYLES;
  protected readonly MOCK_BRANDS = MOCK_BRANDS;
  protected readonly MOCK_REVIEWS = MOCK_REVIEWS;
}
