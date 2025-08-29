import { createAction, props } from '@ngrx/store';

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}

export const initTheme = createAction('[Theme] Init');
export const setTheme = createAction('[Theme] Set', props<{ theme: Theme }>());
export const toggleTheme = createAction('[Theme] Toggle');
