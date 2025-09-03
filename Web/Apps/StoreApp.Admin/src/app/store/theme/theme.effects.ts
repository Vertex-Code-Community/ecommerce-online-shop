import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap, withLatestFrom} from 'rxjs';
import {Store} from '@ngrx/store';
import * as ThemeActions from './theme.actions';
import {Theme} from './theme.actions';
import {AppState} from '../app.state';
import {selectCurrentTheme} from './theme.selectors';

@Injectable()
export class ThemeEffects {
  private actions$ = inject(Actions);
  private store = inject(Store<AppState>);

  applyTheme$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ThemeActions.setTheme, ThemeActions.toggleTheme),
        withLatestFrom(this.store.select(selectCurrentTheme)),
        tap(([_, theme]) => {
          let actualTheme = theme;
          
          if (theme === ThemeActions.Theme.System) {
            actualTheme = window.matchMedia?.('(prefers-color-scheme: dark)').matches 
              ? ThemeActions.Theme.Dark 
              : ThemeActions.Theme.Light;
          }
          
          // Set data-theme attribute
          if (actualTheme === ThemeActions.Theme.Dark) {
            document.documentElement.setAttribute('data-theme', 'dark');
          } else {
            document.documentElement.removeAttribute('data-theme');
          }
          
          try {
            localStorage.setItem('theme', theme);
          } catch {}
        })
      ),
    { dispatch: false }
  );

  initTheme$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ThemeActions.initTheme),
        tap(() => {
          let theme: Theme = Theme.System;
          try {
            const saved = localStorage.getItem('theme') as ThemeActions.Theme | null;
            if (saved === 'light' || saved === 'dark' || saved === 'system') theme = saved;
          } catch {}
          this.store.dispatch(ThemeActions.setTheme({ theme }));
          
          // Listen for system theme changes
          if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
              this.store.select(selectCurrentTheme).subscribe(currentTheme => {
                if (currentTheme === Theme.System) {
                  this.store.dispatch(ThemeActions.setTheme({ theme: currentTheme }));
                }
              });
            });
          }
        })
      ),
    { dispatch: false }
  );

  // Listen for system theme changes when current theme is System
  systemThemeChange$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ThemeActions.setTheme),
        withLatestFrom(this.store.select(selectCurrentTheme)),
        tap(([action, currentTheme]) => {
          if (action.theme === Theme.System && window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => {
              const actualTheme = mediaQuery.matches ? Theme.Dark : Theme.Light;
              if (actualTheme === Theme.Dark) {
                document.documentElement.setAttribute('data-theme', 'dark');
              } else {
                document.documentElement.removeAttribute('data-theme');
              }
            };
            
            mediaQuery.addEventListener('change', handleChange);
          }
        })
      ),
    { dispatch: false }
  );
}
