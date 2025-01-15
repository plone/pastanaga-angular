import { booleanAttribute, ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pa-table-cell',
  templateUrl: 'table-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class TableCellComponent {
  @Input({ transform: booleanAttribute }) clickable = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) header = false;
  @Input({ transform: booleanAttribute }) noWrap = false;
  @Input({ transform: booleanAttribute }) center = false;
  @Input({ transform: booleanAttribute }) borderRight = false;
}
