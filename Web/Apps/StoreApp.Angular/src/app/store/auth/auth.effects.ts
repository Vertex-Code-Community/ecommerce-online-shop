import {inject, Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import {AuthService} from '../../core/services/auth.service';

@Injectable()
export class AuthEffects {

  actions$: Actions = inject(Actions);
  authService: AuthService = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((login) =>
        this.authService.login(login).pipe(
          map((tokens) => AuthActions.loginSuccess(tokens)),
          catchError((err) =>
            of(AuthActions.loginFailure({ message: err.message, statusCode: err.status }))
          )
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
          catchError((err) =>
            of(AuthActions.logoutFailure({ message: err.message, statusCode: err.status }))
          )
        )
      )
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      mergeMap(() =>
        this.authService.refreshToken().pipe(
          map((tokens) => AuthActions.refreshTokenSuccess(tokens)),
          catchError((err) =>
            of(AuthActions.refreshTokenFailure({ message: err.message, statusCode: err.status }))
          )
        )
      )
    )
  );
}
