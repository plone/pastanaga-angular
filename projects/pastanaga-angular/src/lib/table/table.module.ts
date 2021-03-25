import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TableCellComponent } from './table-cell/table-cell.component';
import { TableComponent } from './table.component';
import { TableHeaderDirective, TableLeadDescription, TableLeadImage, TableLeadTitle } from './table.directives';
import { TableRowComponent } from './table-row/table-row.component';
import { TableRowHeaderComponent } from './table-row-header/table-row-header.component';
import { TableCellMenuComponent } from './table-cell-menu/table-cell-menu.component';
import { PaFocusableModule } from '../focusable/focusable.module';
import { TableSortableHeaderCellComponent } from './table-sortable-header-cell/table-sortable-header-cell.component';
import { PaTranslateModule } from '../translate/translate.module';
import { PaIconModule } from '../icon/icon.module';
import { TableSortableHeaderComponent } from './table-sortable-header/table-sortable-header.component';
import { PaDropdownModule } from '../dropdown/dropdown.module';
import { PaPopupModule } from '../popup/popup.module';
import { TableLeadCellMultiLineComponent } from './table-lead-cell-multi-line/table-lead-cell-multi-line.component';

const components = [
    TableComponent,
    TableRowComponent,
    TableCellComponent,
    TableRowHeaderComponent,
    TableHeaderDirective,
    TableCellMenuComponent,
    TableLeadCellMultiLineComponent,
    TableSortableHeaderComponent,
    TableSortableHeaderCellComponent,
    TableLeadImage,
    TableLeadTitle,
    TableLeadDescription,
];

@NgModule({
    imports: [CommonModule, PaFocusableModule, PaTranslateModule, PaIconModule, PaDropdownModule, PaPopupModule],
    exports: components,
    declarations: components,
})
export class PaTableModule {}
