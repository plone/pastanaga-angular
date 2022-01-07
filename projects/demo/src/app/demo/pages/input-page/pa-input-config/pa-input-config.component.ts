import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IErrorMessages } from '@guillotinaweb/pastanaga-angular';
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
    pattern = /.?test.?/;

    stateForm = new FormGroup({
        icon: new FormControl(),
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
        maxlength: new FormControl(),
    });

    ngOnInit(): void {
        this.stateForm.valueChanges.subscribe((val) => {
            this.configChanged.emit(val);
        });
    }
}
