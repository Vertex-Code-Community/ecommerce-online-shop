import {Component, EventEmitter, Output, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { selectCartTotalCount } from '../../../store/cart/cart.selectors';
import { selectIsAuthenticated } from '../../../store/auth/auth.selectors';
import * as CartActions from '../../../store/cart/cart.actions';
import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter<void>();

  private store: Store<AppState> = inject(Store);
  private router: Router = inject(Router);

  cartItemsCount$: Observable<number> = this.store.select(selectCartTotalCount);
  isAuthenticated$: Observable<boolean> = this.store.select(selectIsAuthenticated);

  ngOnInit(): void {
    this.store.dispatch(CartActions.loadCart());
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/']);
  }

  onLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
