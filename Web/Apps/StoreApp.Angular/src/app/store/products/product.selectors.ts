import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer.t';

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products
);

export const selectTotalCount = createSelector(
  selectProductState,
  (state) => state.totalCount
);

export const selectCurrentProduct = createSelector(
  selectProductState,
  (state) => state.currentProduct
);

export const selectProductLoading = createSelector(
  selectProductState,
  (state) => state.loading
);

export const selectProductError = createSelector(
  selectProductState,
  (state) => state.error
);

export const selectCurrentPage = createSelector(
  selectProductState,
  (state) => state.currentPage
);

export const selectPageSize = createSelector(
  selectProductState,
  (state) => state.pageSize
);
