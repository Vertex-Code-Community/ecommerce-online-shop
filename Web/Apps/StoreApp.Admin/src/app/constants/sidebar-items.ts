import {SidebarItem} from '../shared/models/sidebar-item.interface';

export const SidebarItems: SidebarItem[] = [
  {
    id: 'products',
    label: 'Products',
    icon: '/assets/svg/sidebar/products.svg',
    route: '/products',
    type: 'violet'
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: '/assets/svg/sidebar/orders.svg',
    route: '/orders',
    type: 'blue'
  },
  {
    id: 'categories',
    label: 'Categories',
    icon: '/assets/svg/sidebar/categories.svg',
    route: '/categories',
    type: 'sky-blue'
  }
];
