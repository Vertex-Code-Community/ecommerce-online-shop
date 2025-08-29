import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppState } from '../../store/app.state';
import { selectAuthTokens } from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private store = inject(Store<AppState>);

  private tokensSubject = new BehaviorSubject<{ accessToken: string | null; refreshToken: string | null }>({
    accessToken: null,
    refreshToken: null
  });

  constructor() {
    this.store.select(selectAuthTokens).subscribe(tokens => {
      this.tokensSubject.next(tokens);
    });
  }

  getCurrentTokens(): { accessToken: string | null; refreshToken: string | null } {
    return this.tokensSubject.value;
  }

  getCurrentTokens$(): Observable<{ accessToken: string | null; refreshToken: string | null }> {
    return this.tokensSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return !!this.tokensSubject.value.accessToken;
  }

  getAccessToken(): string | null {
    return this.tokensSubject.value.accessToken;
  }

  getRefreshToken(): string | null {
    return this.tokensSubject.value.refreshToken;
  }

  isTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // Convert to milliseconds
      return Date.now() >= expiry;
    } catch (error) {
      console.warn('Failed to parse token:', error);
      return true;
    }
  }

  clearTokens(): void {
    this.store.dispatch(AuthActions.clearTokens());
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  updateTokens(accessToken: string, refreshToken: string): void {
    this.store.dispatch(AuthActions.setTokens({ accessToken, refreshToken }));
  }
}
