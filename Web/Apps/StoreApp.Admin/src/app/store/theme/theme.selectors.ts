import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ThemeState } from './theme.reducer';

export const selectThemeState = createFeatureSelector<ThemeState>('theme');

export const selectCurrentTheme = createSelector(
  selectThemeState,
  state => state.current
);
