import { Component } from '@angular/core';
import { Services } from '@plone/restapi-angular';
import * as MediumEditor from 'medium-editor';

@Component({
  selector: 'app-pastanaga-add-document',
  templateUrl: './pastanaga-add-document.component.html',
  styleUrls: ['./pastanaga-add-document.component.scss']
})
export class PastanagaAddDocumentComponent {

  constructor(public services: Services) { }

  save(data) {
    data['@type'] = 'Document';
    data.text = {
      'content-type': 'text/html',
      data: data.text,
      encoding: 'utf-8',
    };
    this.services.resource.create('/', data).subscribe(res => {
      this.services.traverser.traverse(res['@id']);
    });
  }

}
