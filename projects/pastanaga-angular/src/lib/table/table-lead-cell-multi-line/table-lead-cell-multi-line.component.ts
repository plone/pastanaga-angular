import { booleanAttribute, ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pa-table-lead-cell-multi-line',
  templateUrl: './table-lead-cell-multi-line.component.html',
  styleUrls: ['./table-lead-cell-multi-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class TableLeadCellMultiLineComponent {
  @Input({ transform: booleanAttribute }) clickable = false;
  @Input({ transform: booleanAttribute }) disabled = false;
}
