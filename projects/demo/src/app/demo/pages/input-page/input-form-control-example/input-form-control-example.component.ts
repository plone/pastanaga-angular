import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldConfigFormControlDirective } from '../../common-doc/form-field-config-form-control.directive';

@Component({
  selector: 'pa-demo-input-form-control-example',
  templateUrl: './input-form-control-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class InputFormControlExampleComponent extends FormFieldConfigFormControlDirective {
  keyupEvent?: any;
  enterEvent?: any;
  blurEvent?: any;
  focusEvent?: any;

  override updateConfig(config: any) {
    super.updateConfig(config);
    this.config = config;
  }
}
