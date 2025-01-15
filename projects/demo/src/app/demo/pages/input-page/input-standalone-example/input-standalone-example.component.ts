import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldConfigStandaloneDirective } from '../../common-doc/form-field-config-standalone.directive';

@Component({
  selector: 'pa-demo-input-standalone-example',
  templateUrl: './input-standalone-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class InputStandaloneExampleComponent extends FormFieldConfigStandaloneDirective {
  keyupEvent?: any;
  enterEvent?: any;
  blurEvent?: any;
  focusEvent?: any;

  override updateConfig(config: any) {
    super.updateConfig(config);
    this.config = config;
  }
}
