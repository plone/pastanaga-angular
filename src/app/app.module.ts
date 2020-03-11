import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import * as en from '../assets/i18n/en.json';
import * as custom from '../assets/i18n/custom-en.json';
import * as la from '../assets/i18n/la.json';
import { DemoModule } from './demo/demo.module';
import { mergeTranslations } from 'pastanaga-angular';

@NgModule({
    imports: [
        DemoModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        {provide: 'LANG', useValue: 'en_US'},
        {provide: 'TRANSLATIONS', useValue: {
            'en_US': mergeTranslations([{...en}, {...custom}]),
            'latin': {...la},
        }},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
