import { Component } from '@angular/core';
import { Traverser } from 'angular-traversal';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'demo';

    constructor(private traverser: Traverser) {
        traverser.addView('view', '', WelcomePageComponent);
    }
}
