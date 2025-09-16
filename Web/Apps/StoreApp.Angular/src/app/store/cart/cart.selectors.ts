import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

export const selectCartLoading = createSelector(
  selectCartState,
  (state: CartState) => state.loading
);

export const selectCartError = createSelector(
  selectCartState,
  (state: CartState) => state.error
);

export const selectCartTotalCount = createSelector(
  selectCartState,
  (state: CartState) => state.totalCount
);

export const selectProductQuantityInCart = (productDetailId: number) =>
  createSelector(
    selectCartItems,
    (items) => {
      const item = items.find(item => item.productDetail.id === productDetailId);
      return item ? item.quantity : 0;
    }
  );
