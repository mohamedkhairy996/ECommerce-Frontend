import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from '../environments/environment.development';
import { provideSweetAlert2 } from "@sweetalert2/ngx-sweetalert2";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom(NgxStripeModule.forRoot(environment.stripePublicKey)), // ✅ هنا,,
     provideSweetAlert2({
            // Optional configuration
            fireOnInit: false,
            dismissOnDestroy: true,
        }),
  ]
};
