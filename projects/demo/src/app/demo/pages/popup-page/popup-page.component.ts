import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './popup-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupPageComponent implements OnInit {
    example = `<pa-button [paPopup]="myPopup" size="small">Open popup</pa-button>
<pa-demo-basic-popup #myPopup></pa-demo-basic-popup>`

    popupOnRight = false;

    constructor() {
    }

    ngOnInit(): void {
    }

}
