import { Component, OnInit } from '@angular/core';
import { Services } from '@plone/restapi-angular';

@Component({
  selector: 'app-pastanaga-home',
  templateUrl: './pastanaga-home.component.html',
  styleUrls: ['./pastanaga-home.component.scss']
})
export class PastanagaHomeComponent implements OnInit {

  documents: any[] = [];

  constructor(public services: Services) { }

  ngOnInit() {
    this.services.resource.find({ portal_type: 'Document' }).subscribe(res => {
      this.documents = res.items;
    });
  }

}
