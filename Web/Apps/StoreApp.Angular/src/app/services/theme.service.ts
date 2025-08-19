import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'theme';
  private readonly themeSubject = new BehaviorSubject<Theme>(this.getInitialTheme());
  readonly theme$ = this.themeSubject.asObservable();

  init(): void {
    this.applyTheme(this.themeSubject.value);
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    this.applyTheme(theme);
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch {
      // ignore storage errors
    }
  }

  toggleTheme(): void {
    const next: Theme = this.themeSubject.value === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  private getInitialTheme(): Theme {
    try {
      const saved = localStorage.getItem(this.storageKey) as Theme | null;
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore
    }
    const prefersDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }
}



