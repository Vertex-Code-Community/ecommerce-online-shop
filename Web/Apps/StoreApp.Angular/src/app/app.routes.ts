import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ProductListPage } from './pages/product-list-page/product-list-page';
import { ProductFormPage } from './pages/product-form-page/product-form-page';
import { guestGuard } from './guards/guest-guard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: 'login', component: LoginPage, canActivate: [guestGuard] },
    { path: 'products', component: ProductListPage, canActivate: [authGuard] },
    { path: 'products/new', component: ProductFormPage, canActivate: [authGuard] },
    { path: 'products/edit/:id', component: ProductFormPage, canActivate: [authGuard] }
];
