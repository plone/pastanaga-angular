import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    TranslateModule, SidebarModule
} from '../../projects/pastanaga/src';

import * as en from '../assets/i18n/en.json';
import * as la from '../assets/i18n/la.json';
import { CalendarModule } from 'pastanaga-angular/lib/calendar/calendar.module';

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
        SidebarModule,
        CalendarModule,
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
