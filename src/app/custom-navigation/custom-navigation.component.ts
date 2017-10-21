import { Component } from '@angular/core';
import { Navigation } from '@plone/restapi-angular';

@Component({
  selector: 'custom-navigation',
  template: `<custom-navigation-level [links]="links"></custom-navigation-level>`
})
export class CustomNavigationComponent extends Navigation {}