import { Component } from '@angular/core';
import { Traverser } from 'angular-traversal';
import { IDemoMenuSection } from './demo/demo-menu/demo-menu.component';
import { ButtonPageComponent } from './demo/pages/button-page/button-page.component';
import { IconPageComponent } from './demo/pages/icon-page/icon-page.component';
import { CheckboxPageComponent } from './demo/pages/checkbox-page/checkbox-page.component';
import { TranslatePageComponent } from './demo/pages/translate-page/translate-page.component';
import { PopupPageComponent } from './demo/pages/popup-page/popup-page.component';
import { DropdownPageComponent } from './demo/pages/dropdown-page/dropdown-page.component';
import { SelectPageComponent } from './demo/pages/select-page/select-page.component';
import { GridPageComponent } from './demo/pages/grid-page/grid-page.component';
import { TabsPageComponent } from './demo/pages/tabs-page/tabs-page.component';
import { TablePageComponent } from './demo/pages/table-page/table-page.component';
import { TextareaPageComponent } from './demo/pages/text-area-page/textarea-page.component';
import { AvatarPageComponent } from './demo/pages/avatar-page/avatar-page.component';
import { DateTimePageComponent } from './demo/pages/datetime-page/datetime-page.component';
import { TogglePageComponent } from './demo/pages/toggle-page/toggle-page.component';
import { ToastPageComponent } from './demo/pages/toast-page/toast-page.component';
import { TooltipPageComponent } from './demo/pages/tooltip-page/tooltip-page.component';
import { PalettePageComponent } from './demo/pages/palette-page/palette-page.component';
import { ModalPageComponent } from './demo/pages/modal-page/modal-page.component';
import { BreakpointPageComponent } from './demo/pages/breakpoint-page/breakpoint-page.component';
import { InputPageComponent } from './demo/pages/input-page/input-page.component';
import { FocusablePageComponent } from './demo/pages/focusable-page/focusable-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ChipPageComponent } from './demo/pages/chip-page/chip-page.component';
import { SidenavPageComponent } from './demo/pages/sidenav-page/sidenav-page.component';
import { ContainerPageComponent } from './demo/pages/container-page/container-page.component';
import { FormFieldHintPageComponent } from './demo/pages/form-field-hint-page/form-field-hint-page.component';
import { FormControlPageComponent } from './demo/pages/form-control-page/form-control-page.component';
import { NativeTextFieldPageComponent } from './demo/pages/native-text-field-page/native-text-field-page.component';
import { ExpanderPageComponent } from './demo/pages/expand-page/expander-page.component';
import { AccessibilityPageComponent } from './demo/pages/accessibility/accessibility-page.component';
import { AvatarPilePageComponent } from './demo/pages/avatar-pile-page/avatar-pile-page.component';
import { InfiniteScrollPageComponent } from './demo/pages/scroll-pages/infinite-scroll-page.component';
import { ConfirmationDialogPageComponent } from './demo/pages/confirmation-dialog-page/confirmation-dialog-page.component';
import { EllipsisTooltipPageComponent } from './demo/pages/ellipsis-tooltip-page/ellipsis-tooltip-page.component';
import { ScrollbarPageComponent } from './demo/pages/scrollbar-page/scrollbar-page.component';
import { PopoverPageComponent } from './demo/pages/popover-page/popover-page.component';
import { DistributePageComponent } from './demo/pages/distribute-page/distribute-page.component';

@Component({
    selector: 'pa-demo-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    menu: IDemoMenuSection[] = [
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
                { view: 'chip', title: 'Chip', type: ChipPageComponent },
                { view: 'confirmation-dialog', title: 'Confirmation dialog', type: ConfirmationDialogPageComponent },
                { view: 'modal', title: 'Modal', type: ModalPageComponent },
                { view: 'datetime', title: 'Date/time', type: DateTimePageComponent },
                { view: 'dropdown', title: 'Dropdown', type: DropdownPageComponent },
                { view: 'expander', title: 'Expander', type: ExpanderPageComponent },
                { view: 'infinite-scroll', title: 'Infinite scroll', type: InfiniteScrollPageComponent },
                { view: 'popup', title: 'Popup', type: PopupPageComponent },
                { view: 'popover', title: 'Popover', type: PopoverPageComponent },
                { view: 'sidenav', title: 'Sidenav', type: SidenavPageComponent },
                { view: 'tables', title: 'Tables', type: TablePageComponent },
                { view: 'tabs', title: 'Tabs', type: TabsPageComponent },
                { view: 'toast', title: 'Toast', type: ToastPageComponent },
                { view: 'tooltip', title: 'Tooltip', type: TooltipPageComponent },
                { view: 'tooltip-ellipsis', title: 'Ellipsis tooltip', type: EllipsisTooltipPageComponent },
            ],
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

    logo = './assets/p-angular.svg';

    constructor(private traverser: Traverser) {
        traverser.addView('view', '', WelcomePageComponent);
    }
}
