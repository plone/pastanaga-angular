import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'pa-demo-native-text-field-page',
  templateUrl: './native-text-field-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NativeTextFieldPageComponent {
  formControl = new UntypedFormControl();
  required?: any;
  maxlength?: any;
  noAutoComplete?: any;
  help?: any;
  errorMessages?: any;
  showAllErrors?: any;
  placeholder?: any;
  hasFocus?: any;
  acceptHtmlTags?: any;

  keyupEvent?: any;
  enterEvent?: any;
  focusEvent?: any;
  blurEvent?: any;
  statusEvent?: any;

  config = new UntypedFormGroup({
    placeholder: new UntypedFormControl(),
    maxlength: new UntypedFormControl(),
    noAutoComplete: new UntypedFormControl(),
    help: new UntypedFormControl(),
    errorMessages: new UntypedFormControl(),
    showAllErrors: new UntypedFormControl(),
    hasFocus: new UntypedFormControl(),
    acceptHtmlTags: new UntypedFormControl(),
  });
}
