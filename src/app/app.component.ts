import { Component } from '@angular/core';
import { Traverser } from 'angular-traversal';
import { PloneViews } from '@plone/restapi-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private views:PloneViews,
    private traverser: Traverser,
  ) {
    this.views.initialize();
  }
  title = 'app';
}
