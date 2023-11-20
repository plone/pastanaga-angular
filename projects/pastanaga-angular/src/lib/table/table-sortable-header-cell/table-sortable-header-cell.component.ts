import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BreakpointObserver } from '../../breakpoint-observer';
import { markForCheck } from '../../common';
import { take } from 'rxjs/operators';

export const SORTABLE_ICON = 'chevron-down';
export const SORTED_ASCENDING_ICON = 'arrow-down';
export const SORTED_DESCENDING_ICON = 'arrow-up';

@Component({
  selector: 'pa-table-sortable-header-cell',
  templateUrl: './table-sortable-header-cell.component.html',
  styleUrls: ['./table-sortable-header-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSortableHeaderCellComponent implements OnChanges {
  @Input({ transform: booleanAttribute }) enabled = false;
  @Input({ transform: booleanAttribute }) active = false;
  @Input({ transform: booleanAttribute }) isDescending = false;
  @Input({ transform: booleanAttribute }) center = false;

  @Output() sort = new EventEmitter();

  @ViewChild('cell', { read: ElementRef }) cellElement?: ElementRef;

  icon?: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['active'] || changes['isDescending'] || changes['enabled']) {
      this.updateIcon();
    }
  }

  private updateIcon() {
    this.breakpointObserver.currentMode.pipe(take(1)).subscribe((mode) => {
      if (mode === 'mobile') {
        this.icon = SORTABLE_ICON;
      } else {
        if (!this.enabled) {
          this.icon = SORTABLE_ICON;
        } else {
          this.icon = this.isDescending ? SORTED_DESCENDING_ICON : SORTED_ASCENDING_ICON;
        }
      }
      markForCheck(this.cdr);
    });
  }
}
