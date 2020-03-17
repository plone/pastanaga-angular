import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import * as enDemo from '../assets/i18n/en.json';
import * as custom from '../assets/i18n/custom-en.json';
import * as la from '../assets/i18n/la.json';
import { DemoModule } from './demo/demo.module';
import { mergeTranslations, I18N_EN } from 'pastanaga-angular';
import { DocModule } from './doc/doc.module';

@NgModule({
    imports: [
        DemoModule,
        DocModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        {provide: 'LANG', useValue: 'en_US'},
        {provide: 'TRANSLATIONS', useValue: {
            'en_US': mergeTranslations([I18N_EN, {...enDemo['default']}, {...custom['default']}]),
            'latin': {...la},
        }},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
