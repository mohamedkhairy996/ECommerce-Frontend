import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LanguageService } from './services/language.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let headers: Record<string, string> = {};
    const langService = inject(LanguageService);
  const lang = langService.getLanguage();

const cloned = req.clone({
  setHeaders: {
    'System-key': '12345678',
    'App-Language': lang
  }
  
});
  return next(cloned);
};
