import { Directive } from '@angular/core';

@Directive({
  selector: 'pa-expander-header',
  standalone: false,
})
export class ExpanderHeaderDirective {}

@Directive({
  selector: 'pa-expander-header-side-block',
  standalone: false,
})
export class ExpanderHeaderSideBlockDirective {}

@Directive({
  selector: 'pa-expander-body',
  standalone: false,
})
export class ExpanderBodyDirective {}
