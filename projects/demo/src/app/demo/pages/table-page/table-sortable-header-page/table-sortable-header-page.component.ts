import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderCell, SortableHeaderCell } from '@guillotinaweb/pastanaga-angular';

@Component({
    selector: 'pa-demo-table-sortable-header-page',
    templateUrl: './table-sortable-header-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSortableHeaderPageComponent {
    codeDesktop = `<pa-table columns="repeat(3, 1fr)">
    <pa-table-sortable-header [cells]="headerCells"
                              (sort)="sortBy($event)"></pa-table-sortable-header>
    <pa-table-row *ngFor="let row of rows">
        <pa-table-cell>{{row.name}}</pa-table-cell>
        <pa-table-cell>{{row.source}}</pa-table-cell>
        <pa-table-cell>{{row.status}}</pa-table-cell>
    </pa-table-row>
</pa-table>`;

    codeMobile = `<pa-table>
    <pa-table-sortable-header mode="mobile"
                              [cells]="headerCells"
                              (sort)="sortBy($event)"></pa-table-sortable-header>
    <pa-table-row *ngFor="let row of rows">
        <pa-table-lead-cell-multi-line>
            <pa-table-lead-image><pa-icon path="assets/ninja.svg"></pa-icon></pa-table-lead-image>
            <pa-table-lead-title>{{row.name}}</pa-table-lead-title>
            <pa-table-lead-description>{{row.source}}</pa-table-lead-description>
        </pa-table-lead-cell-multi-line>
    </pa-table-row>
</pa-table>`

    headerCells: HeaderCell[] = [
        new SortableHeaderCell({ id: 'name', label: 'Name', active: true }),
        new SortableHeaderCell({ id: 'source', label: 'Source' }),
        new HeaderCell({ id: 'status', label: 'Status' }),
    ];

    rows: {name: string, source: string, status: string}[] = [
        {name: 'Aurora', source: 'Source 1', status: 'Sleeping'},
        {name: 'Ariel', source: 'Source 2', status: 'Swimming'},
        {name: 'Mulan', source: 'Source 3', status: 'Fighting'},
    ];

    sortBy(column: HeaderCell) {
        const sortBy : 'source' | 'name' = column.id as 'source' | 'name';
        if (column.descending) {
            this.rows.sort((a, b) => a[sortBy].toLocaleLowerCase().localeCompare(b[sortBy].toLocaleLowerCase()));
        } else {
            this.rows.sort((a, b) => b[sortBy].toLocaleLowerCase().localeCompare(a[sortBy].toLocaleLowerCase()));
        }
    }
}
