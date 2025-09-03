import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {delay, Observable, of, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Tokens } from '../../shared/models/auth/tokens';
import { LoginRequest } from '../../shared/models/auth/login-request';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private http = inject(HttpClient);

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    let statusCode = 500;

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      statusCode = error.status;
      errorMessage = error.message || 'Server error occurred';
    }

    return throwError(() => ({ message: errorMessage, statusCode }));
  }

  login(request: LoginRequest): Observable<Tokens> {
    return this.http.post<Tokens>(`${this.apiUrl}/login`, request)
      .pipe(catchError(this.handleError.bind(this)));

    // Mocked response for UI testing without backend
    const mockTokens: Tokens = {
      accessToken: 'mock-access-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now()
    };
    return of(mockTokens).pipe(delay(300));
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {})
      .pipe(catchError(this.handleError.bind(this)));

    // Mocked response for UI testing without backend
    return of(void 0).pipe(delay(200));
  }

  refreshToken(request: Tokens): Observable<Tokens> {
    return this.http.post<Tokens>(`${this.apiUrl}/refresh-tokens`, request)
      .pipe(catchError(this.handleError.bind(this)));

    // Mocked response for UI testing without backend
    const mockTokens: Tokens = {
      accessToken: 'mock-access-token-refreshed-' + Date.now(),
      refreshToken: 'mock-refresh-token-refreshed-' + Date.now()
    };
    return of(mockTokens).pipe(delay(250));
  }
}
