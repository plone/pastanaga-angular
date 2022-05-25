import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'pa-demo-table-cell-page',
    templateUrl: './table-cell-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCellPageComponent {
    code = `<pa-table columns="1fr 1fr 1fr 96px">
    <pa-table-header>
        <pa-table-cell header clickable>Clickable</pa-table-cell>
        <pa-table-cell header disabled>Disabled</pa-table-cell>
        <pa-table-cell header noWrap>noWrap</pa-table-cell>
        <pa-table-cell-menu header></pa-table-cell-menu>
    </pa-table-header>
    <pa-table-row>
        <pa-table-cell clickable>Clickable</pa-table-cell>
        <pa-table-cell disabled>Disabled</pa-table-cell>
        <pa-table-cell noWrap><span paEllipsisTooltip>noWrap even if super long content going over the limit of the cell, displayed thanks to paEllipsisTooltip</span></pa-table-cell>
        <pa-table-cell-menu><pa-button icon="trash" size="small"></pa-button></pa-table-cell-menu>
    </pa-table-row>
</pa-table>`

}
