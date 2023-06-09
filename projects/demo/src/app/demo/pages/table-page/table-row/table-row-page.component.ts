import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pa-demo-table-row',
  templateUrl: './table-row-page.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRowPageComponent {
  selected = 1;

  code = `<pa-table columns="128px 128px 1fr 96px">
    <pa-table-header>
        <pa-table-cell header>Column 1</pa-table-cell>
        <pa-table-cell header>Column 2</pa-table-cell>
        <pa-table-cell header>Column 3</pa-table-cell>
        <pa-table-cell header>Menu</pa-table-cell>
    </pa-table-header>
    <pa-table-row clickable
                  [class.pa-selected]="selected === 1"
                  (click)="selected = 1">
        <pa-table-cell>Row 1</pa-table-cell>
        <pa-table-cell>is</pa-table-cell>
        <pa-table-cell>clickable {{selected === 1 ? 'and selected' : ''}}</pa-table-cell>
        <pa-table-cell-menu><pa-button icon="trash" size="small"></pa-button></pa-table-cell-menu>
    </pa-table-row>
    <pa-table-row clickable
                  [class.pa-selected]="selected === 2"
                  (click)="selected = 2">
        <pa-table-cell>Row 2</pa-table-cell>
        <pa-table-cell>is</pa-table-cell>
        <pa-table-cell>clickable {{selected === 2 ? 'and selected' : ''}}</pa-table-cell>
        <pa-table-cell-menu><pa-button icon="trash" size="small"></pa-button></pa-table-cell-menu>
    </pa-table-row>
    <pa-table-row disabled
                  (click)="selected = 3">
        <pa-table-cell>Row 3</pa-table-cell>
        <pa-table-cell>is</pa-table-cell>
        <pa-table-cell>disabled {{selected === 3 ? 'and selected' : ''}}</pa-table-cell>
        <pa-table-cell-menu><pa-button icon="trash" size="small"></pa-button></pa-table-cell-menu>
    </pa-table-row>
</pa-table>`;
}
