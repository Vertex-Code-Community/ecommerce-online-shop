export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  type: 'violet' | 'blue' | 'orange' | 'sky-blue';
  isActive?: boolean;
}
