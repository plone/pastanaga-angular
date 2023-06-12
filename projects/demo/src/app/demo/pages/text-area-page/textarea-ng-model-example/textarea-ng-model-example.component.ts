import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormFieldConfigNgModelDirective } from '../../common-doc/form-field-config-ng-model.directive';

@Component({
  selector: 'pa-demo-textarea-ng-model-example',
  templateUrl: './textarea-ng-model-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaNgModelExampleComponent extends FormFieldConfigNgModelDirective {
  keyupEvent?: any;
  enterEvent?: any;
  blurEvent?: any;
  focusEvent?: any;

  constructor(protected override cdr: ChangeDetectorRef) {
    super(cdr);
  }

  override updateConfig(config: any) {
    super.updateConfig(config);
    this.config = config;
  }
}
