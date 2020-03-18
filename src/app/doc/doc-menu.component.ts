import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';

export interface IDocMenuSection {
    title: string;
    pages: {view: string, title: string, type: Type<any>}[];
}

@Component({
    selector: 'pa-doc-menu',
    templateUrl: './doc-menu.component.html',
    styleUrls: ['./doc-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocMenuComponent {
    @Input() menu: IDocMenuSection[] = [];
    @Input() logo = '/assets/p-angular.svg';
}
