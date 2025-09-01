import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';
import {productReducer} from './products/product.reducer.t';

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  product: productReducer,
};
