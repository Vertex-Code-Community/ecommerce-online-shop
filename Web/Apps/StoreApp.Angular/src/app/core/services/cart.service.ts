import { Injectable, inject } from '@angular/core';
import { delay, Observable, of, switchMap, catchError, throwError } from 'rxjs';
import { CartItem } from '../../shared/models/cart/cartItem';
import { UpdateCartItem } from '../../shared/models/cart/updateCartItem';
import { CartApiService } from './cart-api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'shop-co-cart';
  private cartApiService = inject(CartApiService);
  private store = inject(Store<AppState>);

  getCartItems(): Observable<CartItem[]> {
    return this.store.select(selectIsAuthenticated).pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.cartApiService.getCartItems().pipe(
            catchError(error => {
              console.error('Error loading cart from API:', error);
              return of(this.getCartFromStorage());
            })
          );
        } else {
          return of(this.getCartFromStorage());
        }
      })
    );
  }

  addToCart(item: CartItem): Observable<CartItem[]> {
    return this.store.select(selectIsAuthenticated).pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          const updateCartItem: UpdateCartItem = {
            productDetailId: item.productDetail.id,
            quantity: item.quantity
          };

          return this.cartApiService.addToCart(updateCartItem).pipe(
            switchMap(() => this.getCartItems()),
            catchError(error => {
              console.error('Error adding to cart via API:', error);
              return this.addToCartLocal(item);
            })
          );
        } else {
          return this.addToCartLocal(item);
        }
      })
    );
  }

  private addToCartLocal(item: CartItem): Observable<CartItem[]> {
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
    return this.store.select(selectIsAuthenticated).pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.cartApiService.removeFromCart(productDetailId).pipe(
            switchMap(() => this.getCartItems()),
            catchError(error => {
              console.error('Error removing from cart via API:', error);
              return this.removeFromCartLocal(productDetailId);
            })
          );
        } else {
          return this.removeFromCartLocal(productDetailId);
        }
      })
    );
  }

  private removeFromCartLocal(productDetailId: number): Observable<CartItem[]> {
    const items = this.getCartFromStorage();
    const filteredItems = items.filter(item => item.productDetail.id !== productDetailId);

    this.saveCartToStorage(filteredItems);
    return of(filteredItems);
  }

  updateQuantity(productDetailId: number, quantity: number): Observable<CartItem[]> {
    return this.store.select(selectIsAuthenticated).pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          const updateCartItem: UpdateCartItem = {
            productDetailId: productDetailId,
            quantity: quantity
          };

          return this.cartApiService.updateQuantity(updateCartItem).pipe(
            switchMap(() => this.getCartItems()),
            catchError(error => {
              console.error('Error updating quantity via API:', error);
              return this.updateQuantityLocal(productDetailId, quantity);
            })
          );
        } else {
          return this.updateQuantityLocal(productDetailId, quantity);
        }
      })
    );
  }

  private updateQuantityLocal(productDetailId: number, quantity: number): Observable<CartItem[]> {
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
    return this.store.select(selectIsAuthenticated).pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.getCartItems().pipe(
            switchMap(items => {
              const item = items.find(item => item.productDetail.id === productDetailId);
              if (item) {
                const maxQuantity = item.productDetail.unitsInStock;
                const newQuantity = Math.min(item.quantity + 1, maxQuantity);
                return this.updateQuantity(productDetailId, newQuantity);
              }
              return of(items);
            })
          );
        } else {
          return this.increaseQuantityLocal(productDetailId);
        }
      })
    );
  }

  private increaseQuantityLocal(productDetailId: number): Observable<CartItem[]> {
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
    return this.store.select(selectIsAuthenticated).pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.getCartItems().pipe(
            switchMap(items => {
              const item = items.find(item => item.productDetail.id === productDetailId);
              if (item) {
                const newQuantity = item.quantity - 1;
                if (newQuantity <= 0) {
                  return this.removeFromCart(productDetailId);
                } else {
                  return this.updateQuantity(productDetailId, newQuantity);
                }
              }
              return of(items);
            })
          );
        } else {
          return this.decreaseQuantityLocal(productDetailId);
        }
      })
    );
  }

  private decreaseQuantityLocal(productDetailId: number): Observable<CartItem[]> {
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
    return this.store.select(selectIsAuthenticated).pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.cartApiService.clearCart().pipe(
            switchMap(() => this.getCartItems()),
            catchError(error => {
              console.error('Error clearing cart via API:', error);
              return this.clearCartLocal();
            })
          );
        } else {
          return this.clearCartLocal();
        }
      })
    );
  }

  private clearCartLocal(): Observable<CartItem[]> {
    this.saveCartToStorage([]);
    return of([]);
  }

  syncCartToApi(): Observable<CartItem[]> {
    const localItems = this.getCartFromStorage();

    if (localItems.length === 0) {
      return this.getCartItems();
    }

    return this.cartApiService.clearCart().pipe(
      switchMap(() => {
        const addOperations = localItems.map(item =>
          this.cartApiService.addToCart({
            productDetailId: item.productDetail.id,
            quantity: item.quantity
          })
        );

        return addOperations.reduce((acc, operation) =>
          acc.pipe(switchMap(() => operation)), of(void 0)
        );
      }),
      switchMap(() => {
        this.saveCartToStorage([]);
        return this.getCartItems();
      }),
      catchError(error => {
        console.error('Error syncing cart to API:', error);
        return of(localItems);
      })
    );
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
