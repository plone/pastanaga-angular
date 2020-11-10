import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalRef } from '../../../../../../../pastanaga-angular/src';

@Component({
    templateUrl: './dialog-image-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogImageExampleComponent {
    constructor(public modal: ModalRef) {}
}
