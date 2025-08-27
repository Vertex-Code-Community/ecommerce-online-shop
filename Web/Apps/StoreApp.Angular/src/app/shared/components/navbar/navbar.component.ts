import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/app.state';
import * as AuthActions from '../../../store/auth/auth.actions';
import { selectIsAuthenticated } from '../../../store/auth/auth.selectors';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private store = inject(Store<AppState>);
  private router = inject(Router);
  private themeService = inject(ThemeService);

  isAuthenticated$: Observable<boolean> = this.store.select(selectIsAuthenticated);

  onLogout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }

  onToggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
