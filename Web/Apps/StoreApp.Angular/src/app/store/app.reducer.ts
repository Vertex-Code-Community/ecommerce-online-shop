import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';
import { productReducer } from './products/product.reducer.t';
import { themeReducer } from './theme/theme.reducer';
import { reviewReducer } from './reviews/review.reducer';
import { homeReducer } from './home/home.reducer';
import { cartReducer } from './cart/cart.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  product: productReducer,
  theme: themeReducer,
  review: reviewReducer,
  home: homeReducer,
  cart: cartReducer,
};
