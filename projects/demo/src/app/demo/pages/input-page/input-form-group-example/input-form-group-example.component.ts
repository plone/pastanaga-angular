import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'pa-demo-input-form-group-example',
    templateUrl: './input-form-group-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFormGroupExampleComponent {
    form = new FormGroup({
        control: new FormControl(),
    });

    updateChangeEvent?: any;
    updateStatusEvent?: any;
    keyupEvent?: any;
    enterEvent?: any;
    blurEvent?: any;
    focusEvent?: any;

    config?: any = {};

    get formControl() {
        return this.form.get('control') as FormControl;
    }

    updateConfig(config: any) {
        if (config.value !== this.config.value) {
            this.form.patchValue({ control: config.value });
        }
        if (config.disabled && !this.formControl.disabled) {
            this.formControl.disable();
        } else if (!config.disabled && this.formControl.disabled) {
            this.formControl.enable();
        }
        this.config = config;
    }
}
