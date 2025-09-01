import { AuthState } from './auth/auth.reducer';
import { ProductState } from './products/product.reducer.t';
import { ThemeState } from './theme/theme.reducer';

export interface AppState {
  auth: AuthState;
  product: ProductState;
  theme: ThemeState;
}
