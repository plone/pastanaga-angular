import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-table-row',
    templateUrl: 'table-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TableRowComponent {
    @Input()
    get clickable(): boolean {
        return this._clickable;
    }
    set clickable(value: boolean) {
        this._clickable = coerceBooleanProperty(value);
    }
    _clickable = false;
}
