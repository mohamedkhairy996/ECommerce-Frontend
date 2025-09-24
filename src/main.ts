/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { SlickCarouselModule } from 'ngx-slick-carousel'; // ✅ Correct import
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {...appConfig,
 providers: [
    ...appConfig.providers || [],
    importProvidersFrom(SlickCarouselModule) // ✅ Correct usage
  ]
})
  .catch((err) => console.error(err));
