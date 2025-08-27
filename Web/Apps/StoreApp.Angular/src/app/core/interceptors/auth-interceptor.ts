import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, switchMap, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from '../../store/app.state';
import { selectAccessToken, selectRefreshToken } from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

  const store = inject(Store<AppState>);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return store.select(selectAccessToken).pipe(
          take(1),
          switchMap(accessToken =>
            store.select(selectRefreshToken).pipe(
              take(1),
              switchMap(refreshToken => {
                if (!accessToken || !refreshToken) {
                  router.navigate(['/login']);
                  return throwError(() => error);
                }

                store.dispatch(AuthActions.refreshToken({ accessToken, refreshToken }));

                return store.select(selectAccessToken).pipe(
                  take(1),
                  switchMap(newAccessToken => {
                    if (!newAccessToken) {
                      router.navigate(['/login']);
                      return throwError(() => error);
                    }

                    const clonedReq = req.clone({
                      setHeaders: { Authorization: `Bearer ${newAccessToken}` }
                    });
                    return next(clonedReq);
                  })
                );
              })
            )
          )
        );
      }

      return throwError(() => error);
    })
  );
};
