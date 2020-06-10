import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'pa-demo-base-textfield',
    templateUrl: './base-textfield.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseTextfieldComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
