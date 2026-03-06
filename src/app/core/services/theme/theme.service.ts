import {computed, Injectable, signal} from '@angular/core';
import {ThemeName, ThemeTokens} from '../../models/theme.model';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme = signal<ThemeName>(this.getSavedTheme());
  private _customTokens = signal<Partial<ThemeTokens>>(this.getSavedCustomTokens());

  readonly theme = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');
  readonly customTokens = this._customTokens.asReadonly();

  constructor() {
    this.apply(this._theme());
    this.applyCustomTokens(this._customTokens());
  }

  set(theme: ThemeName) {
    this._theme.set(theme);
    this.apply(theme);
    localStorage.setItem('theme', theme);
  }

  toggle() {
    this.set(this.isDark() ? 'light' : 'dark');
  }

  setCustomTokens(tokens: Partial<ThemeTokens>) {
    this._customTokens.set(tokens);
    this.applyCustomTokens(tokens);
    localStorage.setItem('custom-tokens', JSON.stringify(tokens));
  }

  clearCustomTokens() {
    this._customTokens.set({});
    this.removeCustomTokens();
    localStorage.removeItem('custom-tokens');
  }

  private apply(theme: ThemeName) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  private applyCustomTokens(tokens: Partial<ThemeTokens>) {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(tokens)) {
      root.style.setProperty(`--${key}`, value);
    }
  }

  private removeCustomTokens() {
    const root = document.documentElement;
    this.apply(this._theme());
    for (const key of Object.keys({} as ThemeTokens)) {
      root.style.removeProperty(`--${key}`);
    }
  }

  private getSavedTheme(): ThemeName {
    return (localStorage.getItem('theme') as ThemeName) ?? 'dark';
  }

  private getSavedCustomTokens(): Partial<ThemeTokens> {
    try {
      return JSON.parse(localStorage.getItem('custom-tokens') ?? '{}');
    } catch {
      return {};
    }
  }
}
