import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '../../../../../../../pastanaga-angular/src';
import { FormFieldConfigNgModelDirective } from '../../common-doc/form-field-config-ng-model.directive';

@Component({
    selector: 'pa-demo-select-ng-model-example',
    templateUrl: './select-ng-model-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectNgModelExampleComponent extends FormFieldConfigNgModelDirective {
    @Input() dropdownContent: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];
    config?: any = { optionsProvidedInTemplate: true, label: 'The label' };

    expandedEvent?: any;

    options?: (OptionModel | OptionSeparator | OptionHeaderModel)[];

    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    updateConfig(config: any) {
        super.updateConfig(config);
        if (config.optionsProvidedInTemplate !== this.config.optionsProvidedInTemplate) {
            this.options = config.optionsProvidedInTemplate ? undefined : this.dropdownContent;
        }

        this.config = config;
    }
}
