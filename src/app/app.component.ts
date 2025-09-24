import { Component, ViewChild, ViewContainerRef, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('themeContainer', { read: ViewContainerRef }) themeContainer!: ViewContainerRef;

  constructor(private _themeService: ThemeService) {}

  ngOnInit() {
    this._themeService.currentTheme$.subscribe(() => {
      this.loadThemeComponent();
    });
  }

  ngAfterViewInit() {
    // ⬅️ أول مرة نحمل فيها default theme1
    this.loadThemeComponent();
  }

  switchTheme(theme: 'theme1' | 'theme2' | 'theme3') {
    this._themeService.setTheme(theme);
  }

  loadThemeComponent() {
    if (!this.themeContainer) return;
    this.themeContainer.clear();
    const component = this._themeService.getThemeComponent();
    this.themeContainer.createComponent(component);
  }

  ngOnDestroy() {
    // cleanup لو محتاج
  }
}
