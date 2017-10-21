import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RESTAPIModule } from '@plone/restapi-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatListModule,
  MatIconModule
} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

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
    MatListModule,
    MatIconModule
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
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('add',sanitizer.bypassSecurityTrustResourceUrl('../assets/Icons/add.svg'));
    // iconRegistry.addSvgIcon('icon2',sanitizer.bypassSecurityTrustResourceUrl('../assets/Icons/icon2.svg'));
  }
 }
