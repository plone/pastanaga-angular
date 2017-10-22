import { Component } from '@angular/core';
import { Services } from '@plone/restapi-angular';

@Component({
  selector: 'app-pastanaga-toolbar',
  templateUrl: './pastanaga-toolbar.component.html',
  styleUrls: ['./pastanaga-toolbar.component.scss']
})
export class PastanagaToolbarComponent {
  authenticated: boolean;

  constructor(public services: Services) {
    this.services.authentication.isAuthenticated.subscribe(auth => {
      this.authenticated = auth.state;
    });
  }

  closeToolbar() {
    document.getElementById('pastanaga-toolbar-toggle').click()
  }

  logout() {
    this.services.authentication.logout();
    this.services.traverser.traverse('');
  }
}
