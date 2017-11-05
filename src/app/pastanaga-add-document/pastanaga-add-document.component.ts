import { Component } from '@angular/core';
import { Services } from '@plone/restapi-angular';
import * as MediumEditor from 'medium-editor';
import { PastanagaService } from '../service';

@Component({
  selector: 'app-pastanaga-add-document',
  templateUrl: './pastanaga-add-document.component.html',
  styleUrls: ['./pastanaga-add-document.component.scss']
})
export class PastanagaAddDocumentComponent {

  constructor(
    public services: Services,
    public pastanaga: PastanagaService,
  ) { }

  save(data) {
    data['@type'] = 'Document';
    data.text = {
      'content-type': 'text/html',
      data: data.text,
      encoding: 'utf-8',
    };
    this.services.resource.create('/', data).subscribe(res => {
      this.pastanaga.displayMessage('Added!');
      this.services.traverser.traverse(res['@id']);
    }, err => {      
      this.pastanaga.displayMessage('Error!');
    });
  }

}
