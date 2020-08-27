import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'pa-demo-poc-input',
    templateUrl: './poc-input-page.component.html',
    styleUrls: ['./poc-input-page.component.scss'],
})
export class PocInputPageComponent {
    detailedDescription = false;
    seeCode = false;
    currentUseCase = 'A';
    currentFeatureGroup = 'A';

    useCaseAACode = `<pa-poc-input
    [value]="value"
    [help]="textHelp"
    [disabled]="disabled"
    (valueChange)="onTextValueChange($event)"
 ></pa-poc-input>`;

    idText?: string;
    nameText?: string;
    helpText?: string;
    disabled = false;
    valueText?: any;
    valueNumber?: any;
    receivedText?: any;
    receivedDebouncedText?: any;
    receivedKeyUpText?: any;
    receivedEnterText?: any;
    receivedBlurText?: any;
    receivedFocusText?: any;

    useCaseABCode = `<pa-poc-input
    [value]="value"
    [debounceDuration]="debounceDuration"
    [placeholder]="placeholder"
    [readonly]="readonly"
    (valueChange)="onTextValueChange($event)"
 ></pa-poc-input>`;

    debounceDuration?: any;
    placeholder?: any;
    readonly = false;

    useCaseACCode = `<pa-poc-input
    [value]="value"
    [errorMessage] = "errorMessage"
    [pattern] = "pattern"
    [required] = "required"
    [errorMessages]="errorMessages"
    (valueChange)="onTextValueChange($event)"
 ></pa-poc-input>`;

    pattern?: any;
    required = false;
    errorMessage?: any;
    errorMessages?: any;

    useCaseADCode = `<pa-poc-input
    [type]="type"
    [value]="value"
    [hasFocus] = "hasFocus"
    [noAutoComplete] = "noAutoComplete"
    (valueChange)="onTextValueChange($event)"
 ></pa-poc-input>`;

    type? = 'email';
    hasFocus = false;
    noAutoComplete = false;

    useCaseAECode = `<pa-poc-input
    type="number"
    [value]="value"
    [min]="min"
    [max]="max"
    [maxlength]="maxlength"
    (valueChange)="onTextValueChange($event)"
 ></pa-poc-input>`;

    min?: number;
    max?: number;
    maxlength?: number;

    useCaseBACode = `<pa-poc-input
    [(ngModel)]="value"
    [help]="textHelp"
    [disabled]="disabled"
 ></pa-poc-input>`;

    receivedNgModelChange?: any;
    useCaseBBCode = `<pa-poc-input
    [(ngModel)]="value"
    [debounceDuration]="debounceDuration"
    [placeholder]="placeholder"
    [readonly]="readonly"
 ></pa-poc-input>`;

    useCaseBCCode = `<pa-poc-input
    [(ngModel)]="value"
    [errorMessage] = "errorMessage"
    [pattern] = "pattern"
    [required] = "required"
    [errorMessages]="errorMessages"
 ></pa-poc-input>`;

    useCaseBDCode = `<pa-poc-input
    [type]="type"
    [(ngModel)]="value"
    [hasFocus] = "hasFocus"
    [noAutoComplete] = "noAutoComplete"
 ></pa-poc-input>`;

    useCaseBECode = `<pa-poc-input
    type="number"
    [(ngModel)]="value"
    [min]="min"
    [max]="max"
    [maxlength]="maxlength"
    (valueChange)="onTextValueChange($event)"
 ></pa-poc-input>`;

    useCaseBFCode = `<form #form="ngForm"
    (ngSubmit)="submitTemplateDriven()">
        <pa-poc-input
        type="email"
        name="name"
        [(ngModel)]="valueText"
        email
        [pattern]="pattern"
        [errorMessages]="errorMessages"
     ></pa-poc-input>
 </form>`;

    useCaseBGCode = `<pa-poc-input
    type="email"
    name="name"
    [(ngModel)]="valueText"
    email
    [pattern]="pattern"
    [errorMessages]="errorMessages"
 ></pa-poc-input>`;

    submitted?: any;

    submitTemplateDriven() {
        console.log('submitting', this.valueText);
        this.submitted = this.valueText;
    }

    reactive = new FormGroup({
        text: new FormControl(),
    });

