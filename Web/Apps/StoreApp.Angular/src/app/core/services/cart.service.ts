import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItem } from '../../shared/models/cart/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'shop-co-cart';

  constructor() {}

  getCartItems(): Observable<CartItem[]> {
    const items = this.getCartFromStorage();
    return of(items);
  }

  addToCart(item: CartItem): Observable<CartItem[]> {
    const items = this.getCartFromStorage();
    const existingItemIndex = items.findIndex(
      cartItem => cartItem.productDetail.id === item.productDetail.id
    );

    const maxQuantity = item.productDetail.unitsInStock;

    if (existingItemIndex >= 0) {
      const existingItem = items[existingItemIndex];
      const newQuantity = existingItem.quantity + item.quantity;
      
      if (newQuantity > maxQuantity) {
        existingItem.quantity = maxQuantity;
      } else {
        existingItem.quantity = newQuantity;
      }
      
      existingItem.productDetail = item.productDetail;
    } else {
      if (item.quantity > maxQuantity) {
        item.quantity = maxQuantity;
      }
      items.push(item);
    }

    this.saveCartToStorage(items);
    return of(items);
  }

  removeFromCart(productDetailId: number): Observable<CartItem[]> {
    const items = this.getCartFromStorage();
    const filteredItems = items.filter(item => item.productDetail.id !== productDetailId);
    
    this.saveCartToStorage(filteredItems);
    return of(filteredItems);
  }

  updateQuantity(productDetailId: number, quantity: number): Observable<CartItem[]> {
    const items = this.getCartFromStorage();
    const itemIndex = items.findIndex(item => item.productDetail.id === productDetailId);

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        items.splice(itemIndex, 1);
      } else {
        const maxQuantity = items[itemIndex].productDetail.unitsInStock;
        if (quantity > maxQuantity) {
          items[itemIndex].quantity = maxQuantity;
        } else {
          items[itemIndex].quantity = quantity;
        }
      }
    }

    this.saveCartToStorage(items);
    return of(items);
  }

  increaseQuantity(productDetailId: number): Observable<CartItem[]> {
    const items = this.getCartFromStorage();
    const item = items.find(item => item.productDetail.id === productDetailId);
    
    if (item) {
      const maxQuantity = item.productDetail.unitsInStock;
      const newQuantity = item.quantity + 1;
      
      if (newQuantity > maxQuantity) {
        item.quantity = maxQuantity;
      } else {
        item.quantity = newQuantity;
      }
      
      this.saveCartToStorage(items);
    }
    
    return of(items);
  }

  decreaseQuantity(productDetailId: number): Observable<CartItem[]> {
    const items = this.getCartFromStorage();
    const itemIndex = items.findIndex(item => item.productDetail.id === productDetailId);
    
    if (itemIndex >= 0) {
      items[itemIndex].quantity--;
      
      if (items[itemIndex].quantity <= 0) {
        items.splice(itemIndex, 1);
      }
      
      this.saveCartToStorage(items);
    }
    
    return of(items);
  }

  clearCart(): Observable<CartItem[]> {
    this.saveCartToStorage([]);
    return of([]);
  }

  getCartItemsCount(): Observable<number> {
    const items = this.getCartFromStorage();
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return of(totalCount);
  }

  private getCartFromStorage(): CartItem[] {
    try {
      const cartData = localStorage.getItem(this.CART_STORAGE_KEY);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error parsing cart data from localStorage:', error);
      return [];
    }
  }

  private saveCartToStorage(items: CartItem[]): void {
    try {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart data to localStorage:', error);
    }
  }
}
