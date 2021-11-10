import { Component } from '@angular/core';
import { Traverser } from 'angular-traversal';
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
import { WelcomePageComponent } from './welcome-page/welcome-page.component';


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
                { view: 'card', title: 'Card', type: CardPageComponent },
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
