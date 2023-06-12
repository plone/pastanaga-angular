import { Component } from '@angular/core';
import {
  AccessibilityPageComponent,
  AvatarPageComponent,
  AvatarPilePageComponent,
  BreakpointPageComponent,
  ButtonPageComponent,
  CardPageComponent,
  CheckboxPageComponent,
  ChipPageComponent,
  ConfirmationDialogPageComponent,
  ContainerPageComponent,
  DatePickerPageComponent,
  DateTimePageComponent,
  DistributePageComponent,
  DropdownPageComponent,
  EllipsisTooltipPageComponent,
  ExpanderPageComponent,
  FocusablePageComponent,
  FormControlPageComponent,
  FormFieldHintPageComponent,
  GridPageComponent,
  IconPageComponent,
  IDemoMenuSection,
  InfiniteScrollPageComponent,
  InputPageComponent,
  ModalPageComponent,
  NativeTextFieldPageComponent,
  PalettePageComponent,
  PopoverPageComponent,
  PopupPageComponent,
  ScrollbarPageComponent,
  SelectPageComponent,
  SidenavPageComponent,
  TableCellPageComponent,
  TableLeadCellMultiLinePageComponent,
  TablePageComponent,
  TableRowPageComponent,
  TableSortableHeaderCellPageComponent,
  TableSortableHeaderPageComponent,
  TabsPageComponent,
  TextareaPageComponent,
  ToastPageComponent,
  TogglePageComponent,
  TooltipPageComponent,
  TranslatePageComponent,
  TypographyPageComponent,
} from './demo';
import { RadioPageComponent } from './demo/pages/radio-page/radio-page.component';
import { TypeaheadSelectPageComponent } from './demo/pages/typeahead-select-page/typeahead-select-page.component';
import { SliderPageComponent } from './demo/pages/slider-page/slider-page.component';

export const menu: IDemoMenuSection[] = [
  {
    title: 'Core',
    pages: [
      { view: 'icon', title: 'Icons', type: IconPageComponent },
      { view: 'palette', title: 'Palette', type: PalettePageComponent },
      { view: 'focusable', title: 'Focusable', type: FocusablePageComponent },
      { view: 'typography', title: 'Typography', type: TypographyPageComponent },
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
      {
        view: 'table-lead-cell-multi-line',
        title: 'Table lead cell multi line',
        type: TableLeadCellMultiLinePageComponent,
      },
      { view: 'table-sortable-header', title: 'Table sortable header', type: TableSortableHeaderPageComponent },
      {
        view: 'table-sortable-header-cell',
        title: 'Table sortable header cell',
        type: TableSortableHeaderCellPageComponent,
      },
    ],
  },
  {
    title: 'Form elements',
    pages: [
      { view: 'checkbox', title: 'Checkbox', type: CheckboxPageComponent },
      { view: 'input', title: 'Input', type: InputPageComponent },
      { view: 'radio', title: 'Radio', type: RadioPageComponent },
      { view: 'select', title: 'Select', type: SelectPageComponent },
      { view: 'typeahead-select', title: 'Typeahead select', type: TypeaheadSelectPageComponent },
      { view: 'textarea', title: 'Textarea', type: TextareaPageComponent },
      { view: 'toggle', title: 'Toggle', type: TogglePageComponent },
      { view: 'formControl', title: 'Form control', type: FormControlPageComponent },
      { view: 'formFieldHint', title: 'Form field hint', type: FormFieldHintPageComponent },
      { view: 'nativeTextField', title: 'Native Text Field', type: NativeTextFieldPageComponent },
      { view: 'slider', title: 'Slider', type: SliderPageComponent },
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
