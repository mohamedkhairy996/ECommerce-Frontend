// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme1Component } from '../themes/theme1/theme1.component';
import { Theme3Component } from '../themes/theme3/theme3.component';
import { Theme2Component } from '../themes/theme2/theme2.component';

export type ThemeType = 'theme1' | 'theme2' | 'theme3';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = new BehaviorSubject<'theme1' | 'theme2' | 'theme3'>('theme1'); // 👈 default
  currentTheme$ = this.currentTheme.asObservable();

  setTheme(theme: ThemeType) {
    this.currentTheme.next(theme);
  }

  getThemeComponent() {
    switch (this.currentTheme.value) {
      case 'theme1': return Theme1Component;
      case 'theme2': return Theme2Component;
      case 'theme3': return Theme3Component;
      default: return Theme1Component;
    }
  }
}