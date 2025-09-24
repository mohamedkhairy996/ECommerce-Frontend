import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private lang = 'eg'; // default

  setLanguage(lang: string) {
    this.lang = lang;
    localStorage.setItem('app-lang', lang);
  }

  getLanguage(): string {
    return localStorage.getItem('app-lang') == "en" ? "en" : "eg";
  }
}
