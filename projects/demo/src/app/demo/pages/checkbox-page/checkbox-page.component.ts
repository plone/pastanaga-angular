import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    templateUrl: './checkbox-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxPageComponent implements OnInit {
    selectedTab = 'standalone';

    id?: string;
    name?: string;
    disabled = false;
    readonly = false;
    required = false;
    hasErrorMessage = false;
    errorMessages?: any;

    value?: boolean;
    standaloneValueChange?: any;
    standaloneStatusChange?: any;

    model?: any;
    ngModelValueChange?: any;
    ngModelStatusChange?: any;

    formControl = new FormControl();
    formControlValueChange?: any;
    formControlStatusChange?: any;

    form: FormGroup = new FormGroup({
        checkbox: new FormControl(),
    });
    formControlNameValueChange?: any;
    formControlNameStatusChange?: any;
    formGroupValueChange?: any;
    formGroupStatusChange?: any;

    code = `<pa-checkbox [value]="value" (valueChange)="...">Label</pa-checkbox>
<pa-checkbox [(ngModel)]="model">Label</pa-checkbox>
<pa-checkbox [formControl]="formControl">Label</pa-checkbox>
<form [formGroup]="form">
    <pa-checkbox formControlName="checkbox">Label</pa-checkbox>
</form>
`;

    ngOnInit() {
        this.form.valueChanges.subscribe((value) => {
            this.formGroupValueChange = value;
        });
        this.form.statusChanges.subscribe((value) => {
            this.formGroupStatusChange = value;
        });
    }

    disableForm() {
        // this.disabled = event;

        if (this.disabled) {
            this.form.disable();
            this.formControl.disable();
        } else {
            this.form.enable();
            this.formControl.enable();
        }
    }

    toggleValue() {
        this.value = !this.value;
        this.model = !this.model;
        this.formControl.patchValue(!this.formControl.value);
        this.form.patchValue({ checkbox: !this.form.value.checkbox });
    }

    toggleErrorMessages() {
        this.errorMessages = this.hasErrorMessage ? { required: 'This checkbox is required.' } : undefined;
    }
}
