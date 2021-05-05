import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-accessibility-page',
    templateUrl: './accessibility-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessibilityPageComponent {
    code = `<a class="pa-sr-only" href="#main">Go to main content</a>`;
}
