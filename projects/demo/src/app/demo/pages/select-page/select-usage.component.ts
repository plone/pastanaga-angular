import { Component } from '@angular/core';

@Component({
  selector: 'pa-demo-select-usage',
  template: `
    <h4>Inputs</h4>
    <dl>
      <dt>adjustHeight</dt>
      <dd>
        allow to make sure the selection list will not go under the window bottom
        <small>(default: false)</small>
      </dd>

      <dt>errorMessages</dt>
      <dd>
        Provides default messages to display for the possible error keys when none is present in the errors object. If a
        message (string) is provided for a given key, it will be displayed rather than the message provided in
        errorMessages.
      </dd>

      <dt>hasFocus</dt>
      <dd>
        triggers the focus on the input field
        <small>(optional)</small>
      </dd>

      <dt>help</dt>
      <dd>
        A hint to display, helping the user when filling a form field
        <small>(optional)</small>
      </dd>

      <dt>label</dt>
      <dd>Field's label</dd>

      <dt>options</dt>
      <dd>
        Option list to be displayed in the dropdown
        <small>(optional: can be set directly in the DOM)</small>
      </dd>

      <dt>placeholder</dt>
      <dd>
        Field's placeholder
        <small>(optional)</small>
      </dd>

      <dt>required</dt>
      <dd>
        Adds an internal
        <code>Validators.required</code>
        <small>(default: false)</small>
      </dd>

      <dt>showAllErrors</dt>
      <dd>
        Display all errors or only the first error encountered (errors being sorted by key)
        <small>(default: true)</small>
      </dd>
    </dl>

    <h4>Outputs</h4>
    <dl>
      <dt>expanded</dt>
      <dd>
        Emits
        <code>true</code>
        when the dropdown is opened, and
        <code>false</code>
        when it is closed.
      </dd>
    </dl>
  `,
  standalone: false,
})
export class SelectUsageComponent {}
