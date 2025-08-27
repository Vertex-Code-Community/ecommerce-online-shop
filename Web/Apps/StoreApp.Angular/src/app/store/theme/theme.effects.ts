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
          document.documentElement.setAttribute('data-theme', theme);
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
          let theme: Theme = Theme.Light;
          try {
            const saved = localStorage.getItem('theme') as ThemeActions.Theme | null;
            if (saved === 'light' || saved === 'dark') theme = saved;
            else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) theme = Theme.Dark;
          } catch {}
          this.store.dispatch(ThemeActions.setTheme({ theme }));
        })
      ),
    { dispatch: false }
  );
}
