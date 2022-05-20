import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'pa-demo-table-sortable-header-cell-page',
    templateUrl: './table-sortable-header-cell-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSortableHeaderCellPageComponent {
    code = `<pa-table columns="repeat(3, 1fr)">
    <pa-table-header>
        <pa-table-sortable-header-cell enabled>Enabled</pa-table-sortable-header-cell>
        <pa-table-sortable-header-cell enabled isDescending="false">Enabled and ascending</pa-table-sortable-header-cell>
        <pa-table-sortable-header-cell enabled isDescending>Enabled and descending</pa-table-sortable-header-cell>
    </pa-table-header>
</pa-table>`;

}
