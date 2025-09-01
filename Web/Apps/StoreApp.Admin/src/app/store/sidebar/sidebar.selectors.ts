import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SidebarState } from './sidebar.reducer';

export const selectSidebarState = createFeatureSelector<SidebarState>('sidebar');

export const selectSidebarIsOpen = createSelector(
  selectSidebarState,
  (state: SidebarState) => state.isOpen
);

export const selectSidebarIsExpanded = createSelector(
  selectSidebarState,
  (state: SidebarState) => state.isExpanded
);

export const selectSidebarIsMobile = createSelector(
  selectSidebarState,
  (state: SidebarState) => state.isMobile
);

export const selectSidebarVisibility = createSelector(
  selectSidebarIsOpen,
  selectSidebarIsMobile,
  (isOpen, isMobile) => ({
    isOpen,
    isMobile,
    shouldShow: isMobile ? isOpen : true
  })
);
