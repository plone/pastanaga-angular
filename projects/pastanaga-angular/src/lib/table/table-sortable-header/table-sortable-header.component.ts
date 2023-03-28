import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { HeaderCell } from '../table.models';
import { ViewportMode } from '../../breakpoint-observer';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { PositionStyle } from '../../common';
import { TableSortableHeaderCellComponent } from '../table-sortable-header-cell/table-sortable-header-cell.component';

@Component({
    selector: 'pa-table-sortable-header',
    templateUrl: './table-sortable-header.component.html',
    styleUrls: ['table-sortable-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSortableHeaderComponent implements AfterViewInit {
    @Input()
    set cells(value: HeaderCell[] | null | undefined) {
        if (value) {
            this._cells = value.map((v) => ({ ...v }));
            this.mobileCell = this._cells.find((cell) => cell.active);
            this.sortableCells = this._cells.filter((cell) => cell.sortable);
            if (!this.mobileCell) {
                this.mobileCell = this._cells[0];
            }
        }
    }
    get cells(): HeaderCell[] {
        return this._cells;
    }

    @Input()
    set menuColumn(value: any) {
        this._menuColumn = coerceBooleanProperty(value);
    }
    get menuColumn() {
        return this._menuColumn;
    }

    @Input()
    set mode(value: ViewportMode) {
        this._mode = value;
    }
    get mode() {
        return this._mode;
    }

    @Output() sort: EventEmitter<HeaderCell> = new EventEmitter<HeaderCell>();

    @ViewChild('mobileCellContainer') mobileCellContainer?: TableSortableHeaderCellComponent;

    private _cells: HeaderCell[] = [];
    private _menuColumn = false;
    private _mode: ViewportMode = 'desktop';
    mobileCell?: HeaderCell;
    sortableCells: HeaderCell[] = [];
    sortMenuOpen = false;
    sortMenuPosition?: PositionStyle;

    ngAfterViewInit(): void {
        setTimeout(() => {
            const elementRect = this.mobileCellContainer?.cellElement?.nativeElement.getBoundingClientRect();
            if (!!elementRect) {
                this.sortMenuPosition = {
                    position: 'absolute',
                    top: elementRect.top + elementRect.height,
                };
            }
        });
    }

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
        this.mobileCell = newActive;
        this.sort.emit(newActive);
    }
}
