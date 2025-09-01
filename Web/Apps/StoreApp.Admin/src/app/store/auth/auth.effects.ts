import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  actions$: Actions = inject(Actions);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((loginRequest) =>
        this.authService.login(loginRequest.request).pipe(
          map((tokens) => AuthActions.loginSuccess({ tokens })),
          catchError((err) => {
            console.error('Login error:', err);
            return of(AuthActions.loginFailure({
              message: err?.message || 'Login failed',
              statusCode: err?.statusCode || 500
            }));
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((err) => {
            console.error('Logout error:', err);
            // Even if logout fails on server, we should clear local state
            return of(AuthActions.logoutSuccess());
          })
        )
      )
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      mergeMap((tokens) =>
        this.authService.refreshToken(tokens.tokens).pipe(
          map((newTokens) => AuthActions.refreshTokenSuccess({ tokens: newTokens })),
          catchError((err) => {
            console.error('Token refresh error:', err);
            return of(
              AuthActions.refreshTokenFailure({
                message: err?.message || 'Token refresh failed',
                statusCode: err?.statusCode ?? 500
              })
            );
          })
        )
      )
    )
  );

  autoClearTokensOnRefreshFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshTokenFailure),
      tap(() => {
        console.log('Auto-clearing tokens due to refresh failure');
      }),
      map(() => AuthActions.clearTokens())
    )
  );

  autoClearTokensOnLogoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutSuccess),
      tap(() => {
        console.log('Auto-clearing tokens on logout success');
      }),
      map(() => AuthActions.clearTokensSuccess())
    )
  );

  navigateToLoginOnAuthFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFailure, AuthActions.refreshTokenFailure),
      tap(() => {
        console.log('Authentication failed, navigating to login');
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );

  navigateToHomeOnLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        console.log('Login successful, navigating to home');
        this.router.navigate(['/']);
      })
    ),
    { dispatch: false }
  );

  navigateToLoginOnLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutSuccess, AuthActions.clearTokensSuccess),
      tap(() => {
        console.log('Logged out, navigating to login');
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );
}
