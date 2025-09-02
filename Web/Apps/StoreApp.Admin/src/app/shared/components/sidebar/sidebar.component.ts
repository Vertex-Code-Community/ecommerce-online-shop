import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarItem } from '../../models/sidebar-item.interface';
import { SidebarItems } from '../../../constants/sidebar-items';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  isExpanded = true;
  activeItemId = '';
  sidebarItems = SidebarItems;

  router: Router = inject(Router);

  ngOnInit(): void {
    this.setActiveItemFromRoute();
  }

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
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
