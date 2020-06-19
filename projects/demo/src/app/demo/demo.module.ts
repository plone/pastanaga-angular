import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page/demo-page.component';
import {
    DemoCodeDirective,
    DemoConfigurationDirective,
    DemoDescriptionDirective,
    DemoExamplesDirective,
    DemoTitleDirective,
    DemoUsageDirective,
} from './demo.directives';
import { DemoMenuComponent } from './demo-menu/demo-menu.component';
import { TraversalModule } from 'angular-traversal';
import { ButtonPageComponent } from './pages/button-page/button-page.component';
import { IconPageComponent } from './pages/icon-page/icon-page.component';
import { TranslatePageComponent } from './pages/translate-page/translate-page.component';

import {
    PaButtonModule,
    PaIconModule,
    PaDropdownModule,
    PaPopupModule,
    PaTextFieldModule,
    PaTogglesModule,
    PaTranslateModule,
    PaTabsModule,
    PaTableModule,
} from '../../../../pastanaga-angular/src';
import { InputPageComponent } from './pages/input-page/input-page.component';
import { FormsModule } from '@angular/forms';
import { CheckboxPageComponent } from './pages/checkbox-page/checkbox-page.component';
import { BaseTextfieldComponent } from './pages/common-doc/base-textfield/base-textfield.component';
import { BaseControlComponent } from './pages/common-doc/base-control/base-control.component';
import { PopupPageComponent } from './pages/popup-page/popup-page.component';
import { BasicPopupComponent } from './pages/popup-page/basic-popup.component';
import { DropdownPageComponent } from './pages/dropdown-page/dropdown-page.component';
import { SelectPageComponent } from './pages/select-page/select-page.component';
import { GridPageComponent } from './pages/grid-page/grid-page.component';
import { TabsPageComponent } from './pages/tabs-page/tabs-page.component';
import { TablePageComponent } from './pages/table-page/table-page.component';
import { TextareaPageComponent } from './pages/text-area-page/textarea-page.component';

const COMPONENTS = [
    DemoPageComponent,
    DemoMenuComponent,
    DemoTitleDirective,
    DemoDescriptionDirective,
    DemoExamplesDirective,
    DemoUsageDirective,
    DemoCodeDirective,
    DemoConfigurationDirective,

    BaseControlComponent,
    BaseTextfieldComponent,

    ButtonPageComponent,
    CheckboxPageComponent,
    SelectPageComponent,
    IconPageComponent,
    InputPageComponent,
    DropdownPageComponent,
    PopupPageComponent,
    BasicPopupComponent,
    TranslatePageComponent,
    GridPageComponent,
    TabsPageComponent,
    TablePageComponent,
    TextareaPageComponent,
];

@NgModule({
    imports: [
        CommonModule,
        TraversalModule,
        FormsModule,

        PaButtonModule,
        PaIconModule,
        PaDropdownModule,
        PaPopupModule,
        PaTextFieldModule,
        PaTogglesModule,
        PaTranslateModule,
        PaTabsModule,
        PaTableModule,
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class PaDemoModule {
}
