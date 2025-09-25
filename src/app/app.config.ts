import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { provideStore } from '@ngrx/store';
import { storeReducer } from './Store/Category_info/category.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
  ) ,
   provideStore({
      selectedStore: storeReducer // 'selectedStore' is the feature name
    })
  ]
};
