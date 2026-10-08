import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { OVERLAY_DEFAULT_CONFIG } from '@angular/cdk/overlay';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: OVERLAY_DEFAULT_CONFIG, useValue: { usePopover: false } },
  ],
};
