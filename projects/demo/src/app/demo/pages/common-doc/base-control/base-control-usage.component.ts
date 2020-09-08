import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'pa-demo-base-control-usage',
    templateUrl: './base-control-usage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseControlUsageComponent {}