    useCaseCACode = `
reactive = new FormGroup({
        text: new FormControl(),
    });

<form [formGroup]="reactive" (ngSubmit)="submitReactive()">
    <pa-poc-input
    formControlName="text"
    [help]="textHelp"
 ></pa-poc-input></form>`;

    useCaseCBCode = `
reactive = new FormGroup({
        text: new FormControl(),
    });

<form [formGroup]="reactive" (ngSubmit)="submitReactive()">
    <pa-poc-input
    formControlName="text"
    [debounceDuration]="debounceDuration"
    [placeholder]="placeholder"
    [readonly]="readonly"
 ></pa-poc-input></form>`;

    useCaseCCCode = `
reactive = new FormGroup({
        text: new FormControl(),
    });

<form [formGroup]="reactive" (ngSubmit)="submitReactive()">
    <pa-poc-input
    formControlName="text"
    [pattern]="pattern"
    [required]="required"
    [errorMessages]="errorMessages"
 ></pa-poc-input></form>`;

    useCaseCDCode = `
reactive = new FormGroup({
        text: new FormControl(),
    });

<form [formGroup]="reactive" (ngSubmit)="submitReactive()">
    <pa-poc-input
    formControlName="text"
    [hasFocus]="hasFocus"
    [noAutoComplete]="noAutoComplete"
 ></pa-poc-input></form>`;

    useCaseCECode = `
reactive = new FormGroup({
        text: new FormControl(),
        number: new FormControl(),
    });

<form [formGroup]="reactive" (ngSubmit)="submitReactive()">
    <pa-poc-input
    formControlName="text"
    [maxlength]="maxlength"
    ></pa-poc-input>
    <pa-poc-input
    type="number"
    formControlName="number"
    [min]="min"
    [max]="max"
    [maxlength]="maxlength"
    ></pa-poc-input>
 </form>`;

    reactive2 = new FormGroup({
        text: new FormControl(),
        number: new FormControl(),
    });

    useCaseCHCode = `
    form = new FormGroup({
        text: new FormControl(null, [Validators.required, Validators.email]),
    });
    <form [formGroup]="form" (ngSubmit)="submit()">
    <pa-poc-input
    formControlName="text"
    [errorMessage]="errorMessage"
    [errorMessages]="errorMessages"
 ></pa-poc-input></form>`;

    validated = new FormGroup({
        text: new FormControl('', [Validators.required, Validators.email]),
    });

    useCaseCICode = `
    form = new FormGroup({
        text: new FormControl(null, [Validators.required]),
    });
    <form [formGroup]="form" (ngSubmit)="submit()">
    <pa-poc-input
    type="email"
    email
    [pattern]="pattern"
    formControlName="text"
    [errorMessage]="errorMessage"
    [errorMessages]="errorMessages"
 ></pa-poc-input></form>`;

    mixedValidation = new FormGroup({
        text: new FormControl('', [Validators.required]),
    });

    useCaseCJCode = `
    form = new FormGroup({
        text: new FormControl(null, [Validators.required]),
    });
    changeValidators() {
    const control = this.form.contols['text];
    control.clearValidators();
    control.setValidators([Validators.required, Validators.email]);
    control.updateValueAndValidity();
    }
    <form [formGroup]="form" (ngSubmit)="submit()">
    <pa-poc-input
    type="email"
    [pattern]="pattern"
    formControlName="text"
    [errorMessage]="errorMessage"
    [errorMessages]="errorMessages"
 ></pa-poc-input></form>`;

    dynamicValidation = new FormGroup({
        text: new FormControl('', [Validators.required]),
    });
    has2Validation = false;

    changeDynnamicValidation() {
        const control = this.dynamicValidation.controls['text'];
        control.clearValidators();
        if (this.has2Validation) {
            control.setValidators([Validators.required]);
        } else {
            control.setValidators([Validators.required, Validators.email]);
        }
        control.updateValueAndValidity();
        this.has2Validation = !this.has2Validation;
        this.updateValidatorEvent = !this.updateValidatorEvent;
    }

    updateValidatorEvent?: boolean;

    changeValueText() {
        this.valueText = !!this.valueText ? undefined : 'defaultText';
    }

