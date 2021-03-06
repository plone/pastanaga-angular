import { Component, OnInit, Type } from '@angular/core';
import { ButtonDocComponent } from './doc/button-doc/button-doc.component';
import { AvatarDocComponent } from './doc/avatar-doc/avatar-doc.component';
import { TranslateDocComponent } from './doc/translate-doc/translate-doc.component';
import { Traverser } from 'angular-traversal';
import { WelcomePageComponent } from './doc/welcome-page/welcome-page.component';
import { DemoComponent } from './demo/demo.component';
import { IDocMenuSection } from './doc/doc-menu.component';
import { FilteredCheckboxGroupDocComponent } from './doc/filtered-checkbox-group-doc/filtered-checkbox-group-doc.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    isOldDemo = true;
    menu: IDocMenuSection[] = [
        {
            title: 'Atoms',
            pages: [
                {view: 'button', title: 'Buttons', type: ButtonDocComponent},
            ]
        },
        {
            title: 'Components',
            pages: [
                {view: 'avatar', title: 'Avatars', type: AvatarDocComponent},
                {view: 'filteredCheckboxGroup', title: 'Filtered checkbox group', type: FilteredCheckboxGroupDocComponent},
            ]
        },
        {
            title: 'Utilities',
            pages: [
                {view: 'translate', title: 'Translate', type: TranslateDocComponent},
            ]
        }
    ];

    constructor(private traverser: Traverser) {
        traverser.addView('view', '', DemoComponent);
        traverser.addView('welcome', '', WelcomePageComponent);
        this.menu.forEach(section => section.pages.forEach(page => traverser.addView(page.view, '', page.type)));
    }

    ngOnInit(): void {
        this.traverser.target.subscribe(context => this.isOldDemo = context.view === 'view');
    }
}


