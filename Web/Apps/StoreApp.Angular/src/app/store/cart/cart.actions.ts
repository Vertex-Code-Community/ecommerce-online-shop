import { createAction, props } from '@ngrx/store';
import { CartItem } from '../../shared/models/cart/cartItem';

export const loadCart = createAction(
  '[Cart] Load Cart'
);

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ items: CartItem[] }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: any }>()
);

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ item: CartItem }>()
);

export const addToCartSuccess = createAction(
  '[Cart] Add To Cart Success',
  props<{ items: CartItem[] }>()
);

export const addToCartFailure = createAction(
  '[Cart] Add To Cart Failure',
  props<{ error: any }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productDetailId: number }>()
);

export const removeFromCartSuccess = createAction(
  '[Cart] Remove From Cart Success',
  props<{ items: CartItem[] }>()
);

export const removeFromCartFailure = createAction(
  '[Cart] Remove From Cart Failure',
  props<{ error: any }>()
);

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productDetailId: number; quantity: number }>()
);

export const updateQuantitySuccess = createAction(
  '[Cart] Update Quantity Success',
  props<{ items: CartItem[] }>()
);

export const updateQuantityFailure = createAction(
  '[Cart] Update Quantity Failure',
  props<{ error: any }>()
);

export const increaseQuantity = createAction(
  '[Cart] Increase Quantity',
  props<{ productDetailId: number }>()
);

export const increaseQuantitySuccess = createAction(
  '[Cart] Increase Quantity Success',
  props<{ items: CartItem[] }>()
);

export const increaseQuantityFailure = createAction(
  '[Cart] Increase Quantity Failure',
  props<{ error: any }>()
);

export const decreaseQuantity = createAction(
  '[Cart] Decrease Quantity',
  props<{ productDetailId: number }>()
);

export const decreaseQuantitySuccess = createAction(
  '[Cart] Decrease Quantity Success',
  props<{ items: CartItem[] }>()
);

export const decreaseQuantityFailure = createAction(
  '[Cart] Decrease Quantity Failure',
  props<{ error: any }>()
);

export const clearCart = createAction(
  '[Cart] Clear Cart'
);

export const clearCartSuccess = createAction(
  '[Cart] Clear Cart Success',
  props<{ items: CartItem[] }>()
);

export const clearCartFailure = createAction(
  '[Cart] Clear Cart Failure',
  props<{ error: any }>()
);
