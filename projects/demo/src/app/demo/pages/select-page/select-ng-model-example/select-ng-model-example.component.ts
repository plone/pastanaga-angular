import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import {
    detectChanges,
    OptionHeaderModel,
    OptionModel,
    OptionSeparator,
} from '../../../../../../../pastanaga-angular/src';

@Component({
    selector: 'pa-demo-select-ng-model-example',
    templateUrl: './select-ng-model-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectNgModelExampleComponent {
    @Input() dropdownContent: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];
    model?: any;
    config?: any = { optionsProvidedInTemplate: true, label: 'The label' };

    valueChangeEvent?: any;
    statusChangeEvent?: any;
    expandedEvent?: any;
    ngModelChangeEvent?: any;

    options?: (OptionModel | OptionSeparator | OptionHeaderModel)[];

    constructor(private cdr: ChangeDetectorRef) {}

    updateConfig(config: any) {
        if (config.value !== this.config.value && (!!config.value || !!this.config.value)) {
            this.model = config.value;
            detectChanges(this.cdr);
        }
        if (config.optionsProvidedInTemplate !== this.config.optionsProvidedInTemplate) {
            this.options = config.optionsProvidedInTemplate ? undefined : this.dropdownContent;
        }

        this.config = config;
    }
}
