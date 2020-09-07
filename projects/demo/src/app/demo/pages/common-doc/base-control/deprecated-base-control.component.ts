import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'pa-demo-deprecated-base-control',
    templateUrl: './deprecated-base-control.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeprecatedBaseControlComponent {}
