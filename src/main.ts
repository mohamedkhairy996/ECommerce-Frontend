/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { SlickCarouselModule } from 'ngx-slick-carousel'; // ✅ Correct import
import { importProvidersFrom } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { storeReducer } from './app/Store/Category_info/category.reducer';

bootstrapApplication(AppComponent, {...appConfig,
 providers: [
    ...appConfig.providers || [],
    importProvidersFrom(SlickCarouselModule) // ✅ Correct usage
    ,
    provideStore({
        selectedStore: storeReducer

    })
]
})
  .catch((err) => console.error(err));
