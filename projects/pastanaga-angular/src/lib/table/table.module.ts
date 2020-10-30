import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TableCellComponent } from './table-cell/table-cell.component';
import { TableComponent } from './table.component';
import { TableHeaderDirective } from './table.directives';
import { TableRowComponent } from './table-row/table-row.component';
import { TableRowHeaderComponent } from './table-row-header/table-row-header.component';
import { TableCellMenuComponent } from './table-cell-menu/table-cell-menu.component';
import { PaFocusableModule } from '../focusable/focusable.module';

@NgModule({
    imports: [CommonModule, PaFocusableModule],
    exports: [
        TableComponent,
        TableRowComponent,
        TableCellComponent,
        TableRowHeaderComponent,
        TableHeaderDirective,
        TableCellMenuComponent,
    ],
    declarations: [
        TableComponent,
        TableRowComponent,
        TableCellComponent,
        TableRowHeaderComponent,
        TableHeaderDirective,
        TableCellMenuComponent,
    ],
    providers: [],
})
export class PaTableModule {}
