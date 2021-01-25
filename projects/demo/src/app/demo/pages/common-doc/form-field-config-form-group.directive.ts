import { Directive } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Directive({
    selector: '[paDemoFormFieldConfigFormGroup]',
})
export class FormFieldConfigFormGroupDirective {
    form = new FormGroup({
        control: new FormControl(),
    });

    valueChangeEvent?: any;
    statusChangeEvent?: any;
    config?: any = {};

    get formControl() {
        return this.form.get('control') as FormControl;
    }
    updateConfig(config: any) {
        if (config.value !== this.config.value && (!!config.value || !!this.config.value)) {
            this.form.patchValue({ control: config.value });
        }
        if (config.disabled && !this.formControl.disabled) {
            this.formControl.disable();
        } else if (!config.disabled && this.formControl.disabled) {
            this.formControl.enable();
        }
    }
}
