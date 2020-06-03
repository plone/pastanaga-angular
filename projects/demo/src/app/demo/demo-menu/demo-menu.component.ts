import { ChangeDetectionStrategy, Component, Input, OnInit, Type } from '@angular/core';


export interface IDemoMenuSection {
    title: string;
    pages: {view: string, title: string, type: Type<any>}[];
}

@Component({
    selector: 'pa-demo-menu',
    templateUrl: './demo-menu.component.html',
    styleUrls: ['./demo-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoMenuComponent implements OnInit {
    @Input() menu: IDemoMenuSection[] = [];
    @Input() logo = './assets/p-angular.svg';

    constructor() {
    }

    ngOnInit(): void {
    }

}
