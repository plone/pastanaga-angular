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
}
