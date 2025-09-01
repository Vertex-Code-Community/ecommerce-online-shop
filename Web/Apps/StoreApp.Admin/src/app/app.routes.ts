import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { guestGuard } from './core/guards/guest-guard';
import { authGuard } from './core/guards/auth-guard';
import { AdminLayoutComponent } from './shared/layout/admin-layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginPage, canActivate: [guestGuard] },

  {
    path: '',
    component: AdminLayoutComponent,
    // canActivate: [authGuard],
    children: [

    ]
  },
];
