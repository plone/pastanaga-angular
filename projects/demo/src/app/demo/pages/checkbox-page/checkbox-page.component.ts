import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    templateUrl: './checkbox-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxPageComponent {

    form: FormGroup = new FormGroup({
       checkbox: new FormControl()
    });

    disabledState = false;
    code = `<pa-checkbox [disabled]="disabledState">Checkbox label</pa-checkbox>
<pa-checkbox type="radio"
             [disabled]="disabledState">Radio label</pa-checkbox>`;

    disableForm() {
        if (this.disabledState) {
            this.form.get('checkbox')?.disable();
        } else {
            this.form.get('checkbox')?.enable();
        }
    }
}
