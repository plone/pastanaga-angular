import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RESTAPIModule } from '@plone/restapi-angular';
import { MediumEditorComponent } from './medium';

import {
  MatListModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatCardModule,
} from '@angular/material';

import { environment } from '../environments/environment';
import { IconsModule } from './icons/icons.module';
import { AppComponent } from './app.component';

import { PastanagaLoginComponent } from './pastanaga-login/pastanaga-login.component';
import { PastanagaEditDocumentComponent } from './pastanaga-edit-document/pastanaga-edit-document.component';
import { PastanagaHomeComponent } from './pastanaga-home/pastanaga-home.component';
import { PastanagaToolbarComponent } from './pastanaga-toolbar/pastanaga-toolbar.component';
import { PastanagaAddDocumentComponent } from './pastanaga-add-document/pastanaga-add-document.component';
import { PastanagaViewComponent } from './pastanaga-view/pastanaga-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MediumEditorComponent,
    PastanagaLoginComponent,
    PastanagaEditDocumentComponent,
    PastanagaHomeComponent,
    PastanagaToolbarComponent,
    PastanagaAddDocumentComponent,
    PastanagaViewComponent,
  ],
  entryComponents: [
    PastanagaHomeComponent,
    PastanagaLoginComponent,
    PastanagaEditDocumentComponent,
    PastanagaAddDocumentComponent,
    PastanagaViewComponent,
  ],
  imports: [
    BrowserModule,
    RESTAPIModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    IconsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
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
