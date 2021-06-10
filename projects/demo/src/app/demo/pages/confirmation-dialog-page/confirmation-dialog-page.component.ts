import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from '../../../../../../pastanaga-angular/src';

@Component({
    templateUrl: './confirmation-dialog-page.component.html',
    styleUrls: ['./confirmation-dialog-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogPageComponent {
    openConfirmCode = `openConfirm() {
    this.modalService.openConfirm({
        title: 'Are you sure you want to do this?',
        description: 'Default buttons are cancel and confirm but you can pass any label you want.',
    });
}`;

    constructor(private modalService: ModalService) {}

    openConfirm() {
        this.modalService.openConfirm({
            title: 'Are you sure you want to do this?',
            description: 'Default buttons are cancel and confirm but you can pass any label you want.',
        });
    }

    openDestructiveConfirm() {
        this.modalService.openConfirm({
            title: 'Are you sure you want to do this destructive action?',
            description: 'For negative/destructive actions, you can use isDestructive option.',
            isDestructive: true,
        });
    }
}
