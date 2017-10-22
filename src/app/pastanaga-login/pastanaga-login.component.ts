import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { AuthenticationService } from '@plone/restapi-angular';

@Component({
  selector: 'app-pastanaga-login',
  templateUrl: './pastanaga-login.component.html',
  styleUrls: ['./pastanaga-login.component.scss']
})
export class PastanagaLoginComponent implements OnInit {

  constructor(private _authService: AuthenticationService, private _location: Location) {
  }

  ngOnInit() {
  }

  login(event: Event, value: Object = {}, form) {
    event.preventDefault();
    this._authService.login(form.username, form.password);
  }

  logout(event) {
    event.preventDefault();
    this._authService.logout();
  }

  goBack(event) {
    event.preventDefault();
    this._location.back();
  }

}
