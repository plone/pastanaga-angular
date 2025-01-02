import { Component, Input } from '@angular/core';

@Component({
  selector: 'pa-demo-form-field-description',
  // prettier-ignore
  template: `<div>As other Pastanaga’s form fields, <code>{{component}}</code> supports 3 modes internally in order to be used in various context:
    <ul>
      <li>Standalone: using data-binding on <code>value</code>,</li>
      <li>Template-driven form: using <code>ngModel</code> directive,</li>
      <li>Reactive form: using <code>formControl</code> and <code>formControlName</code> directives,</li>
    </ul>
  </div>`,
  standalone: false,
})
export class FormFieldDescriptionComponent {
  @Input() component = '';
}
