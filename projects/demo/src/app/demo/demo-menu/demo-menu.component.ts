import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import { ViewportMode } from '@guillotinaweb/pastanaga-angular';

export interface IDemoMenuSection {
    title: string;
    pages: { view: string; title: string; type: Type<any> }[];
}

@Component({
    selector: 'pa-demo-menu',
    templateUrl: './demo-menu.component.html',
    styleUrls: ['./demo-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoMenuComponent {
    @Input()
    set mode(value: ViewportMode) {
        this._mode = value;
        this.isMenuVisible = value === 'desktop';
    }
    get mode() {
        return this._mode;
    }

    @Input() menu: IDemoMenuSection[] = [];
    @Input() logo = './assets/p-angular.svg';
    @Input() activeItem = '';

    isMenuVisible = true;
    private _mode: ViewportMode = 'desktop';

    toggleSideNav(value: boolean) {
        this.isMenuVisible = value;
    }

    onSelectedItem() {
        if (this.mode !== 'desktop') {
            this.isMenuVisible = false;
        }
        window.scrollTo(0, 0);
    }
}
