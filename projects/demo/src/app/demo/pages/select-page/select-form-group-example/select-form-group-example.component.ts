import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '@guillotinaweb/pastanaga-angular';
import { FormFieldConfigFormGroupDirective } from '../../common-doc/form-field-config-form-group.directive';

@Component({
  selector: 'pa-demo-select-form-group-example',
  templateUrl: './select-form-group-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SelectFormGroupExampleComponent extends FormFieldConfigFormGroupDirective {
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
