import { Component } from '@angular/core';

@Component({
  selector: 'pa-demo-confirmation-dialog-usage',
  template: `
    <h3>ConfirmationData</h3>
    <dl>
      <dt>cancelAspect</dt>
      <dd>
        Cancel button aspect (
        <code>basic</code>
        |
        <code>solid</code>
        ).
        <small>Default: solid</small>
      </dd>

      <dt>cancelLabel</dt>
      <dd>
        Label to display on the cancel button.
        <small>Default: pastanaga.cancel</small>
      </dd>

      <dt>confirmLabel</dt>
      <dd>
        Label to display on the confirm button.
        <small>Default: pastanaga.confirm</small>
      </dd>

      <dt>description</dt>
      <dd>
        Description to be displayed below the title.
        <small>Optional</small>
      </dd>

      <dt>isDestructive</dt>
      <dd>
        When true, the confirmation button will be of kind
        <code>destructive</code>
        .
        <small>Default: false</small>
      </dd>

      <dt>onlyConfirm</dt>
      <dd>
        When true, the dialog will have only one button: the confirmation one.
        <small>Default: false</small>
      </dd>

      <dt>title</dt>
      <dd>Title to be displayed in the confirmation dialog. This is the only mandatory property.</dd>
    </dl>
  `,
  standalone: false,
})
export class ConfirmationDialogUsageComponent {}
