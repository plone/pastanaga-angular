import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    templateUrl: './checkbox-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxPageComponent implements OnInit {
    selectedTab = 'standalone';
    id?: string;
    name?: string;
    type?: 'checkbox' | 'radio' = 'checkbox';
    help?: string;
    ariaChecked?: boolean;
    disabled = false;
    model?: any;
    selectedChange?: any;

    ngModelChangeEvent?: any;
    formControl = new FormControl();
    formControlValueChangeEvent?: any;
    formGroupValueChangeEvent?: any;

    form: FormGroup = new FormGroup({
        checkbox: new FormControl(),
        radio: new FormControl(),
    });

    code = `<pa-checkbox [value]="value" [disabled]="disabled">Checkbox label</pa-checkbox>
<pa-checkbox type="radio"
             [value]="value" [disabled]="disabled">Radio label</pa-checkbox>`;

    ngOnInit() {
        this.formControl.valueChanges.subscribe((value) => {
            this.formControlValueChangeEvent = value;
        });

        this.form.valueChanges.subscribe((value) => {
            this.formGroupValueChangeEvent = value;
        });
    }

    disableForm(event: boolean) {
        this.disabled = event;

        if (event) {
            this.form.disable();
            this.formControl.disable();
        } else {
            this.form.enable();
            this.formControl.enable();
        }
    }

    onModelChange() {
        this.ngModelChangeEvent = this.model;
    }
}
