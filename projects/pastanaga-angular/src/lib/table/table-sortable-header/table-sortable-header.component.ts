import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { HeaderCell } from '../table.models';
import { ViewportMode } from '../../breakpoint-observer';
import { PositionStyle } from '../../common';
import { TableSortableHeaderCellComponent } from '../table-sortable-header-cell/table-sortable-header-cell.component';

@Component({
  selector: 'pa-table-sortable-header',
  templateUrl: './table-sortable-header.component.html',
  styleUrls: ['table-sortable-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TableSortableHeaderComponent implements AfterViewInit {
  @Input({ transform: booleanAttribute }) menuColumn = false;
  @Input() mode: ViewportMode = 'desktop';
  @Input()
  set cells(value: HeaderCell[] | null) {
    if (!!value) {
      this._cells = value.map((v) => ({ ...v }));
      this.mobileCell = this._cells.find((cell) => cell.active);
      this.sortableCells = this._cells.filter((cell) => cell.sortable);
      if (!this.mobileCell) {
        this.mobileCell = this._cells[0];
      }
    }
  }
  get cells() {
    return this._cells;
  }
  @Input({ transform: booleanAttribute }) noBackground = false;

  @HostBinding('class.no-background') get headerWithoutBackground() {
    return this.noBackground;
  }

  @Output() sort: EventEmitter<HeaderCell> = new EventEmitter<HeaderCell>();

  @ViewChild('mobileCellContainer') mobileCellContainer?: TableSortableHeaderCellComponent;

  private _cells: HeaderCell[] = [];
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
    const currentActive = this.cells?.find((cell) => cell.active);
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
      newActive = this.cells?.find((cell) => cell.id === id) as HeaderCell;
      newActive.active = true;
    }
    this.mobileCell = newActive;
    this.sort.emit(newActive);
  }
}
