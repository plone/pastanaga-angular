import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldConfigFormControlDirective } from '../../common-doc/form-field-config-form-control.directive';

@Component({
  selector: 'pa-demo-textarea-form-control-example',
  templateUrl: './textarea-form-control-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaFormControlExampleComponent extends FormFieldConfigFormControlDirective {
  keyupEvent?: any;
  enterEvent?: any;
  blurEvent?: any;
  focusEvent?: any;

  override updateConfig(config: any) {
    super.updateConfig(config);
    this.config = config;
  }
}
