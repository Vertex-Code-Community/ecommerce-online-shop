import { createAction, props } from '@ngrx/store';
import { LoginRequest } from '../../shared/models/auth/login-request';
import { Tokens } from '../../shared/models/auth/tokens';
import  { ErrorResult } from '../../shared/models/errorResult';

export const login = createAction('[Auth] Login', props<LoginRequest>());

export const loginSuccess = createAction('[Auth] Login Success', props<Tokens>());

export const loginFailure = createAction('[Auth] Login Failure', props<ErrorResult>());

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure', props<ErrorResult>());

export const refreshToken = createAction('[Auth] Refresh Token');
export const refreshTokenSuccess = createAction('[Auth] Refresh Token Success', props<Tokens>());
export const refreshTokenFailure = createAction('[Auth] Refresh Token Failure', props<ErrorResult>());
