import { Directive } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Directive({
    selector: '[paDemoFormFieldConfigFormGroup]',
})
export class FormFieldConfigFormGroupDirective {
    form = new UntypedFormGroup({
        control: new UntypedFormControl(),
    });

    valueChangeEvent?: any;
    statusChangeEvent?: any;
    config?: any = {};

    get formControl() {
        return this.form.get('control') as UntypedFormControl;
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
