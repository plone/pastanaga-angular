import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IErrorMessages } from '@guillotinaweb/pastanaga-angular';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'pa-demo-pa-input-config',
  templateUrl: './pa-input-config.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaInputConfigComponent implements OnInit {
  @Output() configChanged = new EventEmitter();

  errorMessages: IErrorMessages = {
    required: 'This field is required.',
    pattern: 'This field is not matching regex .?test.?.',
    min: 'Value is too low.',
    max: 'Value is too high.',
    email: 'Invalid email.',
    maxlength: 'Too many chars.',
  };
  pattern = /.?test.?/;

  stateForm = new UntypedFormGroup({
    icon: new UntypedFormControl(),
    value: new UntypedFormControl(),
    type: new UntypedFormControl(),
    placeholder: new UntypedFormControl(),
    autoCapitalize: new UntypedFormControl(),
    preventAutocomplete: new UntypedFormControl(),
    acceptHtml: new UntypedFormControl(),
    disabled: new UntypedFormControl(),
    readonly: new UntypedFormControl(),
    hasFocus: new UntypedFormControl(),
    help: new UntypedFormControl(),
    errorMessage: new UntypedFormControl(),
    errorMessages: new UntypedFormControl(),
    showAllErrors: new UntypedFormControl(),
    maxlength: new UntypedFormControl(),
  });

  ngOnInit(): void {
    this.stateForm.valueChanges.subscribe((val) => {
      this.configChanged.emit(val);
    });
  }
}
