import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'pa-doc-welcome-page',
    templateUrl: './welcome-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePageComponent {
}
