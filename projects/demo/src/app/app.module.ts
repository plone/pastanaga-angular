import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Marker, Normalizer, Resolver, TraversalModule } from 'angular-traversal';

import { AppComponent } from './app.component';
import { AppResolver } from './app.resolver';
import { AppMarker } from './app.marker';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { PaDemoModule } from './demo/demo.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { I18N_EN, PaButtonModule, PaTranslateModule, PA_LANG } from 'projects/pastanaga-angular/src';
import { PaSideNavModule } from 'projects/pastanaga-angular/src/lib/side-nav/side-nav.module';

@NgModule({
    declarations: [AppComponent, WelcomePageComponent],
    imports: [
        BrowserModule,
        TraversalModule,
        AngularSvgIconModule.forRoot(),
        PaDemoModule,
        PaButtonModule,
        PaSideNavModule,
        PaTranslateModule.addTranslations([{ en_US: I18N_EN }]),
    ],
    providers: [
        { provide: Marker, useClass: AppMarker },
        { provide: Resolver, useClass: AppResolver },
        Normalizer,
        { provide: PA_LANG, useValue: 'en_US' },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
