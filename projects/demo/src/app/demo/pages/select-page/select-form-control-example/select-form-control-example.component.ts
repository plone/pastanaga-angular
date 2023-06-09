import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '@guillotinaweb/pastanaga-angular';
import { FormFieldConfigFormControlDirective } from '../../common-doc/form-field-config-form-control.directive';

@Component({
  selector: 'pa-demo-select-form-control-example',
  templateUrl: './select-form-control-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFormControlExampleComponent extends FormFieldConfigFormControlDirective {
  @Input() dropdownContent: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];
  override config?: any = { optionsProvidedInTemplate: true, label: 'The label' };

  expandedEvent?: any;

  options: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];

  override updateConfig(config: any) {
    super.updateConfig(config);
    if (config.optionsProvidedInTemplate !== this.config.optionsProvidedInTemplate) {
      this.options = config.optionsProvidedInTemplate ? [] : this.dropdownContent;
    }
    this.config = config;
  }
}
