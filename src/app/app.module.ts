import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RESTAPIModule } from '@plone/restapi-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { PastanagaLoginComponent } from './pastanaga-login/pastanaga-login.component';
import { PastanagaEditDocumentComponent } from './pastanaga-edit-document/pastanaga-edit-document.component';
import { PastanagaHomeComponent } from './pastanaga-home/pastanaga-home.component';
import { PastanagaToolbarComponent } from './pastanaga-toolbar/pastanaga-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    PastanagaLoginComponent,
    PastanagaEditDocumentComponent,
    PastanagaHomeComponent,
    PastanagaToolbarComponent
  ],
  entryComponents: [
    PastanagaHomeComponent,
    PastanagaLoginComponent,
    PastanagaEditDocumentComponent,
  ],
  imports: [
    BrowserModule,
    RESTAPIModule,
    BrowserAnimationsModule,
    MatListModule
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
