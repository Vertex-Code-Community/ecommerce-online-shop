import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CartItem } from '../../shared/models/cart/cartItem';
import { UpdateCartItem } from '../../shared/models/cart/updateCartItem';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/CartItems`;

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl);
  }

  addToCart(updateCartItem: UpdateCartItem): Observable<void> {
    return this.http.post<void>(this.apiUrl, updateCartItem);
  }

  updateQuantity(updateCartItem: UpdateCartItem): Observable<void> {
    return this.http.put<void>(this.apiUrl, updateCartItem);
  }

  removeFromCart(productDetailId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?productDetailId=${productDetailId}`);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clear`);
  }
}
