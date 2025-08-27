import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { ErrorResult } from '../../shared/models/errorResult';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: ErrorResult | null;
}

export const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({...state, loading: true, error: null,})),

  on(AuthActions.loginSuccess, (state, { accessToken, refreshToken }) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return {
      ...state,
      accessToken,
      refreshToken,
      isAuthenticated: true,
      loading: false,
      error: null,
    };
  }),

  on(AuthActions.loginFailure, (state, error) => ({...state, loading: false, error,})),

  on(AuthActions.logout, (state) => ({ ...state, loading: true })),

  on(AuthActions.logoutSuccess, () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return {
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    };
  }),

  on(AuthActions.logoutFailure, (state, error) => ({...state, loading: false, error,})),

  on(AuthActions.refreshToken, (state) => ({ ...state, loading: true })),

  on(AuthActions.refreshTokenSuccess, (state, { accessToken, refreshToken }) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return {
      ...state,
      accessToken,
      refreshToken,
      isAuthenticated: true,
      loading: false,
      error: null,
    };
  }),

  on(AuthActions.refreshTokenFailure, (state, error) => ({...state, loading: false, error,}))
);
