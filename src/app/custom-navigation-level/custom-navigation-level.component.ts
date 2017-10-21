import { Component } from '@angular/core';
import { NavigationLevel } from '@plone/restapi-angular';

@Component({
  selector: 'custom-navigation-level',
  templateUrl: './custom-navigation-level.component.html',
})
export class CustomNavigationLevelComponent extends NavigationLevel {
}