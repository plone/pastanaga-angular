import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderCell } from '../table.models';
import { BreakpointObserver } from '../../breakpoint-observer/breakpoint.observer';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-table-sortable-header',
    templateUrl: './table-sortable-header.component.html',
    styleUrls: ['table-sortable-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSortableHeaderComponent {
    @Input()
    set cells(value: HeaderCell[]) {
        if (!!value) {
            this._cells = value.map((v) => ({ ...v }));
        }
    }
    get cells() {
        return this._cells;
    }
    @Input()
    set menuColumn(value: boolean) {
        this._menuColumn = coerceBooleanProperty(value);
    }
    get menuColumn() {
        return this._menuColumn;
    }

    @Output() sort: EventEmitter<HeaderCell> = new EventEmitter<HeaderCell>();

    private _cells: HeaderCell[] = [];
    private _menuColumn = false;

    mode = this.breakpointObserver.currentMode;

    constructor(private breakpointObserver: BreakpointObserver) {}

    sortBy(id: string) {
        const currentActive = this.cells.find((cell) => cell.active);
        let newActive: HeaderCell | undefined;
        if (!!currentActive) {
            if (currentActive.id === id) {
                currentActive.descending = !currentActive.descending;
                newActive = currentActive;
            } else {
                currentActive.active = false;
                currentActive.descending = false;
            }
        }
        if (!newActive) {
            newActive = this.cells.find((cell) => cell.id === id) as HeaderCell;
            newActive.active = true;
        }
        this.sort.emit(newActive);
    }
}
