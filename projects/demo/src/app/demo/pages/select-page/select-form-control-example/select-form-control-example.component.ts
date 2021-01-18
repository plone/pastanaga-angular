import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '../../../../../../../pastanaga-angular/src';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'pa-demo-select-form-control-example',
    templateUrl: './select-form-control-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFormControlExampleComponent {
    @Input() dropdownContent: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];
    control = new FormControl();
    config?: any = { optionsProvidedInTemplate: true, label: 'The label' };

    valueChangeEvent?: any;
    statusChangeEvent?: any;
    expandedEvent?: any;

    options?: (OptionModel | OptionSeparator | OptionHeaderModel)[];

    updateConfig(config: any) {
        if (config.value !== this.config.value && (!!config.value || !!this.config.value)) {
            this.control.patchValue(config.value);
        }
        if (config.optionsProvidedInTemplate !== this.config.optionsProvidedInTemplate) {
            this.options = config.optionsProvidedInTemplate ? undefined : this.dropdownContent;
        }
        if (config.disabled && !this.control.disabled) {
            this.control.disable();
        } else if (!config.disabled && this.control.disabled) {
            this.control.enable();
        }
        this.config = config;
    }
}
