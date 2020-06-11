import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './select-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectPageComponent implements OnInit {
    selectedValue = '';

    constructor() {
    }

    ngOnInit(): void {
    }

}
