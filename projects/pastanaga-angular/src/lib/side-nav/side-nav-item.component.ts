import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { markForCheck } from '../common';

@Component({
    selector: 'pa-side-nav-item',
    templateUrl: './side-nav-item.component.html',
    styleUrls: ['./side-nav-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavItemComponent {
    @Input()
    get header(): boolean {
        return this._header;
    }
    set header(value: boolean) {
        this._header = coerceBooleanProperty(value);
    }
    @Input()
    set label(value: string) {
        this._label = value;
    }
    @Input()
    get active(): boolean {
        return this._active;
    }
    set active(value: boolean) {
        this._active = coerceBooleanProperty(value);
    }
    set inverted(value: boolean) {
        this._inverted = coerceBooleanProperty(value);
        markForCheck(this.cdr);
    }
    _active = false;
    _header = false;
    _label = '';
    _inverted = false;
    constructor(private cdr: ChangeDetectorRef) {}
}
