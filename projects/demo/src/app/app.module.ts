import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PastanagaAngularModule } from '../../../pastanaga-angular/src/lib/pastanaga-angular.module';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        PastanagaAngularModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
