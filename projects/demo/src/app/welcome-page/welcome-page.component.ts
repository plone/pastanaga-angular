import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePageComponent {
}
