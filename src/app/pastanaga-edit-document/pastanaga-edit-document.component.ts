import { Component } from '@angular/core';
import { EditView , Services } from '@plone/restapi-angular';
import { PastanagaService } from '../service';

@Component({
  selector: 'app-pastanaga-edit-document',
  templateUrl: './pastanaga-edit-document.component.html',
  styleUrls: ['./pastanaga-edit-document.component.scss']
})
export class PastanagaEditDocumentComponent extends EditView {

  text: string;

  constructor(
    public services: Services,
    public pastanaga: PastanagaService,
  ) {
    super(services);
  }

  onTraverse(target) {
    this.text = target.context.text ? target.context.text.data : '';
  }

  send(data) {
    data.text = {
      'content-type': 'text/html',
      data: data.text,
      encoding: 'utf-8',
    };
    this.services.resource.update(this.context['@id'], data).subscribe(() => {
      this.services.traverser.traverse(this.context['@id']);
      this.pastanaga.displayMessage('Saved!');
    }, err => {      
      this.pastanaga.displayMessage('Error!');
    });
  }

}
