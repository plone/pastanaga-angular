import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'pa-demo-base-control',
    templateUrl: './base-control.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseControlComponent {}
