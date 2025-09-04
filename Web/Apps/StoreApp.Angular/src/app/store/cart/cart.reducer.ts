import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../../shared/models/cart/cartItem';
import * as CartActions from './cart.actions';

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  totalCount: 0
};

const calculateTotalCount = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const cartReducer = createReducer(
  initialState,

  on(CartActions.loadCart, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CartActions.loadCartSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null,
    totalCount: calculateTotalCount(items)
  })),

  on(CartActions.loadCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(CartActions.addToCart, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CartActions.addToCartSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null,
    totalCount: calculateTotalCount(items)
  })),

  on(CartActions.addToCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(CartActions.removeFromCart, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CartActions.removeFromCartSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null,
    totalCount: calculateTotalCount(items)
  })),

  on(CartActions.removeFromCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(CartActions.updateQuantity, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CartActions.updateQuantitySuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null,
    totalCount: calculateTotalCount(items)
  })),

  on(CartActions.updateQuantityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(CartActions.increaseQuantity, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CartActions.increaseQuantitySuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null,
    totalCount: calculateTotalCount(items)
  })),

  on(CartActions.increaseQuantityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(CartActions.decreaseQuantity, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CartActions.decreaseQuantitySuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null,
    totalCount: calculateTotalCount(items)
  })),

  on(CartActions.decreaseQuantityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(CartActions.clearCart, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CartActions.clearCartSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null,
    totalCount: calculateTotalCount(items)
  })),

  on(CartActions.clearCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
