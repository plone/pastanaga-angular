import { Component } from '@angular/core';
import { Traverser } from 'angular-traversal';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { IDemoMenuSection } from './demo/demo-menu/demo-menu.component';
import { ButtonPageComponent } from './demo/button-page/button-page.component';
import { IconPageComponent } from './demo/icon-page/icon-page.component';
import { InputPageComponent } from './demo/input-page/input-page.component';

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
            ]
        },
        {
            title: 'Components',
            pages: [
                {view: 'button', title: 'Buttons', type: ButtonPageComponent},
                {view: 'input', title: 'Inputs', type: InputPageComponent},
            ]
        }
    ];

    constructor(private traverser: Traverser) {
        traverser.addView('view', '', WelcomePageComponent);
        this.menu.forEach(section => section.pages.forEach(page => traverser.addView(page.view, '', page.type)));
    }
}
