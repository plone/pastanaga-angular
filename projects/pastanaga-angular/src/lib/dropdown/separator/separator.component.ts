import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'pa-separator',
    template: ` <li class="pa-separator" role="separator"></li>`,
    styleUrls: ['separator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorComponent {
}
