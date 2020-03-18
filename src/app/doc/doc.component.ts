import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { Traverser } from 'angular-traversal';
import { AvatarDocComponent } from './avatar-doc/avatar-doc.component';
import { ButtonDocComponent } from './button-doc/button-doc.component';
import { TranslateDocComponent } from './translate-doc/translate-doc.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

@Component({
    selector: 'pa-doc-component',
    templateUrl: './doc.component.html',
    styleUrls: ['./doc.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocComponent {
    menu: {
        title: string,
        pages: {target: string, title: string, type: Type<any>}[]
    }[] = [
        {
            title: 'Atoms',
            pages: [
                {target: 'button', title: 'Buttons', type: ButtonDocComponent},
            ]
        },
        {
            title: 'Components',
            pages: [
                {target: 'avatar', title: 'Avatars', type: AvatarDocComponent},
            ]
        },
        {
            title: 'Utilities',
            pages: [
                {target: 'translate', title: 'Translate', type: TranslateDocComponent},
            ]
        }
    ];

    constructor(traverser: Traverser) {
        traverser.addView('view', '', WelcomePageComponent);
        this.menu.forEach(section => section.pages.forEach(page => traverser.addView('view', page.target, page.type)));
    }
}
