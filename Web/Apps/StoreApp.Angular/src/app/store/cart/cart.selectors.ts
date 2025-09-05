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

export const selectCartItemsCount = createSelector(
  selectCartItems,
  (items) => items.length
);

export const selectCartTotalQuantity = createSelector(
  selectCartItems,
  (items) => items.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectIsCartEmpty = createSelector(
  selectCartItems,
  (items) => items.length === 0
);

export const selectCartItemByProductDetailId = (productDetailId: number) =>
  createSelector(
    selectCartItems,
    (items) => items.find(item => item.productDetail.id === productDetailId)
  );

export const selectIsProductInCart = (productDetailId: number) =>
  createSelector(
    selectCartItems,
    (items) => items.some(item => item.productDetail.id === productDetailId)
  );

export const selectProductQuantityInCart = (productDetailId: number) =>
  createSelector(
    selectCartItems,
    (items) => {
      const item = items.find(item => item.productDetail.id === productDetailId);
      return item ? item.quantity : 0;
    }
  );
