import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '../../../../../../../pastanaga-angular/src';
import { FormFieldConfigStandaloneDirective } from '../../common-doc/form-field-config-standalone.directive';

@Component({
    selector: 'pa-demo-select-standalone-example',
    templateUrl: './select-standalone-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectStandaloneExampleComponent extends FormFieldConfigStandaloneDirective {
    @Input() dropdownContent: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];

    config?: any = { optionsProvidedInTemplate: true, label: 'The label' };

    expandedEvent?: any;

    options?: (OptionModel | OptionSeparator | OptionHeaderModel)[];

    updateConfig(config: any) {
        super.updateConfig(config);
        if (config.optionsProvidedInTemplate !== this.config.optionsProvidedInTemplate) {
            this.options = config.optionsProvidedInTemplate ? undefined : this.dropdownContent;
        }

        this.config = config;
    }
}