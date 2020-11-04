import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Marker, Normalizer, Resolver, TraversalModule } from 'angular-traversal';

import * as enDemo from '../assets/i18n/en.json';
import * as custom from '../assets/i18n/custom-en.json';
import * as la from '../assets/i18n/la.json';
import { AppComponent } from './app.component';
import { AppResolver } from './app.resolver';
import { AppMarker } from './app.marker';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { PaDemoModule } from './demo/demo.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { I18N_EN, mergeTranslations, PaButtonModule, PA_LANG, PA_TRANSLATIONS } from 'projects/pastanaga-angular/src';
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
    ],
    providers: [
        { provide: Marker, useClass: AppMarker },
        { provide: Resolver, useClass: AppResolver },
        Normalizer,
        { provide: PA_LANG, useValue: 'en_US' },
        {
            provide: PA_TRANSLATIONS,
            useValue: {
                en_US: mergeTranslations([I18N_EN, { ...(enDemo as any).default }, { ...(custom as any).default }]),
                latin: { ...la },
            },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
