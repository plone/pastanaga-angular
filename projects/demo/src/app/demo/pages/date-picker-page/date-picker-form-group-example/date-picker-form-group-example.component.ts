import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldConfigFormGroupDirective } from '../../common-doc/form-field-config-form-group.directive';

@Component({
    selector: 'pa-demo-date-picker-form-group-example',
    templateUrl: './date-picker-form-group-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerFormGroupExampleComponent extends FormFieldConfigFormGroupDirective {
    override updateConfig(config: any) {
        super.updateConfig(config);
        this.config = config;
    }
}
