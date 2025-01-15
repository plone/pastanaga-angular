import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '@guillotinaweb/pastanaga-angular';
import { FormFieldConfigNgModelDirective } from '../../common-doc/form-field-config-ng-model.directive';

@Component({
  selector: 'pa-demo-select-ng-model-example',
  templateUrl: './select-ng-model-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SelectNgModelExampleComponent extends FormFieldConfigNgModelDirective {
  @Input() dropdownContent: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];
  override config?: any = { optionsProvidedInTemplate: true, label: 'The label' };

  expandedEvent?: any;

  options: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];

  constructor(protected override cdr: ChangeDetectorRef) {
    super(cdr);
  }

  override updateConfig(config: any) {
    super.updateConfig(config);
    if (config.optionsProvidedInTemplate !== this.config.optionsProvidedInTemplate) {
      this.options = config.optionsProvidedInTemplate ? [] : this.dropdownContent;
    }

    this.config = config;
  }
}
