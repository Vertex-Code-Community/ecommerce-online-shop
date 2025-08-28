import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as AuthActions from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const store = inject(Store<AppState>);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const authReq = accessToken
    ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse | any) => {
      // 👇 Головна зміна: перевіряємо, чи це помилка 401, або ж мережева помилка (статус 0)
      // з конкретним текстом (якщо є) чи типом помилки.
      const isUnauthorizedError = (error instanceof HttpErrorResponse && error.status === 401) || error.message?.includes('401');

      if (!isUnauthorizedError) {
        console.warn('Interceptor caught non-401 or unexpected error:', error);
        return throwError(() => error);
      }

      console.log('401 or similar unauthorized error detected, trying refresh...');

      if (!refreshToken) {
        // Якщо refresh-токена немає, перенаправляємо на логін
        router.navigate(['/login']);
        return throwError(() => new Error('No refresh token available.'));
      }

      // Використовуємо .pipe(take(1)) для запобігання нескінченних циклів
      return authService.refreshToken({ accessToken: accessToken || '', refreshToken }).pipe(
        switchMap(newTokens => {
          // Зберігаємо нові токени
          localStorage.setItem('accessToken', newTokens.accessToken);
          localStorage.setItem('refreshToken', newTokens.refreshToken);
          store.dispatch(AuthActions.setTokens(newTokens));

          // Повторюємо оригінальний запит з новим токеном
          const clonedReq = req.clone({
            setHeaders: { Authorization: `Bearer ${newTokens.accessToken}` }
          });
          return next(clonedReq);
        }),
        catchError(refreshErr => {
          // Якщо оновлення токена не вдалось, перенаправляємо на логін
          console.error('Refresh failed:', refreshErr);
          router.navigate(['/login']);
          return throwError(() => refreshErr);
        })
      );
    })
  );
};
