import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
registerLocaleData(localePt, 'pt');

export const appConfig: ApplicationConfig = {
  providers:
    [provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    { provide: LOCALE_ID, useValue: 'pt' },
    provideRouter(routes),
      DatePipe
    ]
};
