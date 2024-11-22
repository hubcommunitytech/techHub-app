import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { DatePipe, registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { routes } from './app.routes';
registerLocaleData(localePt, 'pt');

export const appConfig: ApplicationConfig = {
  providers:
    [provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: LOCALE_ID, useValue: 'pt' },
    provideRouter(routes),
      DatePipe,
      MessageService
    ],
};
