import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './checkbox-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxPageComponent implements OnInit {
  isIndeterminate = true;
  indeterminateSelection = false;

  selectedTab = 'standalone';

  id?: string;
  name?: string;
  disabled = false;
  hasErrorMessage = false;
  errorMessages?: any;

  value?: boolean;
  standaloneValueChange?: any;
  standaloneStatusChange?: any;

  model?: any;
  ngModelValueChange?: any;
  ngModelStatusChange?: any;

  formControl = new UntypedFormControl(true, Validators.requiredTrue);
  formControlValueChange?: any;
  formControlStatusChange?: any;

  form: UntypedFormGroup = new UntypedFormGroup({
    checkbox: new UntypedFormControl(false, Validators.requiredTrue),
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
