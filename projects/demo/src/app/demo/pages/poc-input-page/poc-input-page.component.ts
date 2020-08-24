import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'pa-demo-poc-input',
    templateUrl: './poc-input-page.component.html',
    styleUrls: ['./poc-input-page.component.scss'],
})
export class PocInputPageComponent {
    // configuration
    readonly = false;
    disabled = false;
    noAutoComplete = false;
    required = false;
    maxLength?: number;
    min?: number;
    max?: number;
    regex?: RegExp;
    customErrorMessage?: string;
    errorMessages?: any;

    focused = '';

    // values
    valueText = '';
    valueNumber?: number;
    ngModelText?: string;
    templateDriven = {
        text: undefined,
        number: undefined,
    };
    // TODO add custom Validators like modulo on number and length is pair on text
    form = new FormGroup({
        text: new FormControl(),
        number: new FormControl(),
    });

    // received values
    _standaloneTextChanged?: any;
    _standaloneDebouncedTextChanged?: any;
    _standaloneTextKeyUp?: any;
    _standaloneTextEnter?: any;
    _standaloneTextBlur?: any;
    _standaloneTextFocus?: any;

    _standaloneNumberChanged?: any;
    _standaloneNumberDebouncedChange?: any;
    _standaloneNumberKeyUp?: any;
    _standaloneNumberEnter?: any;
    _standaloneNumberBlur?: any;
    _standaloneNumberFocus?: any;

    _ngModelChanged?: any;
    _ngModelDebouncedChange?: any;
    _ngModelKeyUp?: any;
    _ngModelEnter?: any;
    _ngModelBlur?: any;
    _ngModelFocus?: any;

    _templateTextChanged?: any;
    _templateTextDebouncedChange?: any;
    _templateTextKeyUp?: any;
    _templateTextEnter?: any;
    _templateTextBlur?: any;
    _templateTextFocus?: any;

    _templateNumberChanged?: any;
    _templateNumberDebouncedChange?: any;
    _templateNumberKeyUp?: any;
    _templateNumberEnter?: any;
    _templateNumberBlur?: any;
    _templateNumberFocus?: any;

    _reactiveTextChanged?: any;
    _reactiveTextDebouncedChange?: any;
    _reactiveTextKeyUp?: any;
    _reactiveTextEnter?: any;
    _reactiveTextBlur?: any;
    _reactiveTextFocus?: any;

    _reactiveNumberChanged?: any;
    _reactiveNumberDebouncedChange?: any;
    _reactiveNumberKeyUp?: any;
    _reactiveNumberEnter?: any;
    _reactiveNumberBlur?: any;
    _reactiveNumberFocus?: any;

    // Controls
    toggleMaxLength() {
        if (!!this.maxLength) {
            this.maxLength = undefined;
        } else {
            this.maxLength = 10;
        }
    }
    toggleMin() {
        if (!!this.min) {
            this.min = undefined;
        } else {
            this.min = 10;
        }
    }
    toggleMax() {
        if (!!this.max) {
            this.max = undefined;
        } else {
            this.max = 20;
        }
    }
    toggleRegexPattern() {
        if (!!this.regex) {
            this.regex = undefined;
        } else {
            this.regex = new RegExp('.?bla.?');
        }
    }
    toggleErrorMessages() {
        if (!!this.errorMessages) {
            this.errorMessages = undefined;
        } else {
            this.errorMessages = {
                required: 'this filed is required',
                pattern: 'this field is not valid',
                min: 'value is too low',
                max: 'value is too high',
            };
        }
    }
    toggleCustomErrorMessage() {
        if (!!this.customErrorMessage) {
            this.customErrorMessage = undefined;
        } else {
            this.customErrorMessage = 'external error message';
        }
    }

