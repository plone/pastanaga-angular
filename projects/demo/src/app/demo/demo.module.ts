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
import * as enDemo from '../../assets/i18n/en.json';
import * as custom from '../../assets/i18n/custom-en.json';
import * as la from '../../assets/i18n/la.json';

import {
    PaAvatarModule,
    PaButtonModule,
    PaChipsModule,
    PaDateTimeModule,
    PaDropdownModule,
    PaExpanderModule,
    PaFocusableModule,
    PaFormFieldModule,
    PaIconModule,
    PaModalModule,
    PaPopupModule,
    PaSideNavModule,
    PaTableModule,
    PaTabsModule,
    PaTextFieldModule,
    PaToastModule,
    PaTogglesModule,
    PaTranslateModule,
} from '../../../../pastanaga-angular/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarPageComponent } from './pages/avatar-page/avatar-page.component';
import { BaseControlUsageComponent } from './pages/common-doc/base-control/base-control-usage.component';
import { CheckboxPageComponent } from './pages/checkbox-page/checkbox-page.component';
import { DateTimePageComponent } from './pages/datetime-page/datetime-page.component';
import { DialogExampleComponent } from './pages/modal-page/dialog-example/dialog-example.component';
import { DialogImageExampleComponent } from './pages/modal-page/dialog-image-example/dialog-image-example.component';
import { DropdownPageComponent } from './pages/dropdown-page/dropdown-page.component';
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
import { DemoComponent } from './demo.component';
import { ChipPageComponent } from './pages/chip-page/chip-page.component';
import { SidenavPageComponent } from './pages/sidenav-page/sidenav-page.component';
import { ContainerPageComponent } from './pages/container-page/container-page.component';
import { ContainerDemoComponent } from './pages/container-page/container-demo/container-demo.component';
import { FormFieldHintPageComponent } from './pages/form-field-hint-page/form-field-hint-page.component';
import { FormControlPageComponent } from './pages/form-control-page/form-control-page.component';
import { FormControlIdExampleComponent } from './pages/form-control-page/id-example/form-control-id-example.component';
import { FormControlNameExampleComponent } from './pages/form-control-page/name-example/form-control-name-example.component';
import { FormControlValueExampleComponent } from './pages/form-control-page/value-example/form-control-value-example.component';
import { FormControlStateExampleComponent } from './pages/form-control-page/state-example/form-control-state-example.component';
import { FormControlValidationExampleComponent } from './pages/form-control-page/validation-example/form-control-validation-example.component';
import { PaFormControlUsageComponent } from './pages/form-control-page/usage/pa-form-control-usage.component';
import { InputStandaloneExampleComponent } from './pages/input-page/input-standalone-example/input-standalone-example.component';
import { InputNgModelExampleComponent } from './pages/input-page/input-ng-model-example/input-ng-model-example.component';
import { InputFormControlExampleComponent } from './pages/input-page/input-form-control-example/input-form-control-example.component';
import { InputFormGroupExampleComponent } from './pages/input-page/input-form-group-example/input-form-group-example.component';
import { PaInputConfigComponent } from './pages/input-page/pa-input-config/pa-input-config.component';
import { SelectStandaloneExampleComponent } from './pages/select-page/select-standalone-example/select-standalone-example.component';
import { SelectNgModelExampleComponent } from './pages/select-page/select-ng-model-example/select-ng-model-example.component';
import { SelectFormControlExampleComponent } from './pages/select-page/select-form-control-example/select-form-control-example.component';
import { SelectFormGroupExampleComponent } from './pages/select-page/select-form-group-example/select-form-group-example.component';
import { PaSelectConfigComponent } from './pages/select-page/pa-select-config/pa-select-config.component';
import { NativeTextFieldPageComponent } from './pages/native-text-field-page/native-text-field-page.component';
import { NativeTextFieldUsageComponent } from './pages/native-text-field-page/usage/native-text-field-usage.component';
import { PaTextareaConfigComponent } from './pages/text-area-page/pa-textarea-config/pa-textarea-config.component';
import { TextareaStandaloneExampleComponent } from './pages/text-area-page/textarea-standalone-example/textarea-standalone-example.component';
import { TextareaNgModelExampleComponent } from './pages/text-area-page/textarea-ng-model-example/textarea-ng-model-example.component';
import { TextareaFormControlExampleComponent } from './pages/text-area-page/textarea-form-control-example/textarea-form-control-example.component';
import { TextareaFormGroupExampleComponent } from './pages/text-area-page/textarea-form-group-example/textarea-form-group-example.component';
import { FormFieldConfigStandaloneDirective } from './pages/common-doc/form-field-config-standalone.directive';
import { FormFieldConfigNgModelDirective } from './pages/common-doc/form-field-config-ng-model.directive';
import { FormFieldConfigFormControlDirective } from './pages/common-doc/form-field-config-form-control.directive';
import { FormFieldConfigFormGroupDirective } from './pages/common-doc/form-field-config-form-group.directive';
import { BreakpointPageComponent } from './pages/breakpoint-page/breakpoint-page.component';
import { ExpanderPageComponent } from './pages/expand-page/expander-page.component';
import { AccessibilityPageComponent } from './pages/accessibility/accessibility-page.component';

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
    DialogExampleComponent,
    DialogImageExampleComponent,
    ModalExampleComponent,

    AccessibilityPageComponent,
    AvatarPageComponent,
    BreakpointPageComponent,
    ButtonPageComponent,
    CheckboxPageComponent,
    ChipPageComponent,
    ContainerPageComponent,
    ContainerDemoComponent,
    DateTimePageComponent,
    DropdownPageComponent,
    FocusablePageComponent,
    FormControlPageComponent,
    FormControlIdExampleComponent,
    FormControlNameExampleComponent,
    FormControlValueExampleComponent,
    FormControlStateExampleComponent,
    FormControlValidationExampleComponent,
    FormFieldConfigStandaloneDirective,
    FormFieldConfigNgModelDirective,
    FormFieldConfigFormControlDirective,
    FormFieldConfigFormGroupDirective,
    PaFormControlUsageComponent,
    FormFieldHintPageComponent,
    GridPageComponent,
    IconPageComponent,
    InputPageComponent,
    InputStandaloneExampleComponent,
    InputNgModelExampleComponent,
    InputFormControlExampleComponent,
    InputFormGroupExampleComponent,
    NativeTextFieldPageComponent,
    NativeTextFieldUsageComponent,
    PaInputConfigComponent,
    ModalPageComponent,
    PalettePageComponent,
    PopupPageComponent,
    SelectPageComponent,
    SelectStandaloneExampleComponent,
    SelectNgModelExampleComponent,
    SelectFormControlExampleComponent,
    SelectFormGroupExampleComponent,
    PaSelectConfigComponent,
    SidenavPageComponent,
    TabsPageComponent,
    TablePageComponent,
    ToastPageComponent,
    TogglePageComponent,
    TextareaPageComponent,
    PaTextareaConfigComponent,
    TextareaStandaloneExampleComponent,
    TextareaNgModelExampleComponent,
    TextareaFormControlExampleComponent,
    TextareaFormGroupExampleComponent,
    TooltipPageComponent,
    TranslatePageComponent,
    ExpanderPageComponent,
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
        PaExpanderModule,
        PaFocusableModule,
        PaFormFieldModule,
        PaPopupModule,
        PaTextFieldModule,
        PaToastModule,
        PaTogglesModule,
        PaTranslateModule.addTranslations([
            { en_US: { ...(enDemo as any).default } },
            { en_US: { ...(custom as any).default } },
            { latin: { ...la } },
        ]),
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
