import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldConfigStandaloneDirective } from '../../common-doc/form-field-config-standalone.directive';

@Component({
    selector: 'pa-demo-textarea-standalone-example',
    templateUrl: './textarea-standalone-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaStandaloneExampleComponent extends FormFieldConfigStandaloneDirective {
    keyupEvent?: any;
    enterEvent?: any;
    blurEvent?: any;
    focusEvent?: any;

    updateConfig(config: any) {
        super.updateConfig(config);
        this.config = config;
    }
}
