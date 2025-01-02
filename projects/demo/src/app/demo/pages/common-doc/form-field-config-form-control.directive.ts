import { Directive } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Directive({
  selector: '[paDemoFormFieldConfigFormControl]',
  standalone: false,
})
export class FormFieldConfigFormControlDirective {
  control = new UntypedFormControl();

  valueChangeEvent?: any;
  statusChangeEvent?: any;
  config?: any = {};
  updateConfig(config: any) {
    if (config.value !== this.config.value && (!!config.value || !!this.config.value)) {
      this.control.patchValue(config.value);
    }
    if (config.disabled && !this.control.disabled) {
      this.control.disable();
    } else if (!config.disabled && this.control.disabled) {
      this.control.enable();
    }
    this.config = config;
  }
}
