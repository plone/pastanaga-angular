import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IErrorMessages } from '@guillotinaweb/pastanaga-angular';
import { FormControl, FormGroup } from '@angular/forms';

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

    stateForm = new FormGroup({
        label: new FormControl(),
        disabled: new FormControl(),
        readonly: new FormControl(),
        errorMessage: new FormControl(),
    });

    ngOnInit(): void {
        this.stateForm.valueChanges.subscribe((val) => {
            this.configChanged.emit(val);
        });
    }
}
