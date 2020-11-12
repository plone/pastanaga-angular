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
    get label(): string {
        return this._label;
    }
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
    @Input()
    get inverted(): boolean {
        return this._inverted;
    }
    set inverted(value: boolean) {
        this._inverted = coerceBooleanProperty(value);
        markForCheck(this.cdr);
    }
    @Input()
    get icon(): string {
        return this._icon;
    }
    set icon(value: string) {
        this._icon = value;
    }
    private _active = false;
    private _header = false;
    private _label = '';
    private _inverted = false;
    private _icon = '';
    constructor(private cdr: ChangeDetectorRef) {}
}
