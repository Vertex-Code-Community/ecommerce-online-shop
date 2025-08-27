import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Tokens } from '../../shared/models/auth/tokens';
import { LoginRequest } from '../../shared/models/auth/login-request';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private http = inject(HttpClient);

  login(request: LoginRequest): Observable<Tokens> {
    return this.http.post<Tokens>(`${this.apiUrl}/login`, request);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {});
  }

  refreshToken(request: Tokens): Observable<Tokens> {
    return this.http.post<Tokens>(`${this.apiUrl}/refresh-token`, request);
  }
}
