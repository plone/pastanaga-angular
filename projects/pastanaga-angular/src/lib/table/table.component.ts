import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-table',
    templateUrl: 'table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TableComponent {
    @Input()
    get noHeader(): boolean { return this._noHeader; }
    set noHeader(value: boolean) { this._noHeader = coerceBooleanProperty(value); }
    _noHeader = false;

    @Input()
    get columns(): string { return this._columns; }
    set columns(value: string) { this._columns = value; }
    _columns = 'auto';
}
