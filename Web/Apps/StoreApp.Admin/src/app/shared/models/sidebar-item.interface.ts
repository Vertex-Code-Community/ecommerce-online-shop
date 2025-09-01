export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  type: 'dashboard' | 'components' | 'subscriptions' | 'documentation';
  isActive?: boolean;
}

export interface SidebarGroup {
  items: SidebarItem[];
  hasSeparator?: boolean;
}
