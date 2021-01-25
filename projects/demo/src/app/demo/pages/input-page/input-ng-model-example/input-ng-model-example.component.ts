import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormFieldConfigNgModelDirective } from '../../common-doc/form-field-config-ng-model.directive';

@Component({
    selector: 'pa-demo-input-ng-model-example',
    templateUrl: './input-ng-model-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNgModelExampleComponent extends FormFieldConfigNgModelDirective {
    keyupEvent?: any;
    enterEvent?: any;
    blurEvent?: any;
    focusEvent?: any;

    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    updateConfig(config: any) {
        super.updateConfig(config);
        this.config = config;
    }
}
