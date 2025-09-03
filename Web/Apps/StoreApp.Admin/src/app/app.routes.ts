import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { guestGuard } from './core/guards/guest-guard';
import { authGuard } from './core/guards/auth-guard';
import { AdminLayoutComponent } from './shared/layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/layout/auth-layout.component';
import { ProductsComponent } from './features/products/products.component';
import { ProductFormComponent } from './features/products/product-form/product-form.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  { path: 'login', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'products/create', component: ProductFormComponent },
      { path: 'products/edit/:id', component: ProductFormComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' }
    ]
  },
];
