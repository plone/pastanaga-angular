import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { AuthenticationService } from '@plone/restapi-angular';

@Component({
  selector: 'app-pastanaga-login',
  templateUrl: './pastanaga-login.component.html',
  styleUrls: ['./pastanaga-login.component.scss']
})
export class PastanagaLoginComponent implements OnInit {

  constructor(private service: AuthenticationService) {
  }

  ngOnInit() {
  }

  login(login: string, password: string) {
    this.service.login(login, password);
    return false;
  }

  logout() {
    this.service.logout();
    return false;
  }
}
