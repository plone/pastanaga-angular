import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    templateUrl: './toggle-page.component.html',
})
export class TogglePageComponent {

    firstToggle = false;

    form: FormGroup = new FormGroup({
        toggle: new FormControl()
    });

    focusedFirstToggle = false;
    focusedToggle = false;
    disabled = false;

    code = `<pa-deprecated-toggle
    id="firstToggle"
    name="firstToggle"
    [(ngModel)]="firstToggle"
    [hasFocus]="focusedFirstToggle"
    [disabled]="disabled"
></pa-deprecated-toggle>

<form [formGroup]="form">
    <pa-deprecated-toggle
        id="toggle"
        name="toggle"
        formControlName="toggle"
        help="help text"
        [hasFocus]="focusedToggle"
    >Label</pa-deprecated-toggle>
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
