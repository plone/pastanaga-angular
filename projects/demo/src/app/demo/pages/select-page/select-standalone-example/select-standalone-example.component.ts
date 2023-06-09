import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '@guillotinaweb/pastanaga-angular';
import { FormFieldConfigStandaloneDirective } from '../../common-doc/form-field-config-standalone.directive';

@Component({
  selector: 'pa-demo-select-standalone-example',
  templateUrl: './select-standalone-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectStandaloneExampleComponent extends FormFieldConfigStandaloneDirective {
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
