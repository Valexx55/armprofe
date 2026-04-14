import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    //provideZoneChangeDetection({ eventCoalescing: true }), //eliminamos ZOne JS como vigilante de los cambios/estado en los componentes
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(),//permite cargar el móudlo http, para poder conectaros a un api web
    provideZonelessChangeDetection()//hacemos que nuestro proyecto sea zoneLess
  ]
};
