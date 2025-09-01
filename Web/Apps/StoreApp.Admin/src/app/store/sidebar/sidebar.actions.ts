import { createAction, props } from '@ngrx/store';

export const toggleSidebar = createAction('[Sidebar] Toggle Sidebar');

export const setSidebarOpen = createAction('[Sidebar] Set Sidebar Open');

export const setSidebarClosed = createAction('[Sidebar] Set Sidebar Closed');

export const setSidebarExpanded = createAction('[Sidebar] Set Sidebar Expanded');

export const setSidebarCollapsed = createAction('[Sidebar] Set Sidebar Collapsed');

export const initSidebar = createAction(
  '[Sidebar] Initialize Sidebar',
  props<{ isMobile: boolean }>()
);
