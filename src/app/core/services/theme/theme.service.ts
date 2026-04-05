import { computed, Injectable, signal } from '@angular/core';
import { ThemeName, ThemeTokens } from '../../models/theme.model';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme = signal<ThemeName>(this.getSavedTheme());
  private _customTokens = signal<Partial<ThemeTokens>>(this.getSavedCustomTokens());

  readonly theme = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');
  readonly customTokens = this._customTokens.asReadonly();

  constructor() {
    this.applyTheme(this._theme());
    this.applyCustomTokens(this._customTokens());
  }

  set(theme: ThemeName) {
    this._theme.set(theme);
    this.applyTheme(theme);
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
    const root = document.documentElement;
    // Remove only the keys we previously set — fixes the empty-object bug
    for (const key of Object.keys(this._customTokens())) {
      root.style.removeProperty(`--p-${key}`);
    }
    this._customTokens.set({});
    localStorage.removeItem('custom-tokens');
  }

  private applyTheme(theme: ThemeName) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  private applyCustomTokens(tokens: Partial<ThemeTokens>) {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(tokens)) {
      // Targets --p-primary etc., which @theme inline passes through to utilities
      root.style.setProperty(`--p-${key}`, value);
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
