import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalRef } from '../../../../../../../pastanaga-angular/src';

@Component({
    templateUrl: './dialog-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogExampleComponent {
    constructor(public modal: ModalRef) {}
}
