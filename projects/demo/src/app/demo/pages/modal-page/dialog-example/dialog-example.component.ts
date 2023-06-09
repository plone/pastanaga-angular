import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalRef } from '@guillotinaweb/pastanaga-angular';

@Component({
  templateUrl: './dialog-image-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogImageExampleComponent {
  constructor(public modal: ModalRef) {}
}

@Component({
  templateUrl: './dialog-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogExampleComponent {
  constructor(public modal: ModalRef) {}
}

@Component({
  templateUrl: './dialog-without-footer-example.component.html',
  styles: [
    `
      .simple-form {
        display: flex;
        gap: 16px;

        pa-input ::ng-deep .pa-field {
          margin-bottom: 0;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogWithoutFooterExampleComponent {
  constructor(public modal: ModalRef) {}
}
