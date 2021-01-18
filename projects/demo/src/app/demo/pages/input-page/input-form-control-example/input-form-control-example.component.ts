import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'pa-demo-input-form-control-example',
    templateUrl: './input-form-control-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFormControlExampleComponent {
    control = new FormControl();

    updateChangeEvent?: any;
    updateStatusEvent?: any;
    keyupEvent?: any;
    enterEvent?: any;
    blurEvent?: any;
    focusEvent?: any;

    config?: any = {};

    updateConfig(config: any) {
        if (config.value !== this.config.value) {
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
