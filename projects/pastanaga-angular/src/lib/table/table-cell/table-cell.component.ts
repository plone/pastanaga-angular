import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
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
    set header(value: any) {
        this._header = coerceBooleanProperty(value);
    }

    @Input()
    get clickable(): boolean {
        return this._clickable;
    }
    set clickable(value: any) {
        this._clickable = coerceBooleanProperty(value);
    }

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: any) {
        this._disabled = coerceBooleanProperty(value);
    }

    @Input()
    get noWrap(): boolean {
        return this._noWrap;
    }
    set noWrap(value: any) {
        this._noWrap = coerceBooleanProperty(value);
    }

    @Input()
    get center(): boolean {
        return this._center;
    }
    set center(value: any) {
        this._center = coerceBooleanProperty(value);
    }

    private _noWrap = false;
    private _disabled = false;
    private _header = false;
    private _clickable = false;
    private _center = false;
}
