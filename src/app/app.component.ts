import { Component } from '@angular/core';
import { PloneViews, Services } from '@plone/restapi-angular';
import { PastanagaLoginComponent } from './pastanaga-login/pastanaga-login.component';
import { PastanagaEditDocumentComponent } from './pastanaga-edit-document/pastanaga-edit-document.component';
import { PastanagaAddDocumentComponent } from './pastanaga-add-document/pastanaga-add-document.component';
import { PastanagaHomeComponent } from './pastanaga-home/pastanaga-home.component';
import { PastanagaViewComponent } from './pastanaga-view/pastanaga-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public views: PloneViews,
    public services: Services,
  ) {
    this.views.initialize();
    this.services.traverser.addView('login', '*', PastanagaLoginComponent);
    this.services.traverser.addView('view', 'Plone Site', PastanagaHomeComponent);
    this.services.traverser.addView('add', '*', PastanagaAddDocumentComponent);
    this.services.traverser.addView('edit', 'Document', PastanagaEditDocumentComponent);
    this.services.traverser.addView('view', 'Document', PastanagaViewComponent);
  }
}
