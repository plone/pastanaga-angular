import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import * as enDemo from '../assets/i18n/en.json';
import * as custom from '../assets/i18n/custom-en.json';
import * as customCa from '../assets/i18n/custom-ca.json';
import * as la from '../assets/i18n/la.json';
import { DemoModule } from './demo/demo.module';
import { I18N_EN, SidebarModule, LANG, TranslateModule } from 'pastanaga-angular';
import { PaDocModule } from './doc/doc.module';
import { Marker, Normalizer, Resolver, TraversalModule } from 'angular-traversal';
import { DocResolver } from './doc/doc.resolver';
import { DocMarker } from './doc/doc.marker';
import { CommonModule } from '@angular/common';
import { PaDocPagesModule } from './doc/doc-pages.module';

@NgModule({
    imports: [
        DemoModule,
        PaDocPagesModule,
        PaDocModule,
        TraversalModule,
        SidebarModule,
        CommonModule,
        TranslateModule.addTranslations([
            { en_US: I18N_EN },
            { en_US: { ...enDemo['default'] } },
            { en_US: { ...custom['default'] } },
            { ca: { ...customCa['default'] } },
        ]),
    ],
    declarations: [AppComponent],
    providers: [
        { provide: LANG, useValue: 'en_US' },
        { provide: Resolver, useClass: DocResolver },
        { provide: Marker, useClass: DocMarker },
        Normalizer,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
