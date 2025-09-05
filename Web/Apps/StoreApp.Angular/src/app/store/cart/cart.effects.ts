import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { CartService } from '../../core/services/cart.service';
import * as CartActions from './cart.actions';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private cartService = inject(CartService);

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      switchMap(() =>
        this.cartService.getCartItems().pipe(
          map(items => CartActions.loadCartSuccess({ items })),
          catchError(error => of(CartActions.loadCartFailure({ error })))
        )
      )
    )
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addToCart),
      switchMap(({ item }) =>
        this.cartService.addToCart(item).pipe(
          map(items => CartActions.addToCartSuccess({ items })),
          catchError(error => of(CartActions.addToCartFailure({ error })))
        )
      )
    )
  );

  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeFromCart),
      switchMap(({ productDetailId }) =>
        this.cartService.removeFromCart(productDetailId).pipe(
          map(items => CartActions.removeFromCartSuccess({ items })),
          catchError(error => of(CartActions.removeFromCartFailure({ error })))
        )
      )
    )
  );

  updateQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateQuantity),
      switchMap(({ productDetailId, quantity }) =>
        this.cartService.updateQuantity(productDetailId, quantity).pipe(
          map(items => CartActions.updateQuantitySuccess({ items })),
          catchError(error => of(CartActions.updateQuantityFailure({ error })))
        )
      )
    )
  );

  increaseQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.increaseQuantity),
      switchMap(({ productDetailId }) =>
        this.cartService.increaseQuantity(productDetailId).pipe(
          map(items => CartActions.increaseQuantitySuccess({ items })),
          catchError(error => of(CartActions.increaseQuantityFailure({ error })))
        )
      )
    )
  );

  decreaseQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.decreaseQuantity),
      switchMap(({ productDetailId }) =>
        this.cartService.decreaseQuantity(productDetailId).pipe(
          map(items => CartActions.decreaseQuantitySuccess({ items })),
          catchError(error => of(CartActions.decreaseQuantityFailure({ error })))
        )
      )
    )
  );

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.clearCart),
      switchMap(() =>
        this.cartService.clearCart().pipe(
          map(items => CartActions.clearCartSuccess({ items })),
          catchError(error => of(CartActions.clearCartFailure({ error })))
        )
      )
    )
  );

  syncCartToApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.syncCartToApi),
      switchMap(() =>
        this.cartService.syncCartToApi().pipe(
          map(items => CartActions.syncCartToApiSuccess({ items })),
          catchError(error => of(CartActions.syncCartToApiFailure({ error })))
        )
      )
    )
  );
}
