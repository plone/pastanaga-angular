import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { PaDemoModule } from './demo';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { I18N_EN, PaButtonModule, PaTranslateModule, PA_LANG, PaSideNavModule } from '@guillotinaweb/pastanaga-angular';
import { DEMO_LA } from '../assets';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, WelcomePageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularSvgIconModule.forRoot(),
    PaDemoModule,
    PaButtonModule,
    PaSideNavModule,
    PaTranslateModule.addTranslations([{ en_US: I18N_EN }, { latin: DEMO_LA }]),
  ],
  providers: [{ provide: PA_LANG, useValue: 'en_US' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
