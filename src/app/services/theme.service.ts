import { Injectable } from '@angular/core';
import { Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  light = {
    '--primary-color': '#2979ff',
    '--secondary-color': '#1de9b6',
    '--yellow': '#ffea00',
    '--purple': '#d500f9',
    '--red': '#ff1744',
    '--orange': '#ff3d00',
    '--indigo': '#3d5afe',
    '--background-color': '#f0f0f0',
    '--box-color': '#2979ff',
    '--box-shadow': '#ccc',
    '--text-color': '#111111',
    '--border-color': '#111111',
  };

  dark = {
    '--primary-color': '#2979ff',
    '--secondary-color': '#1de9b6',
    '--yellow': '#ffea00',
    '--purple': '#d500f9',
    '--red': '#ff1744',
    '--orange': '#ff3d00',
    '--indigo': '#3d5afe',
    '--background-color': '#212834',
    '--box-color': '#11111170',
    '--box-shadow': '#111111',
    '--text-color': '#ffffff',
    '--border-color': '#ffffff',
  };

  constructor() {
    this.toggleTheme(Theme.DARK);
  }

  loadStyle(styleName: string) {
    const links = document.querySelectorAll('link[title]');
    links.forEach((link: any) => link.disabled = link.title !== styleName);
  }

  /**
   * Only concern is if the material theme and local theme get out of sync.
   * 
   * @param theme My CSS Properties Theme
   */
  toggleTheme(theme: Theme) {
    if (!document) return;
    const body = document.querySelector('body');
    let options = this.dark; // Default
    if (Theme.DARK === theme) {
      this.loadStyle('dark-theme'); // HLJS
      options = this.dark;
      body.classList.add('dark-mode');
    }
    if (Theme.LIGHT === theme) {
      this.loadStyle('light-theme'); // HLJS
      options = this.light;
      body.classList.remove('dark-mode');
    }

    Object.entries(options).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
  }
}
