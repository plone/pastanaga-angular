import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'pa-demo-button-usage',
    templateUrl: './button-usage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonUsageComponent {}
