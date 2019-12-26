import { Injectable } from '@angular/core';
import { Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  light = {
    '--primary-color': 'hsl(217, 71%, 53%)',
    '--secondary-color': 'hsl(141, 53%, 53%)',
    '--background-color': '#DDDDDD',
    '--text-color': '#111111'
  };

  dark = {
    '--primary-color': 'hsl(217, 71%, 53%)',
    '--secondary-color': 'hsl(141, 53%, 53%)',
    '--background-color': '#111111',
    '--text-color': '#DDDDDD'
  };

  constructor() { }

  toggleTheme(theme: Theme) {
    if (!document) return;

    let options = this.dark; // Default
    if (Theme.DARK === theme) options = this.dark;
    if (Theme.LIGHT === theme) options = this.light;
    Object.entries(options).forEach(([k,v]) => document.documentElement.style.setProperty(k, v));
  }
}
