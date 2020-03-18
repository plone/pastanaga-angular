import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
    AvatarModule,
    BadgeModule,
    ButtonModule, CalendarModule,
    ControlsModule, DialogModule, DropdownModule, ExpandModule, PopupModule,
    ProgressModule, SidebarModule,
    TextFieldModule,
    ToasterModule, TooltipModule,
    TranslateModule
} from 'pastanaga-angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MultipleScreensDialogComponent } from './multiple-screens-dialog.component';
import { OneScreenDialogComponent } from './one-screen-dialog.component';
import { TraversalModule } from 'angular-traversal';


@NgModule({
    declarations: [DemoComponent, MultipleScreensDialogComponent, OneScreenDialogComponent],
    imports: [
        CommonModule,

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
        DialogModule,
        TraversalModule,
    ],
    exports: [DemoComponent]
})
export class DemoModule {
}
