import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { guestGuard } from './core/guards/guest-guard';
import { ProductListPage } from './features/admin/pages/product-list-page/product-list-page';
import { authGuard } from './core/guards/auth-guard';
import { ProductFormPage } from './features/admin/pages/product-form-page/product-form-page';

export const routes: Routes = [
    { path: 'login', component: LoginPage, canActivate: [guestGuard] },
    { path: 'products', component: ProductListPage, canActivate: [authGuard] },
    { path: 'products/new', component: ProductFormPage, canActivate: [authGuard] },
    { path: 'products/edit/:id', component: ProductFormPage, canActivate: [authGuard] }
];
