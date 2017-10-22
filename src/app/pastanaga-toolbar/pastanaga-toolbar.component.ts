import { Component, OnInit } from '@angular/core';
import { Services, TraversingComponent } from '@plone/restapi-angular';

@Component({
  selector: 'app-pastanaga-toolbar',
  templateUrl: './pastanaga-toolbar.component.html',
  styleUrls: ['./pastanaga-toolbar.component.scss']
})
export class PastanagaToolbarComponent extends TraversingComponent {
  authenticated: boolean;
  collapsed = true;
  isDocument = false;
  isFolderish = false;

  constructor(public services: Services) {
    super(services);
    this.services.authentication.isAuthenticated.subscribe(auth => {
      this.authenticated = auth.state;
    });
  }

  onTraverse(target) {
    this.isDocument = target.context['@type'] === 'Document';
    if (target.context.items) {
      this.isFolderish = true;
    } else {
      this.isFolderish = false;
    }
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.services.authentication.logout();
    this.services.traverser.traverse('');
  }
}
