import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { guestGuard } from './core/guards/guest-guard';
import { ClientLayoutComponent } from './shared/layout/client-layout.component';
import { HomeComponent } from './features/home/home.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductsComponent } from './features/products/products.component';
import {RegisterPage} from './features/auth/pages/register-page/register-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: 'auth/login', component: LoginPage, canActivate: [guestGuard] },
      { path: 'auth/register', component: RegisterPage, canActivate: [guestGuard] },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'cart', component: CartComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]
  },
];
