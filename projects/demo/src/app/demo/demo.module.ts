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
import { ButtonPageComponent } from './pages/button-page/button-page.component';
import { IconPageComponent } from './pages/icon-page/icon-page.component';
import { TranslatePageComponent } from './pages/translate-page/translate-page.component';
import { CUSTOM_EN, CUSTOM_FR, DEMO_EN, DEMO_FR, DEMO_LA } from '../../assets';
import {
    PaAvatarModule,
    PaAvatarPileModule,
    PaButtonModule,
    PaCardModule,
    PaChipsModule,
    PaDatePickerModule,
    PaDateTimeModule,
    PaDropdownModule,
    PaExpanderModule,
    PaFocusableModule,
    PaFormFieldModule,
    PaIconModule,
    PaModalModule,
    PaPopupModule,
    PaScrollModule,
    PaSideNavModule,
    PaSliderModule,
    PaTableModule,
    PaTabsModule,
    PaTextFieldModule,
    PaToastModule,
    PaTogglesModule,
    PaTooltipModule,
    PaTranslateModule,
} from '@guillotinaweb/pastanaga-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarPageComponent } from './pages/avatar-page/avatar-page.component';
import { BaseControlUsageComponent } from './pages/common-doc/base-control/base-control-usage.component';
import { CheckboxPageComponent } from './pages/checkbox-page/checkbox-page.component';
import { DateTimePageComponent } from './pages/datetime-page/datetime-page.component';
import {
    DialogExampleComponent,
    DialogImageExampleComponent,
    ModalExampleComponent,
    ModalPageComponent,
} from './pages/modal-page';
import { DropdownPageComponent } from './pages/dropdown-page/dropdown-page.component';
import { GridPageComponent } from './pages/grid-page/grid-page.component';
import { PalettePageComponent } from './pages/palette-page/palette-page.component';
import { PopupPageComponent } from './pages/popup-page/popup-page.component';
import { TablePageComponent } from './pages/table-page/table-page.component';
import { TabsPageComponent } from './pages/tabs-page/tabs-page.component';
import { ToastPageComponent } from './pages/toast-page/toast-page.component';
import { TogglePageComponent } from './pages/toggle-page/toggle-page.component';
import { TooltipPageComponent } from './pages/tooltip-page/tooltip-page.component';
import { FocusablePageComponent } from './pages/focusable-page/focusable-page.component';
import { DemoComponent } from './demo.component';
import { ChipPageComponent } from './pages/chip-page/chip-page.component';
import { SidenavPageComponent } from './pages/sidenav-page/sidenav-page.component';
import { ContainerPageComponent } from './pages/container-page/container-page.component';
import { ContainerDemoComponent } from './pages/container-page/container-demo/container-demo.component';
import { FormFieldHintPageComponent } from './pages/form-field-hint-page/form-field-hint-page.component';
import {
    FormControlIdExampleComponent,
    FormControlNameExampleComponent,
    FormControlPageComponent,
    FormControlStateExampleComponent,
    FormControlValidationExampleComponent,
    FormControlValueExampleComponent,
    PaFormControlUsageComponent,
} from './pages/form-control-page';
import {
    InputFormControlExampleComponent,
    InputFormGroupExampleComponent,
    InputNgModelExampleComponent,
    InputPageComponent,
    InputStandaloneExampleComponent,
    PaInputConfigComponent,
} from './pages/input-page';
import {
    PaSelectConfigComponent,
    SelectFormControlExampleComponent,
    SelectFormGroupExampleComponent,
    SelectNgModelExampleComponent,
    SelectPageComponent,
    SelectStandaloneExampleComponent,
} from './pages/select-page';
import { NativeTextFieldPageComponent } from './pages/native-text-field-page/native-text-field-page.component';
import { NativeTextFieldUsageComponent } from './pages/native-text-field-page/usage/native-text-field-usage.component';
import {
    PaTextareaConfigComponent,
    TextareaFormControlExampleComponent,
    TextareaFormGroupExampleComponent,
    TextareaNgModelExampleComponent,
    TextareaPageComponent,
    TextareaStandaloneExampleComponent,
} from './pages/text-area-page';
import { FormFieldConfigStandaloneDirective } from './pages/common-doc/form-field-config-standalone.directive';
import { FormFieldConfigNgModelDirective } from './pages/common-doc/form-field-config-ng-model.directive';
import { FormFieldConfigFormControlDirective } from './pages/common-doc/form-field-config-form-control.directive';
import { FormFieldConfigFormGroupDirective } from './pages/common-doc/form-field-config-form-group.directive';
import { BreakpointPageComponent } from './pages/breakpoint-page/breakpoint-page.component';
import { ExpanderPageComponent } from './pages/expand-page/expander-page.component';
import { AccessibilityPageComponent } from './pages/accessibility/accessibility-page.component';
import { AvatarPilePageComponent } from './pages/avatar-pile-page/avatar-pile-page.component';
import { DataCardComponent, InfiniteScrollDemoComponent, InfiniteScrollPageComponent } from './pages/scroll-pages';
import { ConfirmationDialogPageComponent } from './pages/confirmation-dialog-page/confirmation-dialog-page.component';
import { EllipsisTooltipPageComponent } from './pages/ellipsis-tooltip-page/ellipsis-tooltip-page.component';
import { ScrollbarPageComponent } from './pages/scrollbar-page/scrollbar-page.component';
import { PopoverPageComponent } from './pages/popover-page/popover-page.component';
import { DistributePageComponent } from './pages/distribute-page/distribute-page.component';
import { CardPageComponent } from './pages/card-page/card-page.component';
import { RouterModule } from '@angular/router';
import {
    DatePickerConfigComponent,
    DatePickerFormControlExampleComponent,
    DatePickerFormGroupExampleComponent,
    DatePickerNgModelExampleComponent,
    DatePickerPageComponent,
    DatePickerStandaloneExampleComponent,
} from './pages/date-picker-page';
import { CommonTableDescriptionComponent } from './pages/table-page/common-table-description/common-table-description.component';
import { TableSortableHeaderPageComponent } from './pages/table-page/table-sortable-header-page/table-sortable-header-page.component';
import { TableRowPageComponent } from './pages/table-page/table-row/table-row-page.component';
import { TableCellPageComponent } from './pages/table-page/table-cell-page/table-cell-page.component';
import { TableSortableHeaderCellPageComponent } from './pages/table-page/table-sortable-header-cell-page/table-sortable-header-cell-page.component';
import { TableLeadCellMultiLinePageComponent } from './pages/table-page/table-lead-cell-multi-line-page/table-lead-cell-multi-line-page.component';
import { TypographyPageComponent } from './pages/typography-page/typography-page.component';
import { ButtonUsageComponent } from './pages/button-page/button-usage/button-usage.component';
import { ButtonDescriptionComponent } from './pages/button-page/button-description/button-description.component';
import { RadioPageComponent } from './pages/radio-page/radio-page.component';
import { ConfirmationDialogDescriptionComponent } from './pages/confirmation-dialog-page/confirmation-dialog-description.component';
import { ConfirmationDialogUsageComponent } from './pages/confirmation-dialog-page/confirmation-dialog-usage.component';
import { PopupComponentUsageComponent } from './pages/popup-page/popup-component-usage/popup-component-usage.component';
import { TypeaheadSelectPageComponent } from './pages/typeahead-select-page/typeahead-select-page.component';
import { SelectUsageComponent } from './pages/select-page/select-usage.component';
import { SliderPageComponent } from './pages/slider-page/slider-page.component';

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
    AvatarPilePageComponent,
    BreakpointPageComponent,
    ButtonDescriptionComponent,
    ButtonPageComponent,
    ButtonUsageComponent,
    CardPageComponent,
    CheckboxPageComponent,
    ChipPageComponent,
    ContainerPageComponent,
    ContainerDemoComponent,
    DatePickerConfigComponent,
    DatePickerPageComponent,
    DatePickerStandaloneExampleComponent,
    DatePickerNgModelExampleComponent,
    DatePickerFormControlExampleComponent,
    DatePickerFormGroupExampleComponent,
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
    PopupComponentUsageComponent,
    PopupPageComponent,
    SelectPageComponent,
    SelectUsageComponent,
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
    TypeaheadSelectPageComponent,
    PaTextareaConfigComponent,
    TextareaStandaloneExampleComponent,
    TextareaNgModelExampleComponent,
    TextareaFormControlExampleComponent,
    TextareaFormGroupExampleComponent,
    TooltipPageComponent,
    TranslatePageComponent,
    ExpanderPageComponent,
    InfiniteScrollPageComponent,
    InfiniteScrollDemoComponent,
    DataCardComponent,
    ConfirmationDialogPageComponent,
    EllipsisTooltipPageComponent,
    ScrollbarPageComponent,
    PopoverPageComponent,
    DistributePageComponent,
    CommonTableDescriptionComponent,
    TableRowPageComponent,
    TableCellPageComponent,
    TableSortableHeaderPageComponent,
    TableSortableHeaderCellPageComponent,
    TableLeadCellMultiLinePageComponent,
    TypographyPageComponent,
    RadioPageComponent,
    ConfirmationDialogDescriptionComponent,
    ConfirmationDialogUsageComponent,
    SliderPageComponent,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        PaAvatarModule,
        PaAvatarPileModule,
        PaButtonModule,
        PaCardModule,
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
            { en_US: DEMO_EN },
            { en_US: CUSTOM_EN },
            { latin: DEMO_LA },
            { fr: DEMO_FR },
            { fr: CUSTOM_FR },
        ]),
        PaTabsModule,
        PaTableModule,
        PaTooltipModule,
        PaDateTimeModule,
        PaModalModule,
        PaSideNavModule,
        PaScrollModule,
        PaDatePickerModule,
        PaSliderModule,
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class PaDemoModule {}
