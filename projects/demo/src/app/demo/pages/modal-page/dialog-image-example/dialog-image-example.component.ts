import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalRef } from '@guillotinaweb/pastanaga-angular';

@Component({
    templateUrl: './dialog-image-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogImageExampleComponent {
    constructor(public modal: ModalRef) {}
}
