import { Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'pa-expander-header',
})
export class ExpanderHeaderDirective {}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'pa-expander-header-side-block',
})
export class ExpanderHeaderSideBlockDirective {}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'pa-expander-body',
})
export class ExpanderBodyDirective {}
