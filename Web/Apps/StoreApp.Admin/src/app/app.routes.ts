import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { guestGuard } from './core/guards/guest-guard';
import { authGuard } from './core/guards/auth-guard';
import { AdminLayoutComponent } from './shared/layout/admin-layout.component';
import { ProductsComponent } from './features/products/products.component';
import { ProductFormComponent } from './features/products/product-form/product-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginPage, canActivate: [guestGuard] },

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
