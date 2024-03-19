import { booleanAttribute, Directive, HostBinding, Input } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({ selector: 'pa-table-header' })
export class TableHeaderDirective {
  @Input({ transform: booleanAttribute }) noBackground = false;

  @HostBinding('class.no-background') get headerWithoutBackground() {
    return this.noBackground;
  }
}

@Directive({ selector: 'pa-table-lead-image' })
export class TableLeadImage {}

@Directive({ selector: 'pa-table-lead-title' })
export class TableLeadTitle {}

@Directive({ selector: 'pa-table-lead-description' })
export class TableLeadDescription {}
