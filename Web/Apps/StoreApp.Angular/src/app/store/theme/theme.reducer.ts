import { createReducer, on } from '@ngrx/store';
import * as ThemeActions from './theme.actions';
import { Theme } from './theme.actions';

export interface ThemeState {
  current: Theme;
}

export const initialState: ThemeState = {
  current: Theme.Light
};

export const themeReducer = createReducer(
  initialState,
  on(ThemeActions.setTheme, (state, { theme }) => ({ ...state, current: theme })),
  on(ThemeActions.toggleTheme, state => ({
    ...state,
    current: state.current === Theme.Dark ? Theme.Light : Theme.Dark
  }))
);
