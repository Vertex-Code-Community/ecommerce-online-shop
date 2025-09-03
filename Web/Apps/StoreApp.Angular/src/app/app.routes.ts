import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { guestGuard } from './core/guards/guest-guard';
import { ClientLayoutComponent } from './shared/layout/client-layout.component';
import { HomeComponent } from './features/home/home.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';

export const routes: Routes = [
  { path: 'auth/login', component: LoginPage, canActivate: [guestGuard] },

  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]
  },
];
