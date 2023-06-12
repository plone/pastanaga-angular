import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableCellComponent } from '../table-cell/table-cell.component';

@Component({
  selector: 'pa-table-cell-menu',
  templateUrl: './table-cell-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCellMenuComponent extends TableCellComponent {}
