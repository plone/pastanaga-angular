import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    templateUrl: './toggle-page.component.html',
})
export class TogglePageComponent {
    firstToggle = false;

    form: UntypedFormGroup = new UntypedFormGroup({
        toggle: new UntypedFormControl(true),
    });
    firstToggleStatus?: any;
    secondToggleStatus?: any;

    focusedFirstToggle = false;
    focusedToggle = false;
    disabled = false;

    code = `<pa-toggle
    id="firstToggle"
    name="firstToggle"
    [(ngModel)]="firstToggle"
    [hasFocus]="focusedFirstToggle"
    [disabled]="disabled"
></pa-toggle>

<form [formGroup]="form">
    <pa-toggle
        id="toggle"
        name="toggle"
        formControlName="toggle"
        help="help text"
        [hasFocus]="focusedToggle"
    >Label</pa-toggle>
</form>
`;

    toggleDisabled() {
        if (this.disabled) {
            this.form.get('toggle')?.disable();
        } else {
            this.form.get('toggle')?.enable();
        }
    }
}
