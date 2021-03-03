import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TableCellComponent } from './table-cell/table-cell.component';
import { TableComponent } from './table.component';
import { TableHeaderDirective } from './table.directives';
import { TableRowComponent } from './table-row/table-row.component';
import { TableRowHeaderComponent } from './table-row-header/table-row-header.component';
import { TableCellMenuComponent } from './table-cell-menu/table-cell-menu.component';
import { PaFocusableModule } from '../focusable/focusable.module';
import { TableSortableHeaderCellComponent } from './table-sortable-header-cell/table-sortable-header-cell.component';
import { PaTranslateModule } from '../translate/translate.module';
import { PaIconModule } from '../icon/icon.module';

@NgModule({
    imports: [CommonModule, PaFocusableModule, PaTranslateModule, PaIconModule],
    exports: [
        TableComponent,
        TableRowComponent,
        TableCellComponent,
        TableRowHeaderComponent,
        TableHeaderDirective,
        TableCellMenuComponent,
        TableSortableHeaderCellComponent,
    ],
    declarations: [
        TableComponent,
        TableRowComponent,
        TableCellComponent,
        TableRowHeaderComponent,
        TableHeaderDirective,
        TableCellMenuComponent,
        TableSortableHeaderCellComponent,
    ],
    providers: [],
})
export class PaTableModule {}
