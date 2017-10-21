import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RESTAPIModule } from '@plone/restapi-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatListModule,
  MatIconModule
} from '@angular/material';

import { environment } from '../environments/environment';
import { IconsModule } from './icons/icons.module';
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
    MatListModule,
    MatIconModule,
    IconsModule
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
export class AppModule {
}
