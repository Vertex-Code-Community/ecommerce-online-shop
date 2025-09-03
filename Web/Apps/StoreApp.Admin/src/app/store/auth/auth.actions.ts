import { createAction, props } from '@ngrx/store';
import { LoginRequest } from '../../shared/models/auth/login-request';
import { Tokens } from '../../shared/models/auth/tokens';
import  { ErrorResult } from '../../shared/models/errorResult';

export const login = createAction('[Auth] Login', props<{ request: LoginRequest }>());

export const loginSuccess = createAction('[Auth] Login Success', props<{ tokens: Tokens }>());

export const loginFailure = createAction('[Auth] Login Failure', props<{ message: string; statusCode: number }>());

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure', props<{ message: string; statusCode: number }>());

export const setTokens = createAction('[Auth] Set Tokens', props<{ tokens: Tokens }>());

export const refreshToken = createAction('[Auth] Refresh Token', props<{ tokens: Tokens }>());
export const refreshTokenSuccess = createAction('[Auth] Refresh Token Success', props<{ tokens: Tokens }>());
export const refreshTokenFailure = createAction('[Auth] Refresh Token Failure', props<{ message: string; statusCode: number }>());

export const clearTokens = createAction('[Auth] Clear Tokens');
export const clearTokensSuccess = createAction('[Auth] Clear Tokens Success');
