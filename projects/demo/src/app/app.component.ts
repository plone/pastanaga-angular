import { Component } from '@angular/core';
import { Traverser } from 'angular-traversal';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { IDemoMenuSection } from './demo/demo-menu/demo-menu.component';
import { ButtonPageComponent } from './demo/pages/button-page/button-page.component';
import { IconPageComponent } from './demo/pages/icon-page/icon-page.component';
import { InputPageComponent } from './demo/pages/input-page/input-page.component';
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

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    menu: IDemoMenuSection[] = [
        {
            title: 'Atoms',
            pages: [
                {view: 'icon', title: 'Icons', type: IconPageComponent},
            ],
        },
        {
            title: 'Components',
            pages: [
                {view: 'avatar', title: 'Avatar', type: AvatarPageComponent},
                {view: 'button', title: 'Button', type: ButtonPageComponent},
                {view: 'checkbox', title: 'Checkbox', type: CheckboxPageComponent},
                {view: 'dropdown', title: 'Dropdown', type: DropdownPageComponent},
                {view: 'input', title: 'Input', type: InputPageComponent},
                {view: 'popup', title: 'Popup', type: PopupPageComponent},
                {view: 'select', title: 'Select', type: SelectPageComponent},
                {view: 'tables', title: 'Tables', type: TablePageComponent},
                {view: 'tabs', title: 'Tabs', type: TabsPageComponent},
                {view: 'textarea', title: 'Tabs', type: TextareaPageComponent},
            ],
        },
        {
            title: 'Style',
            pages: [
                {view: 'grid', title: 'Grid', type: GridPageComponent},
            ],
        },
        {
            title: 'Utilities',
            pages: [
                {view: 'translate', title: 'Translate', type: TranslatePageComponent},
            ],
        },
    ];

    constructor(private traverser: Traverser) {
        traverser.addView('view', '', WelcomePageComponent);
        this.menu.forEach(section => section.pages.forEach(page => traverser.addView(page.view, '', page.type)));
    }
}
