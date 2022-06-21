import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IErrorMessages } from '@guillotinaweb/pastanaga-angular';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'pa-demo-date-picker-config',
    templateUrl: './date-picker-config.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerConfigComponent implements OnInit {
    @Output() configChanged = new EventEmitter();

    errorMessages: IErrorMessages = {
        required: 'This field is required.',
    };
    pattern = /.?test.?/;

    stateForm = new UntypedFormGroup({
        label: new UntypedFormControl(),
        disabled: new UntypedFormControl(),
        readonly: new UntypedFormControl(),
        errorMessage: new UntypedFormControl(),
    });

    ngOnInit(): void {
        this.stateForm.valueChanges.subscribe((val) => {
            this.configChanged.emit(val);
        });
    }
}
