import {Component, inject} from '@angular/core';
import {ProductListComponent} from '../../shared/components/product-list/product-list.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {Observable} from 'rxjs';
import {
  selectCurrentPage, selectPageSize,
  selectProductError,
  selectProductLoading,
  selectProducts, selectTotalCount, selectTotalPages
} from '../../store/products/product.selectors';
import {Product} from '../../shared/models/product/product';
import {AsyncPipe} from '@angular/common';
import {DotsLoaderComponent} from '../../shared/components/dots-loader/dots-loader.component';
import {Pagination} from '../../shared/components/pagination/pagination';
import {loadProducts, setCurrentPage, setFilters, setPageSize} from '../../store/products/product.actions';
import {ProductFiltersComponent} from './components/product-filters/product-filters.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [
    ProductListComponent,
    AsyncPipe,
    DotsLoaderComponent,
    Pagination,
    ProductFiltersComponent,
    FormsModule
  ],
  templateUrl: './products.component.html',
  standalone: true,
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private store = inject(Store<AppState>);

  products$: Observable<Product[] | null> = this.store.select(selectProducts);
  isLoading$: Observable<boolean> = this.store.select(selectProductLoading);
  error$: Observable<any> = this.store.select(selectProductError);

  totalCount$: Observable<number> = this.store.select(selectTotalCount);
  currentPage$: Observable<number> = this.store.select(selectCurrentPage);
  totalPages$: Observable<number> = this.store.select(selectTotalPages);
  pageSize$: Observable<number> = this.store.select(selectPageSize);
  selectedSort = 'name-asc';

  ngOnInit(): void {
    this.store.dispatch(setPageSize({ pageSize: 9 }));
    this.loadProducts();
  }

  loadProducts(): void {
    this.store.dispatch(loadProducts());
  }

  onPageChange(newPage: number): void {
    this.store.dispatch(setCurrentPage({ page: newPage }));
    this.loadProducts();
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const [sortBy, direction] = selectElement.value.split('-');

    const sortAscending = direction === 'asc' ? 'true' : 'false';

    this.selectedSort = selectElement.value;
    this.store.dispatch(setFilters({ filters: { sortBy, sortAscending } }));
  }

  protected readonly Math = Math;
  protected readonly HTMLSelectElement = HTMLSelectElement;
}
