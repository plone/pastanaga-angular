import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pa-demo-popup-component-usage',
  templateUrl: './popup-component-usage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponentUsageComponent {}
