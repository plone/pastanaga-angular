import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IErrorMessages } from '@guillotinaweb/pastanaga-angular';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'pa-demo-pa-select-config',
    templateUrl: './pa-select-config.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaSelectConfigComponent implements OnInit {
    @Output() configChanged = new EventEmitter();

    errorMessages: IErrorMessages = {
        required: 'This field is required.',
    };

    stateForm = new FormGroup({
        optionsProvidedInTemplate: new FormControl(true),
        adjustHeight: new FormControl(),
        hasFocus: new FormControl(),
        dim: new FormControl(false),

        value: new FormControl(),
        label: new FormControl('The label'),
        placeholder: new FormControl(),
        readonly: new FormControl(),
        disabled: new FormControl(),

        help: new FormControl(),
        errorMessage: new FormControl(),
        errorMessages: new FormControl(),
        showAllErrors: new FormControl(),
    });

    ngOnInit(): void {
        this.stateForm.valueChanges.subscribe((val) => {
            this.configChanged.emit(val);
        });
    }
}
