import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '../../../../../../../pastanaga-angular/src';

@Component({
    selector: 'pa-demo-select-standalone-example',
    templateUrl: './select-standalone-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectStandaloneExampleComponent {
    @Input() dropdownContent: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];
    value?: any;
    config?: any = { optionsProvidedInTemplate: true, label: 'The label' };

    valueChangeEvent?: any;
    statusChangeEvent?: any;
    expandedEvent?: any;

    options?: (OptionModel | OptionSeparator | OptionHeaderModel)[];

    updateConfig(config: any) {
        if (config.value !== this.config.value && (!!config.value || !!this.config.value)) {
            this.value = config.value;
        }
        if (config.optionsProvidedInTemplate !== this.config.optionsProvidedInTemplate) {
            this.options = config.optionsProvidedInTemplate ? undefined : this.dropdownContent;
        }

        this.config = config;
    }
}
