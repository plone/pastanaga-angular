import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'pa-option-header',
    template: `
        <li class="pa-option-header" role="presentation">
            <ng-content></ng-content>
        </li>
    `,
    styleUrls: ['./option-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionHeaderComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
