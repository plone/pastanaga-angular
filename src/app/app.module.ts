import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RESTAPIModule } from '@plone/restapi-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CustomNavigationComponent } from './custom-navigation/custom-navigation.component';
import { CustomNavigationLevelComponent } from './custom-navigation-level/custom-navigation-level.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomNavigationComponent,
    CustomNavigationLevelComponent
  ],
  imports: [
    BrowserModule,
    RESTAPIModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: 'CONFIGURATION', useValue: {
        BACKEND_URL: environment.backendUrl,
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
