import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-table-cell',
    templateUrl: 'table-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TableCellComponent {
    @Input()
    get header(): boolean {
        return this._header;
    }
    set header(value: boolean) {
        this._header = coerceBooleanProperty(value);
    }

    @Input()
    get clickable(): boolean {
        return this._clickable;
    }
    set clickable(value: boolean) {
        this._clickable = coerceBooleanProperty(value);
    }

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }
    private _disabled = false;
    private _header = false;
    private _clickable = false;
}
