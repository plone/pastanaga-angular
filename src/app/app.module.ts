import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {
    BadgeModule,
    ButtonModule,
    CalendarModule,
    ControlsModule,
    ExpandModule,
    ProgressModule,
    TextFieldModule,
    ToasterModule,
    TooltipModule,
    SidebarModule,
    TranslateModule, DropdownModule, PopupModule, AvatarModule,
} from '../../projects/pastanaga/src';

import * as en from '../assets/i18n/en.json';
import * as la from '../assets/i18n/la.json';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TranslateModule,
        AngularSvgIconModule.forRoot(),

        BadgeModule,
        ButtonModule,
        ControlsModule,
        ProgressModule,
        ToasterModule,
        TextFieldModule,
        TooltipModule,
        ExpandModule,
        SidebarModule,
        CalendarModule,
        DropdownModule,
        PopupModule,
        AvatarModule,
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
