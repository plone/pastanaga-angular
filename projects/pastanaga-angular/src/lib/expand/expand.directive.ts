import { Directive } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'pa-expand-header',
})
export class ExpandHeaderDirective {}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'pa-expand-header-extra-space',
})
export class ExpandHeaderExtraSpaceDirective {}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'pa-expand-body',
})
export class ExpandBodyDirective {}
