import { Component, Input } from '@angular/core';

@Component({
  selector: 'pa-demo-confirmation-dialog-description',
  template: `
    <p>
      {{ systemName }} provides a full modal system for managing modals and dialogs. See
      <a [routerLink]="'/modal'">modal page</a>
      for a full documentation of this system.
    </p>
    <p>
      {{ systemName }} also provides a method
      <code>openConfirm</code>
      simplifying the creation of commonly used confirmation dialogs.
      <code>openConfirm</code>
      takes a unique parameter
      <code>ConfirmationData</code>
      to configure and open the confirmation dialog directly.
    </p>
  `,
  standalone: false,
})
export class ConfirmationDialogDescriptionComponent {
  @Input() systemName = 'Pastanaga';
}
