import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedAuth = this.getAuthStatusFromStorage();
    this.isAuthenticatedSubject.next(storedAuth);
   }

  login(email: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true }).pipe(
      tap(() => {
        this.setAuthenticated(true);
      })
    );
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.setAuthenticated(false);
      })
    );
  }

  refreshToken() {
    return this.http.post(`${this.apiUrl}/refresh-token`, {}, { withCredentials: true });
  }

  private getAuthStatusFromStorage(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  private setAuthenticated(isAuth: boolean): void {
    localStorage.setItem('isAuthenticated', isAuth.toString());
    this.isAuthenticatedSubject.next(isAuth);
  }
}
