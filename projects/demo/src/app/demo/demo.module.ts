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
    PaAvatarModule,
    PaButtonModule,
    PaIconModule,
    PaDropdownModule,
    PaPopupModule,
    PaTextFieldModule,
    PaTogglesModule,
    PaTranslateModule,
    PaTabsModule,
    PaTableModule,
    PaDateTimeModule,
    PaToastModule,
    PaModalModule,
} from '../../../../pastanaga-angular/src';
import { InputPageComponent } from './pages/input-page/input-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AvatarPageComponent } from './pages/avatar-page/avatar-page.component';
import { DateTimePageComponent } from './pages/datetime-page/datetime-page.component';
import { TogglePageComponent } from './pages/toggle-page/toggle-page.component';
import { ToastPageComponent } from './pages/toast-page/toast-page.component';
import { PaTooltipModule } from '../../../../pastanaga-angular/src/lib/tooltip/tootip.module';
import { TooltipPageComponent } from './pages/tooltip-page/tooltip-page.component';
import { PalettePageComponent } from './pages/palette-page/palette-page.component';
import { ModalPageComponent } from './pages/modal-page/modal-page.component';
import { DialogExampleComponent } from './pages/modal-page/dialog-example/dialog-example.component';
import { DialogImageExampleComponent } from './pages/modal-page/dialog-image-example/dialog-image-example.component';

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
    DialogExampleComponent,
    DialogImageExampleComponent,

    AvatarPageComponent,
    BasicPopupComponent,
    ButtonPageComponent,
    CheckboxPageComponent,
    DateTimePageComponent,
    DropdownPageComponent,
    GridPageComponent,
    IconPageComponent,
    InputPageComponent,
    ModalPageComponent,
    PalettePageComponent,
    PopupPageComponent,
    SelectPageComponent,
    TabsPageComponent,
    TablePageComponent,
    ToastPageComponent,
    TogglePageComponent,
    TextareaPageComponent,
    TooltipPageComponent,
    TranslatePageComponent,
];

@NgModule({
    imports: [
        CommonModule,
        TraversalModule,
        FormsModule,
        ReactiveFormsModule,

        PaAvatarModule,
        PaButtonModule,
        PaIconModule,
        PaDropdownModule,
        PaPopupModule,
        PaTextFieldModule,
        PaToastModule,
        PaTogglesModule,
        PaTranslateModule,
        PaTabsModule,
        PaTableModule,
        PaTooltipModule,
        PaDateTimeModule,
        PaModalModule,
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class PaDemoModule {}
