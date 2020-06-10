import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'pa-demo-base-control',
    templateUrl: './base-control.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseControlComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
