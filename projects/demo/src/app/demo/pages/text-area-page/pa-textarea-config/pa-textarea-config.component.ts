import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IErrorMessages } from '@guillotinaweb/pastanaga-angular';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'pa-demo-pa-textarea-config',
    templateUrl: './pa-textarea-config.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaTextareaConfigComponent implements OnInit {
    @Output() configChanged = new EventEmitter();

    errorMessages: IErrorMessages = {
        required: 'This field is required.',
        maxlength: 'Too many chars.',
    };
    shortText = 'A short text already filled';
    longText =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    stateForm = new FormGroup({
        value: new FormControl(),
        placeholder: new FormControl(),
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
        // display
        autoHeight: new FormControl(),
        rows: new FormControl(),
        resizable: new FormControl(),
        maxRows: new FormControl(),
        maxHeight: new FormControl(),
    });

    ngOnInit(): void {
        this.stateForm.valueChanges.subscribe((val) => {
            this.configChanged.emit(val);
        });
    }
}
