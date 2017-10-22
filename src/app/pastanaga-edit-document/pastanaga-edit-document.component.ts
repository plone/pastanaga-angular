import { Component } from '@angular/core';
import { EditView } from '@plone/restapi-angular';

@Component({
  selector: 'app-pastanaga-edit-document',
  templateUrl: './pastanaga-edit-document.component.html',
  styleUrls: ['./pastanaga-edit-document.component.scss']
})
export class PastanagaEditDocumentComponent extends EditView {

  send(data) {
    data.text = {
      'content-type': 'text/html',
      data: data.text,
      encoding: 'utf-8',
    };
    this.services.resource.update(this.path, data).subscribe(() => {
      this.services.traverser.traverse(this.path);
    });
  }

}
