import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'pa-demo-table-lead-cell-multi-line-page',
    templateUrl: './table-lead-cell-multi-line-page.component.html',
    styles: [`.pa-lead-description {max-width: 15px;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableLeadCellMultiLinePageComponent {
    code = `<pa-table-lead-cell-multi-line>
    <pa-table-lead-image>
        <pa-icon path="assets/ninja.svg"></pa-icon>
    </pa-table-lead-image>
    <pa-table-lead-title>
        Some title
    </pa-table-lead-title>
    <pa-table-lead-description>
        Some description
    </pa-table-lead-description>
</pa-table-lead-cell-multi-line>`

}
