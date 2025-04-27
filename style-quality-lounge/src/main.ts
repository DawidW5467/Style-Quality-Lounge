import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, RouterPreloader } from '@angular/router';
import routeConfig from './app/routes';
import { routes } from './app/app.routes';


bootstrapApplication(AppComponent,{
  providers: [provideRouter(routeConfig)]
}).catch((err) => console.error(err));
