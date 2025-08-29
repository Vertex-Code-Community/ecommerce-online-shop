import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { guestGuard } from './core/guards/guest-guard';
import { ProductListPage } from './features/admin/pages/product-list-page/product-list-page';
import { authGuard } from './core/guards/auth-guard';
import { ProductFormPage } from './features/admin/pages/product-form-page/product-form-page';
import { HomeComponent } from './features/client/pages/home/home.component';
import { AdminLayoutComponent } from './features/admin/layout/admin-layout.component';
import { ClientLayoutComponent } from './features/client/layout/client-layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginPage, canActivate: [guestGuard] },

  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'products', component: ProductListPage },
      { path: 'products/new', component: ProductFormPage },
      { path: 'products/edit/:id', component: ProductFormPage },
    ]
  },

  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]
  },
];
