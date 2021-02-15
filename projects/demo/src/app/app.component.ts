import { Component } from '@angular/core';
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
import { Traverser } from 'angular-traversal';
import { ChipPageComponent } from './demo/pages/chip-page/chip-page.component';
import { SidenavPageComponent } from './demo/pages/sidenav-page/sidenav-page.component';
import { ContainerPageComponent } from './demo/pages/container-page/container-page.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    menu: IDemoMenuSection[] = [
        {
            title: 'Core',
            pages: [
                { view: 'icon', title: 'Icons', type: IconPageComponent },
                { view: 'palette', title: 'Palette', type: PalettePageComponent },
                { view: 'focusable', title: 'Focusable', type: FocusablePageComponent },
                { view: 'containers', title: 'Containers', type: ContainerPageComponent },
                { view: 'grid', title: 'Grid', type: GridPageComponent },
                { view: 'breakpoint', title: 'Breakpoint', type: BreakpointPageComponent },
                { view: 'translate', title: 'Translate', type: TranslatePageComponent },
            ],
        },
        {
            title: 'Components',
            pages: [
                { view: 'avatar', title: 'Avatar', type: AvatarPageComponent },
                { view: 'button', title: 'Button', type: ButtonPageComponent },
                { view: 'chip', title: 'Chip', type: ChipPageComponent },
                { view: 'datetime', title: 'Date/time', type: DateTimePageComponent },
                { view: 'dropdown', title: 'Dropdown', type: DropdownPageComponent },
                { view: 'modal', title: 'Modal', type: ModalPageComponent },
                { view: 'popup', title: 'Popup', type: PopupPageComponent },
                { view: 'sidenav', title: 'Sidenav', type: SidenavPageComponent },
                { view: 'tables', title: 'Tables', type: TablePageComponent },
                { view: 'tabs', title: 'Tabs', type: TabsPageComponent },
                { view: 'toast', title: 'Toast', type: ToastPageComponent },
                { view: 'tooltip', title: 'Tooltip', type: TooltipPageComponent },
            ],
        },
        {
            title: 'Form elements',
            pages: [
                { view: 'checkbox', title: 'Checkbox', type: CheckboxPageComponent },
                { view: 'Input', title: 'Input', type: InputPageComponent },
                { view: 'select', title: 'Select', type: SelectPageComponent },
                { view: 'textarea', title: 'Textarea', type: TextareaPageComponent },
                { view: 'toggle', title: 'Toggle', type: TogglePageComponent },
            ],
        },
    ];

    logo = './assets/p-angular.svg';

    constructor(private traverser: Traverser) {
        traverser.addView('view', '', WelcomePageComponent);
    }
}
