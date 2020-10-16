import { Component, ChangeDetectionStrategy, Input, HostBinding, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { BreakpointObserver } from '../breakpoint-observer/breakpoint.observer';
import { map } from 'rxjs/operators';

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

    _active = false;
    selected = new Subject();
    isMobile = this.bp.currentMode.pipe(map((mode) => mode === 'mobile'));

    @HostBinding('class.active') get valid() {
        return this._active;
    }

    constructor(private ref: ElementRef, private bp: BreakpointObserver) {}

    geTabRect() {
        return this.ref.nativeElement.getBoundingClientRect();
    }
}
