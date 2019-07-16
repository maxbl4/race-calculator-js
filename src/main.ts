import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import Backendless from 'backendless';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const APP_ID: string = '5FED38D0-4FEA-0BE1-FF61-037A9C4E2E00';
const API_KEY: string = 'BDD54FFF-E75F-3884-FF24-A72A8BDD0F00';
Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
