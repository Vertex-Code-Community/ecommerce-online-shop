import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { ErrorResult } from '../../shared/models/errorResult';
import {Tokens} from "../../shared/models/auth/tokens";

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: ErrorResult | null;
}

const getStoredTokens = () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return { accessToken, refreshToken };
  } catch (error) {
    console.warn('Failed to read from localStorage:', error);
    return { accessToken: null, refreshToken: null };
  }
};

const setStoredTokens = (tokens: Tokens) => {
  try {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  } catch (error) {
    console.warn('Failed to write to localStorage:', error);
  }
};

const removeStoredTokens = () => {
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  } catch (error) {
    console.warn('Failed to remove from localStorage:', error);
  }
};

const { accessToken, refreshToken } = getStoredTokens();

export const initialState: AuthState = {
  accessToken,
  refreshToken,
  isAuthenticated: !!accessToken,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.loginSuccess, (state, {tokens}) => {
    setStoredTokens(tokens);
    return {
      ...state,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      isAuthenticated: true,
      loading: false,
      error: null,
    };
  }),

  on(AuthActions.loginFailure, (state, error) => ({
    ...state,
    loading: false,
    error: { message: error.message, statusCode: error.statusCode }
  })),

  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.registerSuccess, (state) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  }),

  on(AuthActions.registerFailure, (state, error) => ({
    ...state,
    loading: false,
    error: { message: error.message, statusCode: error.statusCode }
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    loading: true
  })),

  on(AuthActions.logoutSuccess, () => {
    removeStoredTokens();
    return {
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    };
  }),

  on(AuthActions.logoutFailure, (state, error) => ({
    ...state,
    loading: false,
    error: { message: error.message, statusCode: error.statusCode }
  })),

  on(AuthActions.setTokens, (state, { tokens }) => {
    setStoredTokens(tokens);
    return {
      ...state,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      isAuthenticated: true,
      error: null,
    };
  }),

  on(AuthActions.refreshToken, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.refreshTokenSuccess, (state, { tokens }) => {
    setStoredTokens(tokens);
    return {
      ...state,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      isAuthenticated: true,
      loading: false,
      error: null,
    };
  }),

  on(AuthActions.refreshTokenFailure, (state, error) => ({
    ...state,
    loading: false,
    error: { message: error.message, statusCode: error.statusCode }
  })),

  on(AuthActions.clearTokens, (state) => {
    removeStoredTokens();
    return {
      ...state,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      error: null,
    };
  }),

  on(AuthActions.clearTokensSuccess, (state) => ({
    ...state,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    error: null,
  }))
);
