import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldConfigFormGroupDirective } from '../../common-doc/form-field-config-form-group.directive';

@Component({
    selector: 'pa-demo-textarea-form-group-example',
    templateUrl: './textarea-form-group-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaFormGroupExampleComponent extends FormFieldConfigFormGroupDirective {
    keyupEvent?: any;
    enterEvent?: any;
    blurEvent?: any;
    focusEvent?: any;

    updateConfig(config: any) {
        super.updateConfig(config);
        this.config = config;
    }
}
