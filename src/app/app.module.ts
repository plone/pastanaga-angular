import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import {
    BadgeModule,
    ButtonModule,
    ControlsModule,
    ProgressModule,
    TextFieldModule,
    ToasterModule,
    TooltipModule,
    ExpandModule,
    TranslateModule
} from '../../projects/pastanaga/src';

import * as en from '../assets/i18n/en.json';
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TranslateModule,

        BadgeModule,
        ButtonModule,
        ControlsModule,
        ProgressModule,
        ToasterModule.forRoot(),
        TextFieldModule,
        TooltipModule,
        ExpandModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [{provide: 'en_US', useValue: {...en} as any}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
