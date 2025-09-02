import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SidebarItem } from '../../models/sidebar-item.interface';
import { SidebarItems } from '../../../constants/sidebar-items';
import { AppState } from '../../../store/app.state';
import * as SidebarActions from '../../../store/sidebar/sidebar.actions';
import * as SidebarSelectors from '../../../store/sidebar/sidebar.selectors';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  activeItemId = '';
  sidebarItems = SidebarItems;

  private store = inject(Store<AppState>);
  private router: Router = inject(Router);
  
  isExpanded$: Observable<boolean> = this.store.select(SidebarSelectors.selectSidebarIsExpanded);

  ngOnInit(): void {
    this.setActiveItemFromRoute();
  }

  toggleSidebar(): void {
    this.store.dispatch(SidebarActions.toggleSidebar());
  }

  onItemClick(item: SidebarItem): void {
    this.activeItemId = item.id;
    // this.router.navigate([item.route]);
  }

  isItemActive(item: SidebarItem): boolean {
    return this.activeItemId === item.id;
  }

  private setActiveItemFromRoute(): void {
    const currentRoute = this.router.url;
    const activeItem = this.sidebarItems.find(item => item.route === currentRoute);

    if (activeItem) {
      this.activeItemId = activeItem.id;
    }
  }
}
