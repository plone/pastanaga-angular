import { Directive } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({ selector: 'pa-table-header' })
export class TableHeaderDirective {}

@Directive({ selector: 'pa-table-lead-image' })
export class TableLeadImage {}

@Directive({ selector: 'pa-table-lead-title' })
export class TableLeadTitle {}

@Directive({ selector: 'pa-table-lead-description' })
export class TableLeadDescription {}
