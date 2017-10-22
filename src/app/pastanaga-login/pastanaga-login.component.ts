import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { Services, LoginView } from '@plone/restapi-angular';


@Component({
  selector: 'app-pastanaga-login',
  templateUrl: './pastanaga-login.component.html',
  styleUrls: ['./pastanaga-login.component.scss']
})
export class PastanagaLoginComponent extends LoginView {

  cancel() {
    this.services.traverser.traverse('/');
    return false;
  }

  logout() {
    this.services.authentication.logout();
    return false;
  }
}
