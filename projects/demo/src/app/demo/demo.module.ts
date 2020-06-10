import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page/demo-page.component';
import {
    DemoCodeDirective,
    DemoDescriptionDirective,
    DemoExamplesDirective,
    DemoTitleDirective,
    DemoUsageDirective,
} from './demo.directives';
import { DemoMenuComponent } from './demo-menu/demo-menu.component';
import { TraversalModule } from 'angular-traversal';
import { ButtonPageComponent } from './button-page/button-page.component';
import { IconPageComponent } from './icon-page/icon-page.component';
import { TranslatePageComponent } from './translate-page/translate-page.component';

import { PaButtonModule, PaIconModule, PaTextFieldModule, PaTogglesModule, PaTranslateModule } from '../../../../pastanaga-angular/src';
import { InputPageComponent } from './input-page/input-page.component';
import { FormsModule } from '@angular/forms';
import { CheckboxPageComponent } from './checkbox-page/checkbox-page.component';
import { BaseTextfieldComponent } from './common-doc/base-textfield/base-textfield.component';
import { BaseControlComponent } from './common-doc/base-control/base-control.component';


const COMPONENTS = [
    DemoPageComponent,
    DemoMenuComponent,
    DemoTitleDirective,
    DemoDescriptionDirective,
    DemoExamplesDirective,
    DemoUsageDirective,
    DemoCodeDirective,

    BaseControlComponent,
    BaseTextfieldComponent,

    ButtonPageComponent,
    CheckboxPageComponent,
    IconPageComponent,
    InputPageComponent,
    TranslatePageComponent,
];

@NgModule({
    imports: [
        CommonModule,
        TraversalModule,
        FormsModule,

        PaButtonModule,
        PaIconModule,
        PaTextFieldModule,
        PaTogglesModule,
        PaTranslateModule,
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class PaDemoModule {
}
