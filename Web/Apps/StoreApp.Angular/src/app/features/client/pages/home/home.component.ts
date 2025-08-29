import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { Store } from '@ngrx/store';
import {AppState} from '../../../../store/app.state';
import { selectProductLoading, selectProducts } from '../../../../store/products/product.selectors';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { loadProducts } from '../../../../store/products/product.actions';
import { StartComponent } from '../../components/start/start.component';
import { BrandsComponent } from '../../components/brands/brands.component';
import {StylesComponent} from '../../components/styles/styles.component';
import {MOCK_STYLES} from '../../../../mocks/styles.mock';
import {MOCK_BRANDS} from '../../../../mocks/brands.mock';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductListComponent, LoadingSpinnerComponent, StartComponent, BrandsComponent, StylesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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
}
