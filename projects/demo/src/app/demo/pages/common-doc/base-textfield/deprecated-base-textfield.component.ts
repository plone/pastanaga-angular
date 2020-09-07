import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'pa-demo-deprecated-base-textfield',
    templateUrl: './deprecated-base-textfield.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeprecatedBaseTextfieldComponent {}
