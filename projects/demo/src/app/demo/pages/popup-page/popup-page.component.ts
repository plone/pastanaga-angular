import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: './popup-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupPageComponent {
    example = `<pa-button [paPopup]="myPopup" size="small">Open popup</pa-button>
<pa-demo-basic-popup #myPopup></pa-demo-basic-popup>`;

    popupOnRight = false;
    popupOnTop = false;
    sameWidth = false;
}
