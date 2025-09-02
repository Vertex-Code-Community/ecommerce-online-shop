import { createReducer, on } from '@ngrx/store';
import * as SidebarActions from './sidebar.actions';

export interface SidebarState {
  isExpanded: boolean;
}

export const initialState: SidebarState = {
  isExpanded: false,
};

export const sidebarReducer = createReducer(
  initialState,
  on(SidebarActions.toggleSidebar, (state) => ({
    ...state,
    isExpanded: !state.isExpanded
  })),
  on(SidebarActions.setSidebarOpen, (state) => ({
    ...state,
    isExpanded: true
  })),
  on(SidebarActions.setSidebarClosed, (state) => ({
    ...state,
    isExpanded: false
  })),
);
