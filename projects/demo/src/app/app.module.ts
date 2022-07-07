import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { PaDemoModule } from './demo';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PaButtonModule, PaSideNavModule } from '@guillotinaweb/pastanaga-angular';
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
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
