import { Component, OnInit } from '@angular/core';
import { EditView } from '@plone/restapi-angular';

@Component({
  selector: 'app-pastanaga-edit-document',
  templateUrl: './pastanaga-edit-document.component.html',
  styleUrls: ['./pastanaga-edit-document.component.scss']
})
export class PastanagaEditDocumentComponent extends EditView {

  ngOnInit() {
    console.log(this)
  }

}
