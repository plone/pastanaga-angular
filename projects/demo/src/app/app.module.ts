import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Marker, Normalizer, Resolver, TraversalModule } from 'angular-traversal';

import { AppComponent } from './app.component';
import { AppResolver } from './app.resolver';
import { AppMarker } from './app.marker';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { PaDemoModule } from './demo/demo.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [
        AppComponent,
        WelcomePageComponent,
    ],
    imports: [
        BrowserModule,
        TraversalModule,
        AngularSvgIconModule.forRoot(),
        PaDemoModule,
    ],
    providers: [
        {provide: Marker, useClass: AppMarker},
        {provide: Resolver, useClass: AppResolver},
        {provide: Normalizer},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
