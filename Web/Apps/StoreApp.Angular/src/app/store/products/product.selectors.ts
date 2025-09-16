import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer.t';

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectProducts = createSelector(
  selectProductState,
  (state) => state?.products || []
);

export const selectTotalCount = createSelector(
  selectProductState,
  (state) => state?.totalCount ?? 0
);

export const selectCurrentProduct = createSelector(
  selectProductState,
  (state) => state?.currentProduct || null
);

export const selectProductLoading = createSelector(
  selectProductState,
  (state) => state?.loading ?? false
);

export const selectProductError = createSelector(
  selectProductState,
  (state) => state?.error || null
);

export const selectCurrentPage = createSelector(
  selectProductState,
  (state) => state?.currentPage ?? 1
);

export const selectPageSize = createSelector(
  selectProductState,
  (state) => state?.pageSize ?? 10
);

export const selectTotalPages = createSelector(
  selectProductState,
  (state) => Math.ceil((state?.totalCount ?? 0) / (state?.pageSize ?? 10))
);

export const selectFilters = createSelector(
  selectProductState,
  (state) => state?.filters || {}
);
