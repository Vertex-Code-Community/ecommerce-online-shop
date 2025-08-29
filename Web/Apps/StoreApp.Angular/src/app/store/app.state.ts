import { AuthState } from './auth/auth.reducer';
import {ProductState} from './products/product.reducer.t';

export interface AppState {
  auth: AuthState;
  product: ProductState;
}
