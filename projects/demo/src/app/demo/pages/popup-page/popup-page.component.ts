import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { PopupDirective } from '@guillotinaweb/pastanaga-angular';

@Component({
  templateUrl: './popup-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PopupPageComponent {
  example = `<pa-button [paPopup]="myPopup" size="small">Open popup</pa-button>
<pa-popup #myPopup></pa-popup>`;

  openProgrammaticallyTemplate = `<pa-button [paPopup]="myPopup"
           #myPopupDirective="paPopupRef"
           size="small">Open popup</pa-button>
<pa-demo-basic-popup #myPopup></pa-demo-basic-popup>`;

  openProgrammaticallyComponent = `@ViewChild('myPopupDirective') myPopupDirective?: PopupDirective;

openProgrammatically(event: MouseEvent) {
    if (this.myPopupDirective) {
        this.myPopupDirective.toggle();
    }
}
`;

  alignOnLeft = false;
  popupOnTop = false;
  sameWidth = false;
  @ViewChild('myPopupDirective') myPopupDirective?: PopupDirective;

  openProgrammatically(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.myPopupDirective) {
      this.myPopupDirective.toggle();
    }
  }
}
