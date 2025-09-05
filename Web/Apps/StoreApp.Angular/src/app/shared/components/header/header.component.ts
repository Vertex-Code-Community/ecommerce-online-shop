import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { selectCartTotalCount } from '../../../store/cart/cart.selectors';
import * as CartActions from '../../../store/cart/cart.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter<void>();

  cartItemsCount$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.cartItemsCount$ = this.store.select(selectCartTotalCount);
  }

  ngOnInit(): void {
    this.store.dispatch(CartActions.loadCart());
  }
}
