import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './checkbox-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxPageComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
