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
import { TableSortableHeaderComponent } from './table-sortable-header/table-sortable-header.component';

const components = [
    TableComponent,
    TableRowComponent,
    TableCellComponent,
    TableRowHeaderComponent,
    TableHeaderDirective,
    TableCellMenuComponent,
    TableSortableHeaderComponent,
    TableSortableHeaderCellComponent,
];

@NgModule({
    imports: [CommonModule, PaFocusableModule, PaTranslateModule, PaIconModule],
    exports: components,
    declarations: components,
})
export class PaTableModule {}
