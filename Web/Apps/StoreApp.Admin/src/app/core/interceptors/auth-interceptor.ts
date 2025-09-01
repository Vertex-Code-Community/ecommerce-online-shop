import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, throwError, from } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as AuthActions from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectAuthTokens } from '../../store/auth/auth.selectors';

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const store = inject(Store<AppState>);

  let accessToken: string | null = null;
  let refreshToken: string | null = null;

  store.select(selectAuthTokens).subscribe(tokens => {
    accessToken = tokens.accessToken;
    refreshToken = tokens.refreshToken;
  }).unsubscribe();

  const authReq = accessToken
    ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse | any) => {
      const isUnauthorizedError = (error instanceof HttpErrorResponse && error.status === 401) ||
                                  error.message?.includes('401') ||
                                  error.statusCode === 401;

      if (!isUnauthorizedError) {
        console.warn('Interceptor caught non-401 or unexpected error:', error);
        return throwError(() => error);
      }

      console.log('401 or similar unauthorized error detected, trying refresh...');

      if (!refreshToken) {
        console.log('No refresh token available, clearing tokens');
        store.dispatch(AuthActions.clearTokens());
        return throwError(() => new Error('No refresh token available.'));
      }

      if (isRefreshing) {
        return from(new Promise<string>((resolve) => {
          refreshSubscribers.push(resolve);
        })).pipe(
          switchMap((token) => {
            const clonedReq = req.clone({
              setHeaders: { Authorization: `Bearer ${token}` }
            });
            return next(clonedReq);
          })
        );
      }

      isRefreshing = true;
      refreshSubscribers = [];

      return authService.refreshToken({ accessToken: accessToken || '', refreshToken }).pipe(
        switchMap(newTokens => {
          console.log('Token refresh successful, updating store');
          store.dispatch(AuthActions.refreshTokenSuccess({tokens: newTokens}));

          refreshSubscribers.forEach(callback => callback(newTokens.accessToken));
          refreshSubscribers = [];
          isRefreshing = false;

          const clonedReq = req.clone({
            setHeaders: { Authorization: `Bearer ${newTokens.accessToken}` }
          });
          return next(clonedReq);
        }),
        catchError(refreshErr => {
          console.error('Refresh failed:', refreshErr);
          console.log('Token refresh failed, clearing tokens');

          refreshSubscribers.forEach(callback => callback(''));
          refreshSubscribers = [];
          isRefreshing = false;

          store.dispatch(AuthActions.clearTokens());
          return throwError(() => refreshErr);
        })
      );
    })
  );
};
