import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import * as en from '../assets/i18n/en.json';
import * as la from '../assets/i18n/la.json';
import { DemoModule } from './demo/demo.module';

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
            'en_US': {...en} as any,
            'latin': {...la} as any,
        }},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
