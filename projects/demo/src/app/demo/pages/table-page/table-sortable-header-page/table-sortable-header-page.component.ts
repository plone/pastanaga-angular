import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderCell, SortableHeaderCell } from '@guillotinaweb/pastanaga-angular';

@Component({
  selector: 'pa-demo-table-sortable-header-page',
  templateUrl: './table-sortable-header-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TableSortableHeaderPageComponent {
  codeDesktop = `<pa-table columns="repeat(4, 1fr)">
    <pa-table-sortable-header [cells]="headerCells"
                              (sort)="sortBy($event)"></pa-table-sortable-header>
    <pa-table-row *ngFor="let row of rows">
        <pa-table-cell>{{row.name}}</pa-table-cell>
        <pa-table-cell>{{row.source}}</pa-table-cell>
        <pa-table-cell center>{{row.status}}</pa-table-cell>
        <pa-table-cell center>{{row.date}}</pa-table-cell>
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
</pa-table>`;

  codeCheckboxColumn = `<pa-table columns="40px repeat(4, 1fr)">
    <pa-table-sortable-header [cells]="headerCells"
                              (sort)="sortBy($event)">
        <pa-table-cell header>
            <pa-checkbox></pa-checkbox>
        </pa-table-cell>
    </pa-table-sortable-header>
    <pa-table-row *ngFor="let row of rows">
        <pa-table-cell><pa-checkbox></pa-checkbox></pa-table-cell>
        <pa-table-cell>{{row.name}}</pa-table-cell>
        <pa-table-cell>{{row.source}}</pa-table-cell>
        <pa-table-cell center>{{row.status}}</pa-table-cell>
        <pa-table-cell center>{{row.date}}</pa-table-cell>
    </pa-table-row>
</pa-table>`;

  headerCells: HeaderCell[] = [
    new SortableHeaderCell({ id: 'name', label: 'Name', active: true }),
    new SortableHeaderCell({ id: 'source', label: 'Source' }),
    new HeaderCell({ id: 'status', label: 'Status', centered: true }),
    new SortableHeaderCell({ id: 'date', label: 'Date', centered: true }),
  ];

  rows: { name: string; source: string; status: string; date: string }[] = [
    { name: 'Ariel', source: 'Source 2', status: 'Swimming', date: '1989' },
    { name: 'Aurora', source: 'Source 1', status: 'Sleeping', date: '1959' },
    { name: 'Elsa', source: 'Source 3', status: '–', date: '2013' },
    { name: 'Mulan', source: 'Source 4', status: 'Fighting', date: '1998' },
  ];

  sortBy(column: HeaderCell) {
    const sortBy: 'source' | 'name' = column.id as 'source' | 'name';
    if (!column.descending) {
      this.rows.sort((a, b) => a[sortBy].toLocaleLowerCase().localeCompare(b[sortBy].toLocaleLowerCase()));
    } else {
      this.rows.sort((a, b) => b[sortBy].toLocaleLowerCase().localeCompare(a[sortBy].toLocaleLowerCase()));
    }
  }
}
