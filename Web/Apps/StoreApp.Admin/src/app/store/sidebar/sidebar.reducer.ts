import { createReducer, on } from '@ngrx/store';
import * as SidebarActions from './sidebar.actions';

export interface SidebarState {
  isOpen: boolean;
  isExpanded: boolean;
  isMobile: boolean;
}

export const initialState: SidebarState = {
  isOpen: true,
  isExpanded: true,
  isMobile: false
};

export const sidebarReducer = createReducer(
  initialState,
  on(SidebarActions.toggleSidebar, (state) => ({
    ...state,
    isOpen: !state.isOpen
  })),
  on(SidebarActions.setSidebarOpen, (state) => ({
    ...state,
    isOpen: true
  })),
  on(SidebarActions.setSidebarClosed, (state) => ({
    ...state,
    isOpen: false
  })),
  on(SidebarActions.setSidebarExpanded, (state) => ({
    ...state,
    isExpanded: true
  })),
  on(SidebarActions.setSidebarCollapsed, (state) => ({
    ...state,
    isExpanded: false
  })),
  on(SidebarActions.initSidebar, (state, { isMobile }) => ({
    ...state,
    isMobile,
    isOpen: !isMobile // Open on desktop, closed on mobile
  }))
);