    // event check
    onStandaloneTextChange(event: any) {
        this._standaloneTextChanged = event;
    }
    onDebouncedStandaloneTextChange(event: any) {
        this._standaloneDebouncedTextChanged = event;
    }
    onStandaloneTextKeyUp(event: any) {
        this._standaloneTextKeyUp = event;
    }
    onStandaloneTextEnter(event: any) {
        this._standaloneTextEnter = `${event.event} / ${event.value}`;
    }
    onStandaloneTextBlur(event: any) {
        this._standaloneTextBlur = event;
    }
    onStandaloneTextFocus(event: any) {
        this._standaloneTextFocus = event;
    }

    onStandaloneNumberChange(event: any) {
        this._standaloneNumberChanged = event;
    }
    onStandaloneNumberDebouncedChange(event: any) {
        this._standaloneNumberDebouncedChange = event;
    }
    onStandaloneNumberKeyUp(event: any) {
        this._standaloneNumberKeyUp = event;
    }
    onStandaloneNumberEnter(event: any) {
        this._standaloneNumberEnter = event;
    }
    onStandaloneNumberBlur(event: any) {
        this._standaloneNumberBlur = event;
    }
    onStandaloneNumberFocus(event: any) {
        this._standaloneNumberFocus = event;
    }

    onNgModelChange(event: any) {
        this._ngModelChanged = event;
    }
    onNgModelDebouncedChange(event: any) {
        this._ngModelDebouncedChange = event;
    }
    onNgModelKeyUp(event: any) {
        this._ngModelKeyUp = event;
    }
    onNgModelEnter(event: any) {
        this._ngModelEnter = event;
    }
    onNgModelBlur(event: any) {
        this._ngModelBlur = event;
    }
    onNgModelFocus(event: any) {
        this._ngModelFocus = event;
    }

    onTemplateTextChange(event: any) {
        this._templateTextChanged = event;
    }
    onTemplateTextDebouncedChange(event: any) {
        this._templateTextDebouncedChange = event;
    }
    onTemplateTextKeyUp(event: any) {
        this._templateTextKeyUp = event;
    }
    onTemplateTextEnter(event: any) {
        this._templateTextEnter = event;
    }
    onTemplateTextBlur(event: any) {
        this._templateTextBlur = event;
    }
    onTemplateTextFocus(event: any) {
        this._templateTextFocus = event;
    }

    onTemplateNumberChange(event: any) {
        this._templateNumberChanged = event;
    }
    onTemplateNumberDebouncedChange(event: any) {
        this._templateNumberDebouncedChange = event;
    }
    onTemplateNumberKeyUp(event: any) {
        this._templateNumberKeyUp = event;
    }
    onTemplateNumberEnter(event: any) {
        this._templateNumberEnter = event;
    }
    onTemplateNumberBlur(event: any) {
        this._templateNumberBlur = event;
    }
    onTemplateNumberFocus(event: any) {
        this._templateNumberFocus = event;
    }

    onReactiveTextChange(event: any) {
        this._reactiveTextChanged = event;
    }
    onReactiveTextDebouncedChange(event: any) {
        this._reactiveTextDebouncedChange = event;
    }
    onReactiveTextKeyUp(event: any) {
        this._reactiveTextKeyUp = event;
    }
    onReactiveTextEnter(event: any) {
        this._reactiveTextEnter = event;
    }
    onReactiveTextBlur(event: any) {
        this._reactiveTextBlur = event;
    }
    onReactiveTextFocus(event: any) {
        this._reactiveTextFocus = event;
    }

    onReactiveNumberChange(event: any) {
        this._reactiveNumberChanged = event;
    }
    onReactiveNumberDebouncedChange(event: any) {
        this._reactiveNumberDebouncedChange = event;
    }
    onReactiveNumberKeyUp(event: any) {
        this._reactiveNumberKeyUp = event;
    }
    onReactiveNumberEnter(event: any) {
        this._reactiveNumberEnter = event;
    }
    onReactiveNumberBlur(event: any) {
        this._reactiveNumberBlur = event;
    }
    onReactiveNumberFocus(event: any) {
        this._reactiveNumberFocus = event;
    }

    submitTemplateDriven() {
        console.log('submitting', this.templateDriven);
    }

    submitReactive() {
        console.log('reactive', this.form.value);
    }
}