    changeIdText() {
        this.idText = !!this.idText ? undefined : 'idText';
    }

    changeNameText() {
        this.nameText = !!this.nameText ? undefined : 'nameText';
    }

    changeHelpText() {
        this.helpText = !!this.helpText ? undefined : 'This is the help';
    }

    changeDebounceDuration() {
        this.debounceDuration = !!this.debounceDuration ? undefined : 100;
    }

    changePlaceholder() {
        this.placeholder = !!this.placeholder ? undefined : 'The placeholder';
    }

    changeErrorMessage() {
        this.errorMessage = !!this.errorMessage ? undefined : 'Externally added error message';
    }

    changePattern() {
        this.pattern = !!this.pattern ? undefined : new RegExp('.?bla.?');
    }

    changeErrorMessages() {
        this.errorMessages = !!this.errorMessages
            ? undefined
            : {
                  required: 'this field is required',
                  pattern: 'this field is not matching regex',
                  min: 'value is too low',
                  max: 'value is too high',
                  email: 'invalid email',
                  maxlength: 'too many chars',
              };
    }

    changeMin() {
        this.min = !!this.min ? undefined : 1;
    }

    changeMax() {
        this.max = !!this.max ? undefined : 100;
    }

    changeMaxlength() {
        this.maxlength = !!this.maxlength ? undefined : 2;
    }

    changeValueNumber() {
        this.valueNumber = !!this.valueNumber ? undefined : 7;
    }

    setReactiveText() {
        const text = !!this.reactive.value.text ? null : 'defaultText';
        this.reactive.setValue({ text: text });
    }

    patchReactiveText() {
        const text = !!this.reactive.value.text ? null : 'defaultText';
        this.reactive.controls['text'].patchValue(text);
    }

    patchReactiveTextNoEvent() {
        const text = !!this.reactive.value.text ? null : 'defaultText';
        this.reactive.controls['text'].patchValue(text, { emitEvent: false });
    }

    toggleReactiveDisable() {
        if (this.reactive.disabled) {
            this.reactive.enable();
        } else {
            this.reactive.disable();
        }
    }

    submitReactive() {
        console.log('reactive', this.reactive.value);
        this.submitted = this.reactive.value;
    }

    resetReactive() {
        this.reactive.reset();
    }

    patchReactive2Text() {
        const text = !!this.reactive2.value.text ? null : 'defaultText';
        this.reactive2.controls['text'].patchValue(text);
    }

    patchReactive2Number() {
        const number = !!this.reactive2.value.number ? null : 300;
        this.reactive2.controls['number'].patchValue(number);
    }

    submitReactive2() {
        console.log('reactive', this.reactive2.value);
        this.submitted = this.reactive2.value;
    }

    submitValidated() {
        console.log('reactive', this.validated.value);
        this.submitted = this.validated.value;
    }

    setValidatedText() {
        const text = !!this.validated.value.text ? null : 'defaultText';
        this.validated.setValue({ text: text });
    }

    patchValidatedText() {
        const text = !!this.validated.value.text ? null : 'defaultText';
        this.validated.controls['text'].patchValue(text);
    }

    patchValidatedTextNoEvent() {
        const text = !!this.validated.value.text ? null : 'defaultText';
        this.validated.controls['text'].patchValue(text, { emitEvent: false });
    }

    resetValidated() {
        this.validated.reset();
    }

    submitMixedValidation() {
        console.log('reactive', this.mixedValidation.value);
        this.submitted = this.mixedValidation.value;
    }

    patchMixedValidationText() {
        const text = !!this.mixedValidation.value.text ? null : 'defaultText';
        this.mixedValidation.controls['text'].patchValue(text);
    }

    resetMixedValidation() {
        this.mixedValidation.reset();
    }

    submitDynamicValidation() {
        console.log('reactive', this.dynamicValidation.value);
        this.submitted = this.dynamicValidation.value;
    }

    patchDynamicValidationText() {
        const text = !!this.dynamicValidation.value.text ? null : 'defaultText';
        this.dynamicValidation.controls['text'].patchValue(text);
    }

    resetDynamicValidation() {
        this.dynamicValidation.reset();
    }
}
