import { Component } from '@angular/core';
import {
    IDemoMenuSection,
    ButtonPageComponent,
    IconPageComponent,
    CheckboxPageComponent,
    TranslatePageComponent,
    PopupPageComponent,
    DropdownPageComponent,
    SelectPageComponent,
    GridPageComponent,
    TabsPageComponent,
    TablePageComponent,
    TextareaPageComponent,
    AvatarPageComponent,
    DatePickerPageComponent,
    DateTimePageComponent,
    TogglePageComponent,
    ToastPageComponent,
    TooltipPageComponent,
    PalettePageComponent,
    ModalPageComponent,
    BreakpointPageComponent,
    InputPageComponent,
    FocusablePageComponent,
    ChipPageComponent,
    SidenavPageComponent,
    ContainerPageComponent,
    FormFieldHintPageComponent,
    FormControlPageComponent,
    NativeTextFieldPageComponent,
    ExpanderPageComponent,
    AccessibilityPageComponent,
    AvatarPilePageComponent,
    InfiniteScrollPageComponent,
    ConfirmationDialogPageComponent,
    EllipsisTooltipPageComponent,
    ScrollbarPageComponent,
    PopoverPageComponent,
    DistributePageComponent,
    CardPageComponent
} from './demo';
import {
    TableSortableHeaderPageComponent
} from './demo/pages/table-page/table-sortable-header-page/table-sortable-header-page.component';
import { TableRowPageComponent } from './demo/pages/table-page/table-row/table-row-page.component';
import { TableCellPageComponent } from './demo/pages/table-page/table-cell-page/table-cell-page.component';
import {
    TableSortableHeaderCellPageComponent
} from './demo/pages/table-page/table-sortable-header-cell-page/table-sortable-header-cell-page.component';
import {
    TableLeadCellMultiLinePageComponent
} from './demo/pages/table-page/table-lead-cell-multi-line-page/table-lead-cell-multi-line-page.component';

export const menu: IDemoMenuSection[] = [
    {
        title: 'Core',
        pages: [
            { view: 'icon', title: 'Icons', type: IconPageComponent },
            { view: 'palette', title: 'Palette', type: PalettePageComponent },
            { view: 'focusable', title: 'Focusable', type: FocusablePageComponent },
            { view: 'accessibility', title: 'Accessibility', type: AccessibilityPageComponent },
            { view: 'containers', title: 'Containers', type: ContainerPageComponent },
            { view: 'distribute', title: 'Distribute', type: DistributePageComponent },
            { view: 'grid', title: 'Grid', type: GridPageComponent },
            { view: 'breakpoint', title: 'Breakpoint', type: BreakpointPageComponent },
            { view: 'scrollbar', title: 'Scrollbar', type: ScrollbarPageComponent },
            { view: 'translate', title: 'Translate', type: TranslatePageComponent },
        ],
    },
    {
        title: 'Components',
        pages: [
            { view: 'avatar', title: 'Avatar', type: AvatarPageComponent },
            { view: 'avatar-pile', title: 'Avatar pile', type: AvatarPilePageComponent },
            { view: 'button', title: 'Button', type: ButtonPageComponent },
            { view: 'card', title: 'Card', type: CardPageComponent },
            { view: 'chip', title: 'Chip', type: ChipPageComponent },
            { view: 'confirmation-dialog', title: 'Confirmation dialog', type: ConfirmationDialogPageComponent },
            { view: 'modal', title: 'Modal', type: ModalPageComponent },
            { view: 'datepicker', title: 'Date Picker', type: DatePickerPageComponent },
            { view: 'datetime', title: 'Date/time', type: DateTimePageComponent },
            { view: 'dropdown', title: 'Dropdown', type: DropdownPageComponent },
            { view: 'expander', title: 'Expander', type: ExpanderPageComponent },
            { view: 'infinite-scroll', title: 'Infinite scroll', type: InfiniteScrollPageComponent },
            { view: 'popup', title: 'Popup', type: PopupPageComponent },
            { view: 'popover', title: 'Popover', type: PopoverPageComponent },
            { view: 'sidenav', title: 'Sidenav', type: SidenavPageComponent },
            { view: 'tabs', title: 'Tabs', type: TabsPageComponent },
            { view: 'toast', title: 'Toast', type: ToastPageComponent },
            { view: 'tooltip', title: 'Tooltip', type: TooltipPageComponent },
            { view: 'tooltip-ellipsis', title: 'Ellipsis tooltip', type: EllipsisTooltipPageComponent },
        ],
    },
    {
        title: 'Tables',
        pages: [
            { view: 'table', title: 'Table', type: TablePageComponent },
            { view: 'table-row', title: 'Table row', type: TableRowPageComponent },
            { view: 'table-cell', title: 'Table cell', type: TableCellPageComponent },
            { view: 'table-lead-cell-multi-line', title: 'Table lead cell multi line', type: TableLeadCellMultiLinePageComponent },
            { view: 'table-sortable-header', title: 'Table sortable header', type: TableSortableHeaderPageComponent },
            { view: 'table-sortable-header-cell', title: 'Table sortable header cell', type: TableSortableHeaderCellPageComponent },
        ]
    },
    {
        title: 'Form elements',
        pages: [
            { view: 'checkbox', title: 'Checkbox', type: CheckboxPageComponent },
            { view: 'input', title: 'Input', type: InputPageComponent },
            { view: 'select', title: 'Select', type: SelectPageComponent },
            { view: 'textarea', title: 'Textarea', type: TextareaPageComponent },
            { view: 'toggle', title: 'Toggle', type: TogglePageComponent },
            { view: 'formControl', title: 'Form control', type: FormControlPageComponent },
            { view: 'formFieldHint', title: 'Form field hint', type: FormFieldHintPageComponent },
            { view: 'nativeTextField', title: 'Native Text Field', type: NativeTextFieldPageComponent },
        ],
    },
];

@Component({
    selector: 'pa-demo-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    menu: IDemoMenuSection[] = menu;

    logo = './assets/p-angular.svg';
}
