import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '../../common';

@Component({
    selector: 'pa-table-cell-header-sortable',
    templateUrl: './table-cell-header-sortable.component.html',
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCellHeaderSortableComponent implements OnInit {
    @Input()
    set reversed(value: boolean) {
        this._reversed = coerceBooleanProperty(value);
    }
    get reversed() {
        return this._reversed;
    }
    @Input() label?: string;
    @Output() sorted = new EventEmitter();
    currentSort: Sort = Sort.descending;
    icon?: string = 'sorted-descending';
    _reversed = false;
    ngOnInit() {
        if (coerceBooleanProperty(this.reversed)) {
            this.icon = 'sorted-ascending';
            this.currentSort = Sort.ascending;
        }
    }
    sortBy() {
        if (this.currentSort === Sort.descending) {
            this.icon = 'sorted-ascending';
            this.currentSort = Sort.ascending;
        } else {
            this.icon = 'sorted-descending';
            this.currentSort = Sort.descending;
        }
        this.sorted.emit(this.currentSort);
    }
}
