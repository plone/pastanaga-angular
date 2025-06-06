import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldConfigFormGroupDirective } from '../../common-doc/form-field-config-form-group.directive';

@Component({
  selector: 'pa-demo-input-form-group-example',
  templateUrl: './input-form-group-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class InputFormGroupExampleComponent extends FormFieldConfigFormGroupDirective {
  keyupEvent?: any;
  enterEvent?: any;
  blurEvent?: any;
  focusEvent?: any;

  override updateConfig(config: any) {
    super.updateConfig(config);
    this.config = config;
  }
}
