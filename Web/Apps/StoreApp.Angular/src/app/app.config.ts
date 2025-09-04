import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { authInterceptor } from './core/interceptors/auth-interceptor';

import { appReducers } from './store/app.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { ProductEffects } from './store/products/product.effects';
import { ThemeEffects } from './store/theme/theme.effects';
import { ReviewEffects } from './store/reviews/review.effects';
import { HomeEffects } from './store/home/home.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(appReducers),
    provideEffects([AuthEffects, ProductEffects, ThemeEffects, ReviewEffects, HomeEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore()
  ]
};
