import { AuthState } from './auth/auth.reducer';
import { ProductState } from './products/product.reducer.t';
import { ThemeState } from './theme/theme.reducer';
import { ReviewState } from './reviews/review.reducer';
import { HomeState } from './home/home.reducer';

export interface AppState {
  auth: AuthState;
  product: ProductState;
  theme: ThemeState;
  review: ReviewState;
  home: HomeState;
}
