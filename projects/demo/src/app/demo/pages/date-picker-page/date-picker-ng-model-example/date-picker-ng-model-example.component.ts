import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormFieldConfigNgModelDirective } from '../../common-doc/form-field-config-ng-model.directive';

@Component({
  selector: 'pa-demo-date-picker-ng-model-example',
  templateUrl: './date-picker-ng-model-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DatePickerNgModelExampleComponent extends FormFieldConfigNgModelDirective {
  constructor(protected override cdr: ChangeDetectorRef) {
    super(cdr);
  }

  override updateConfig(config: any) {
    super.updateConfig(config);
    this.config = config;
  }
}
