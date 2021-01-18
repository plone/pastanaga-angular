import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '../../../../../../../pastanaga-angular/src';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'pa-demo-select-form-group-example',
    templateUrl: './select-form-group-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFormGroupExampleComponent {
    @Input() dropdownContent: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];
    form = new FormGroup({
        control: new FormControl(),
    });
    config?: any = { optionsProvidedInTemplate: true, label: 'The label' };

    valueChangeEvent?: any;
    statusChangeEvent?: any;
    expandedEvent?: any;

    options?: (OptionModel | OptionSeparator | OptionHeaderModel)[];

    get formControl() {
        return this.form.get('control') as FormControl;
    }

    updateConfig(config: any) {
        if (config.value !== this.config.value && (!!config.value || !!this.config.value)) {
            this.form.patchValue({ control: config.value });
        }
        if (config.optionsProvidedInTemplate !== this.config.optionsProvidedInTemplate) {
            this.options = config.optionsProvidedInTemplate ? undefined : this.dropdownContent;
        }
        if (config.disabled && !this.formControl.disabled) {
            this.formControl.disable();
        } else if (!config.disabled && this.formControl.disabled) {
            this.formControl.enable();
        }
        this.config = config;
    }
}
