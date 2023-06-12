import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IErrorMessages } from '@guillotinaweb/pastanaga-angular';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'pa-demo-pa-select-config',
  templateUrl: './pa-select-config.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaSelectConfigComponent implements OnInit {
  @Output() configChanged = new EventEmitter();

  errorMessages: IErrorMessages = {
    required: 'This field is required.',
  };

  stateForm = new UntypedFormGroup({
    optionsProvidedInTemplate: new UntypedFormControl(true),
    adjustHeight: new UntypedFormControl(),
    hasFocus: new UntypedFormControl(),
    dim: new UntypedFormControl(false),

    value: new UntypedFormControl(),
    label: new UntypedFormControl('The label'),
    placeholder: new UntypedFormControl(),
    readonly: new UntypedFormControl(),
    disabled: new UntypedFormControl(),

    help: new UntypedFormControl(),
    errorMessage: new UntypedFormControl(),
    errorMessages: new UntypedFormControl(),
    showAllErrors: new UntypedFormControl(),
  });

  ngOnInit(): void {
    this.stateForm.valueChanges.subscribe((val) => {
      this.configChanged.emit(val);
    });
  }
}
