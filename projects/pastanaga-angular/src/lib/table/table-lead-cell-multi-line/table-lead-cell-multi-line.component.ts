import { ChangeDetectionStrategy, Component, Directive, Input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-table-lead-cell-multi-line',
    templateUrl: './table-lead-cell-multi-line.component.html',
    styleUrls: ['./table-lead-cell-multi-line.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TableLeadCellMultiLineComponent {
    @Input()
    get clickable(): boolean {
        return this._clickable;
    }
    set clickable(value: boolean) {
        this._clickable = coerceBooleanProperty(value);
    }
    private _clickable = false;
}
