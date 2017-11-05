import { Component, OnInit } from '@angular/core';
import { Services, TraversingComponent } from '@plone/restapi-angular';
import { PastanagaService } from '../service';

@Component({
  selector: 'app-pastanaga-toolbar',
  templateUrl: './pastanaga-toolbar.component.html',
  styleUrls: ['./pastanaga-toolbar.component.scss']
})
export class PastanagaToolbarComponent extends TraversingComponent {
  authenticated: boolean;
  collapsed = true;
  displayMore = false;
  isDocument = false;
  isFolderish = false;
  states: any[] = [
    {id: 'private', title: 'Private', transition: 'retract'},
    {id: 'published', title: 'Public', transition: 'publish'},
  ]; // FIXME: should be obtained from the API
  state: string;

  constructor(
    public services: Services,
    public pastanaga: PastanagaService,
  ) {
    super(services);
    this.services.authentication.isAuthenticated.subscribe(auth => {
      this.authenticated = auth.state;
    });
  }

  onTraverse(target) {
    this.collapsed = true;
    this.isDocument = target.context['@type'] === 'Document';
    if (target.context.items) {
      this.isFolderish = true;
    } else {
      this.isFolderish = false;
    }
    this.state = target.context.review_state;
  }

  toggle() {
    this.collapsed = !this.collapsed;
    if(this.collapsed) {
      this.displayMore = false;
    }
  }

  toggleMore() {
    this.displayMore = !this.displayMore;
  }

  logout() {
    this.services.authentication.logout();
    this.pastanaga.displayMessage('Logged out!');
    this.services.traverser.traverse('');
  }

  setState(state) {
    if(this.state !== state) {
      const transition = this.states.filter(s => s.id === state)[0].transition;
      this.services.resource.transition(this.context['@id'], transition).subscribe(res => {
        this.state = res.review_state;
        this.pastanaga.displayMessage('State changed!');
        this.toggle();
      }, err => {      
        this.pastanaga.displayMessage('Error!');
      });
    }
  }
}
