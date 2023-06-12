import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldConfigStandaloneDirective } from '../../common-doc/form-field-config-standalone.directive';

@Component({
  selector: 'pa-demo-date-picker-standalone-example',
  templateUrl: './date-picker-standalone-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerStandaloneExampleComponent extends FormFieldConfigStandaloneDirective {
  override updateConfig(config: any) {
    super.updateConfig(config);
    this.config = config;
  }
}
