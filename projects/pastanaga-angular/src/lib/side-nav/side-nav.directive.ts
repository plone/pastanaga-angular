/* tslint:disable:directive-selector */
import { Directive } from '@angular/core';

@Directive({
  selector: 'pa-side-nav-content',
  standalone: false,
})
export class SideNavContentDirective {}

@Directive({
  selector: 'pa-side-nav-header',
  standalone: false,
})
export class SideNavHeaderDirective {}

@Directive({
  selector: 'pa-side-nav-footer',
  standalone: false,
})
export class SideNavFooterDirective {}
