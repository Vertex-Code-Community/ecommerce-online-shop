import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CounterComponent } from '../../shared/components/counter/counter.component';
import { ProductPriceComponent } from '../../shared/components/product-price/product-price.component';
import { CartItem } from '../../shared/models/cart/cartItem';
import { AppState } from '../../store/app.state';
import { selectCartItems, selectCartLoading, selectCartError } from '../../store/cart/cart.selectors';
import * as CartActions from '../../store/cart/cart.actions';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CounterComponent,
    ProductPriceComponent,
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  private store = inject(Store<AppState>);
  private destroy$ = new Subject<void>();

  cartItems$ = this.store.select(selectCartItems);
  isLoading$ = this.store.select(selectCartLoading);
  error$ = this.store.select(selectCartError);

  promoCode = '';
  promoApplied = false;

  deliveryFee = 15;
  discountPercentage = 20;

  ngOnInit(): void {
    this.store.dispatch(CartActions.loadCart());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getSubtotal(cartItems: CartItem[]): number {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  getDiscountAmount(cartItems: CartItem[]): number {
    const subtotal = this.getSubtotal(cartItems);
    return this.promoApplied ? Math.round(subtotal * (this.discountPercentage / 100)) : 0;
  }

  getTotal(cartItems: CartItem[]): number {
    const subtotal = this.getSubtotal(cartItems);
    const discountAmount = this.getDiscountAmount(cartItems);
    const itemsTotal = subtotal - discountAmount;
    return itemsTotal + (cartItems.length > 0 ? this.deliveryFee : 0);
  }

  removeItem(item: CartItem): void {
    this.store.dispatch(CartActions.removeFromCart({ productDetailId: item.productDetail.id }));
  }

  onQuantityChange(item: CartItem, newQuantity: number): void {
    this.store.dispatch(CartActions.updateQuantity({
      productDetailId: item.productDetail.id,
      quantity: newQuantity
    }));
  }

  applyPromoCode(): void {
    console.log('Applying promo code:', this.promoCode);
  }

  goToCheckout(): void {
    console.log('Go to checkout');
  }
}
