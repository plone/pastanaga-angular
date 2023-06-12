import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Aspect, ModalService } from '@guillotinaweb/pastanaga-angular';

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

  cancelAspect: Aspect = 'solid';

  constructor(private modalService: ModalService) {}

  openConfirm() {
    this.modalService.openConfirm({
      title: 'Are you sure you want to do this?',
      description: 'Default buttons are cancel and confirm but you can pass any label you want.',
      cancelAspect: this.cancelAspect,
    });
  }

  openDestructiveConfirm() {
    this.modalService.openConfirm({
      title: 'Are you sure you want to do this destructive action?',
      description: 'For negative/destructive actions, you can use isDestructive option.',
      isDestructive: true,
      cancelAspect: this.cancelAspect,
    });
  }

  openConfirmOnly() {
    this.modalService.openConfirm({
      title: 'Something happened!',
      description: 'Confirmation dialog can be used as an alert by using onlyConfirm option.',
      confirmLabel: 'OK',
      onlyConfirm: true,
    });
  }
}
