import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'pa-demo-native-text-field-page',
    templateUrl: './native-text-field-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NativeTextFieldPageComponent implements OnInit {
    formControl = new FormControl();
    required?: any;
    maxlength?: any;
    noAutoComplete?: any;
    help?: any;
    errorMessages?: any;
    showAllErrors?: any;
    placeholder?: any;
    hasFocus?: any;
    acceptHtmlTags?: any;

    keyupEvent?: any;
    enterEvent?: any;
    focusEvent?: any;
    blurEvent?: any;
    valueEvent?: any;
    statusEvent?: any;

    config = new FormGroup({
        placeholder: new FormControl(),
        required: new FormControl(),
        maxlength: new FormControl(),
        noAutoComplete: new FormControl(),
        help: new FormControl(),
        errorMessages: new FormControl(),
        showAllErrors: new FormControl(),
        hasFocus: new FormControl(),
        acceptHtmlTags: new FormControl(),
    });

    constructor() {}

    ngOnInit(): void {}
}
