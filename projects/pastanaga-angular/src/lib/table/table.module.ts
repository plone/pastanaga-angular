import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TableCellComponent } from './table-cell.component';
import { TableComponent } from './table.component';
import { TableHeaderDirective } from './table.directives';
import { TableRowComponent } from './table-row.component';
import { TableRowHeaderComponent } from './table-row-header.component';

@NgModule({
    imports: [CommonModule],
    exports: [TableComponent, TableRowComponent, TableCellComponent, TableRowHeaderComponent, TableHeaderDirective],
    declarations: [TableComponent, TableRowComponent, TableCellComponent, TableRowHeaderComponent, TableHeaderDirective],
    providers: [],
})
export class PaTableModule { }
