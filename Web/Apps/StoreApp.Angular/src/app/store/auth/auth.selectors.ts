import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state?.isAuthenticated ?? false
);

export const selectAccessToken = createSelector(
  selectAuthState,
  (state) => state?.accessToken || null
);

export const selectRefreshToken = createSelector(
  selectAuthState,
  (state) => state?.refreshToken || null
);

export const selectAuthTokens = createSelector(
  selectAuthState,
  (state) => ({
    accessToken: state?.accessToken || null,
    refreshToken: state?.refreshToken || null,
  })
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state?.loading ?? false
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state?.error?.message || null
);

export const selectAuthErrorDetails = createSelector(
  selectAuthState,
  (state) => state?.error || null
);
