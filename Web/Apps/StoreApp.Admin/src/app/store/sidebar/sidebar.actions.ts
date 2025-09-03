import { createAction, props } from '@ngrx/store';

export const toggleSidebar = createAction('[Sidebar] Toggle Sidebar');

export const setSidebarOpen = createAction('[Sidebar] Set Sidebar Open');

export const setSidebarClosed = createAction('[Sidebar] Set Sidebar Closed');
