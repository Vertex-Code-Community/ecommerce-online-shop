import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarItem, SidebarGroup } from '../../models/sidebar-item.interface';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Output() expandedChange = new EventEmitter<boolean>();

  isExpanded = true;
  activeItemId = '';

  readonly sidebarGroups: SidebarGroup[] = [
    {
      items: [
        {
          id: 'products',
          label: 'Products',
          icon: '/assets/icons/sidebar/products.svg',
          route: '/products',
          type: 'dashboard'
        },
        {
          id: 'orders',
          label: 'Orders',
          icon: '/assets/icons/sidebar/orders.svg',
          route: '/orders',
          type: 'components'
        },
        {
          id: 'categories',
          label: 'Categories',
          icon: '/assets/icons/sidebar/categories.svg',
          route: '/categories',
          type: 'subscriptions'
        }
      ]
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setActiveItemFromRoute();
  }

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
    this.expandedChange.emit(this.isExpanded);
  }

  onItemClick(item: SidebarItem): void {
    this.activeItemId = item.id;
    // this.router.navigate([item.route]);
  }

  isItemActive(item: SidebarItem): boolean {
    return this.activeItemId === item.id;
  }

  getActiveClass(item: SidebarItem): string {
    return this.isItemActive(item) ? 'active-tab' : '';
  }

  private setActiveItemFromRoute(): void {
    const currentRoute = this.router.url;
    const allItems = this.sidebarGroups.flatMap(group => group.items);
    const activeItem = allItems.find(item => item.route === currentRoute);
    
    if (activeItem) {
      this.activeItemId = activeItem.id;
    }
  }
}
