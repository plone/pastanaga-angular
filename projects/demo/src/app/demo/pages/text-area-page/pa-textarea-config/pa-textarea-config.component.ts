import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IErrorMessages } from '@guillotinaweb/pastanaga-angular';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'pa-demo-pa-textarea-config',
  templateUrl: './pa-textarea-config.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PaTextareaConfigComponent implements OnInit {
  @Output() configChanged = new EventEmitter();

  errorMessages: IErrorMessages = {
    required: 'This field is required.',
    maxlength: 'Too many chars.',
  };
  shortText = 'A short text already filled';
  longText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  stateForm = new UntypedFormGroup({
    value: new UntypedFormControl(),
    placeholder: new UntypedFormControl(),
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
    // display
    autoHeight: new UntypedFormControl(),
    rows: new UntypedFormControl(),
    resizable: new UntypedFormControl(),
    maxRows: new UntypedFormControl(),
    maxHeight: new UntypedFormControl(),
  });

  ngOnInit(): void {
    this.stateForm.valueChanges.subscribe((val) => {
      this.configChanged.emit(val);
    });
  }
}
