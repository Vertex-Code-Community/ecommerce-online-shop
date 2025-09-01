import { Component } from '@angular/core';
import { BchSelectComponent } from '../bch-select/bch-select.component';

interface ThemeOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-header',
  imports: [BchSelectComponent],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  themeOptions: ThemeOption[] = [
    { value: 'light', label: '🌞 Light' },
    { value: 'dark', label: '🌙 Dark' },
    { value: 'auto', label: '🔄 Auto' }
  ];

  onThemeChange(theme: ThemeOption | null) {
    if (theme) {
      console.log('Theme changed to:', theme.value);
      // TODO: Implement theme switching logic
      this.applyTheme(theme.value);
    }
  }

  onLoginClick() {
    console.log('Login button clicked');
    // TODO: Implement login navigation
  }

  private applyTheme(theme: string) {
    const root = document.documentElement;

    switch (theme) {
      case 'dark':
        root.setAttribute('data-theme', 'dark');
        break;
      case 'light':
        root.removeAttribute('data-theme');
        break;
      case 'auto':
        root.removeAttribute('data-theme');
        break;
    }
  }

  optionLabel(theme: ThemeOption): string {
    return theme.label;
  }

  optionValue(theme: ThemeOption): string {
    return theme.value;
  }
}
