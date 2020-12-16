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
    PaChipsModule,
    PaDateTimeModule,
    PaDropdownModule,
    PaFocusableModule,
    PaIconModule,
    PaModalModule,
    PaPopupModule,
    PaTextFieldModule,
    PaTogglesModule,
    PaTranslateModule,
    PaTabsModule,
    PaTableModule,
    PaToastModule,
} from '../../../../pastanaga-angular/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarPageComponent } from './pages/avatar-page/avatar-page.component';
import { BaseControlUsageComponent } from './pages/common-doc/base-control/base-control-usage.component';
import { BasicPopupComponent } from './pages/popup-page/basic-popup.component';
import { BreakpointPageComponent } from './pages/breakpoint-page/breakpoint-page.component';
import { CheckboxPageComponent } from './pages/checkbox-page/checkbox-page.component';
import { DateTimePageComponent } from './pages/datetime-page/datetime-page.component';
import { DialogExampleComponent } from './pages/modal-page/dialog-example/dialog-example.component';
import { DialogImageExampleComponent } from './pages/modal-page/dialog-image-example/dialog-image-example.component';
import { DropdownPageComponent } from './pages/dropdown-page/dropdown-page.component';
import { DeprecatedBaseControlComponent } from './pages/common-doc/base-control/deprecated-base-control.component';
import { DeprecatedBaseTextfieldComponent } from './pages/common-doc/base-textfield/deprecated-base-textfield.component';
import { GridPageComponent } from './pages/grid-page/grid-page.component';
import { InputPageComponent } from './pages/input-page/input-page.component';
import { ModalExampleComponent } from './pages/modal-page/modal-example/modal-example.component';
import { ModalPageComponent } from './pages/modal-page/modal-page.component';
import { PalettePageComponent } from './pages/palette-page/palette-page.component';
import { PopupPageComponent } from './pages/popup-page/popup-page.component';
import { SelectPageComponent } from './pages/select-page/select-page.component';
import { TablePageComponent } from './pages/table-page/table-page.component';
import { TabsPageComponent } from './pages/tabs-page/tabs-page.component';
import { TextareaPageComponent } from './pages/text-area-page/textarea-page.component';
import { ToastPageComponent } from './pages/toast-page/toast-page.component';
import { TogglePageComponent } from './pages/toggle-page/toggle-page.component';
import { TooltipPageComponent } from './pages/tooltip-page/tooltip-page.component';
import { PaTooltipModule } from '../../../../pastanaga-angular/src/lib/tooltip/tootip.module';
import { FocusablePageComponent } from './pages/focusable-page/focusable-page.component';
import { PaSideNavModule } from '../../../../pastanaga-angular/src/lib/side-nav/side-nav.module';
import { DemoComponent } from './demo.component';
import { ChipPageComponent } from './pages/chip-page/chip-page.component';
import { SidenavPageComponent } from './pages/sidenav-page/sidenav-page.component';

const COMPONENTS = [
    DemoComponent,
    DemoPageComponent,
    DemoMenuComponent,
    DemoTitleDirective,
    DemoDescriptionDirective,
    DemoExamplesDirective,
    DemoUsageDirective,
    DemoCodeDirective,
    DemoConfigurationDirective,

    BaseControlUsageComponent,
    DeprecatedBaseControlComponent,
    DeprecatedBaseTextfieldComponent,
    DialogExampleComponent,
    DialogImageExampleComponent,
    ModalExampleComponent,

    AvatarPageComponent,
    BasicPopupComponent,
    BreakpointPageComponent,
    ButtonPageComponent,
    CheckboxPageComponent,
    ChipPageComponent,
    DateTimePageComponent,
    DropdownPageComponent,
    FocusablePageComponent,
    GridPageComponent,
    IconPageComponent,
    InputPageComponent,
    ModalPageComponent,
    PalettePageComponent,
    PopupPageComponent,
    SelectPageComponent,
    SidenavPageComponent,
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
        PaChipsModule,
        PaIconModule,
        PaDropdownModule,
        PaFocusableModule,
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
        PaSideNavModule,
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class PaDemoModule {}
