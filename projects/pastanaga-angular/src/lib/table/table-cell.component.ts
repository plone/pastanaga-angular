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
    get header(): boolean { return this._header; }
    set header(value: boolean) { this._header = coerceBooleanProperty(value); }
    _header = false;
}
