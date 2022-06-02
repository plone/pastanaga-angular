import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldConfigFormControlDirective } from '../../common-doc/form-field-config-form-control.directive';

@Component({
    selector: 'pa-demo-date-picker-form-control-example',
    templateUrl: './date-picker-form-control-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerFormControlExampleComponent extends FormFieldConfigFormControlDirective {
    override updateConfig(config: any) {
        super.updateConfig(config);
        this.config = config;
    }
}
