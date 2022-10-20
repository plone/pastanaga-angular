import { Component, ChangeDetectionStrategy, Input, HostBinding, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'pa-tab',
    templateUrl: 'tab-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabItemComponent {
    @Input()
    get active(): boolean {
        return this._active;
    }
    set active(isActive: boolean) {
        this._active = isActive;
        if (this._active) {
            this.selected.next();
        }
    }

    private _active = false;
    selected = new Subject<void>();

    @HostBinding('class.active') get valid() {
        return this.active;
    }

    constructor(private ref: ElementRef) {}

    getTabRect() {
        return this.ref.nativeElement.getBoundingClientRect();
    }
}
