import { Component, OnInit, OnDestroy, inject, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BchSelectComponent } from '../bch-select/bch-select.component';
import { AppState } from '../../../store/app.state';
import * as ThemeActions from '../../../store/theme/theme.actions';
import { selectCurrentTheme } from '../../../store/theme/theme.selectors';
import { Theme } from '../../../store/theme/theme.actions';

@Component({
  selector: 'app-header',
  imports: [BchSelectComponent],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidebarToggle = new EventEmitter<void>();

  private store = inject(Store<AppState>);
  private destroy$ = new Subject<void>();

  currentTheme$: Observable<Theme> = this.store.select(selectCurrentTheme);
  selectedTheme: Theme = Theme.System;

  themeOptions: Theme[] = [Theme.System, Theme.Light, Theme.Dark];

  ngOnInit(): void {
    this.store.dispatch(ThemeActions.initTheme());

    this.currentTheme$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(theme => {
      this.selectedTheme = theme;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onThemeChange(theme: Theme | null) {
    if (theme) {
      this.store.dispatch(ThemeActions.setTheme({ theme: theme }));
    }
  }

  onLoginClick() {
    console.log('Login button clicked');
    // TODO: Implement login navigation
  }

  onSidebarToggle() {
    this.sidebarToggle.emit();
  }

  optionLabel(theme: Theme): string {
    return theme.charAt(0).toUpperCase() + theme.slice(1).toLowerCase();
  }

  optionValue(theme: Theme): Theme {
    return theme;
  }
}
