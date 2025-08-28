import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Tokens } from '../../shared/models/auth/tokens';
import { LoginRequest } from '../../shared/models/auth/login-request';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private http = inject(HttpClient);

  login(request: LoginRequest): Observable<Tokens> {
    // return this.http.post<Tokens>(`${this.apiUrl}/login`, request);
    // Mocked response for UI testing without backend
    const mockTokens: Tokens = {
      accessToken: 'mock-access-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now()
    };
    return of(mockTokens).pipe(delay(300));
  }

  logout(): Observable<void> {
    // return this.http.post<void>(`${this.apiUrl}/logout`, {});
    // Mocked response for UI testing without backend
    return of(void 0).pipe(delay(200));
  }

  refreshToken(request: Tokens): Observable<Tokens> {
    // return this.http.post<Tokens>(`${this.apiUrl}/refresh-tokens`, request);
    // Mocked response for UI testing without backend
    const mockTokens: Tokens = {
      accessToken: 'mock-access-token-refreshed-' + Date.now(),
      refreshToken: 'mock-refresh-token-refreshed-' + Date.now()
    };
    return of(mockTokens).pipe(delay(250));
  }
}
