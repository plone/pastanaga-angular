import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IErrorMessages } from '../../../../../../../pastanaga-angular/src';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'pa-demo-pa-input-config',
    templateUrl: './pa-input-config.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaInputConfigComponent implements OnInit {
    @Output() configChanged = new EventEmitter();

    errorMessages: IErrorMessages = {
        required: 'This field is required.',
        pattern: 'This field is not matching regex .?test.?.',
        min: 'Value is too low.',
        max: 'Value is too high.',
        email: 'Invalid email.',
        maxlength: 'Too many chars.',
    };
    pattern = new RegExp('.?test.?');

    stateForm = new FormGroup({
        value: new FormControl(),
        type: new FormControl(),
        placeholder: new FormControl(),
        autoCapitalize: new FormControl(),
        preventAutocomplete: new FormControl(),
        acceptHtml: new FormControl(),
        disabled: new FormControl(),
        readonly: new FormControl(),
        hasFocus: new FormControl(),
        help: new FormControl(),
        errorMessage: new FormControl(),
        errorMessages: new FormControl(),
        showAllErrors: new FormControl(),
        required: new FormControl(),
        pattern: new FormControl(),
        min: new FormControl(),
        max: new FormControl(),
        maxlength: new FormControl(),
    });

    ngOnInit(): void {
        this.stateForm.valueChanges.subscribe((val) => {
            this.configChanged.emit(val);
        });
    }
}
