import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {
    IErrorMessages,
    TextInputType,
    UpdateOnStrategy,
} from '../../../../../../pastanaga-angular/src/lib/controls/form-field.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    templateUrl: './input-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPageComponent implements OnInit, OnDestroy {
    selectedTab = 'standalone';
    id?: string;
    name?: string;
    type: TextInputType = 'text';
    help?: string;
    disabled = false;
    value: any;
    valueChange?: any;
    debouncedValueChange?: any;
    keyupEvent?: any;
    enterEvent?: any;
    blurEvent?: any;
    focusEvent?: any;
    describedBy?: string;
    readonly = false;
    hasFocus = false;
    showAllErrors = true;
    errorMessages?: IErrorMessages;
    errorMessage?: string;
    updateOn?: UpdateOnStrategy;
    placeholder?: string;
    required = false;
    pattern?: string | RegExp;
    min?: number;
    max?: number;
    maxlength?: number;
    noAutoComplete = false;
    acceptHtmlTags = true;
    debounceDuration?: number;

    ngModelChangeEvent?: any;
    formControl = new FormControl();
    formControlValueChangeEvent?: any;
    formControlStatusChangeEvent?: any;

    formGroup = new FormGroup({
        text: new FormControl(),
    });

    formGroupValueChangeEvent?: any;
    formGroupStatusChangeEvent?: any;
    terminator: Subject<void> = new Subject<void>();

    standaloneBasicCode = `<pa-input [value]="value" (valueChange)="doSomething($event)">Label</pa-input>`;
    standaloneFullCode = `<pa-input
    [value]="value"

    [id]="id"
    [name]="name"
    [type]="type"
    [help]="help"
    [describedBy]="describedBy"
    [disabled]="disabled"
    [readonly]="readonly"
    [hasFocus]="hasFocus"

    [showAllErrors]="showAllErrors"
    [errorMessages]="errorMessages"
    [errorMessage]="errorMessage"
    [updateOn]="updateOn"
    [placeholder]="placeholder"
    [required]="required"
    [pattern]="pattern"
    [min]="min"
    [max]="max"
    [maxlength]="maxlength"
    [noAutoComplete]="noAutoComplete"
    [acceptHtmlTags]="acceptHtmlTags"
    [debounceDuration]="debounceDuration"

    (valueChange)="valueChange = $event"
    (debouncedValueChange)="debouncedValueChange = $event"
    (keyUp)="keyupEvent = $event"
    (enter)="enterEvent = $event"
    (blurring)="blurEvent = $event"
    (focusing)="focusEvent = $event"
>Label</pa-input>`;

    ngModelBasicCode = `<pa-input [(ngModel)]="value" (ngModelChange)="onModelChange()">Label</pa-input>`;
    ngModelValidationCode = `<pa-input [(ngModel)]="value"
    type="email"
    name="myEmail"
    email
    [pattern]="'.?test.?'"
    (ngModelChange)="onModelChange()"
>Label</pa-input>`;

    ngModelFullCode = `<pa-input
    [(ngModel)]="value"

    [id]="id"
    [name]="name"
    [type]="type"
    [help]="help"
    [describedBy]="describedBy"
    [disabled]="disabled"
    [readonly]="readonly"
    [hasFocus]="hasFocus"

    [showAllErrors]="showAllErrors"
    [errorMessages]="errorMessages"
    [errorMessage]="errorMessage"
    [placeholder]="placeholder"
    [required]="required"
    [pattern]="pattern"
    [min]="min"
    [max]="max"
    [maxlength]="maxlength"
    [noAutoComplete]="noAutoComplete"
    [acceptHtmlTags]="acceptHtmlTags"
    [debounceDuration]="debounceDuration"

    (valueChange)="valueChange = $event"
    (debouncedValueChange)="debouncedValueChange = $event"
    (keyUp)="keyupEvent = $event"
    (enter)="enterEvent = $event"
    (blurring)="blurEvent = $event"
    (focusing)="focusEvent = $event"
    (ngModelChange)="onModelChange()"
>Label</pa-input>`;

    formControlBasicCode = `<pa-input [formControl]="formControl">Label</pa-input>`;

    formControlValidationCodeTs = `formControl = new FormControl(null, [customValidator, Validators.email])`;
    formControlValidationCodeHtml = `<pa-input
    type="email"
    [formControl]="formControl"
    [required]="required"
>Label</pa-input>`;

    formControlFullCode = `<pa-input
    [formControl]="formControl"

    [id]="id"
    [name]="name"
    [type]="type"
    [help]="help"
    [describedBy]="describedBy"
    [readonly]="readonly"
    [hasFocus]="hasFocus"

    [showAllErrors]="showAllErrors"
    [errorMessages]="errorMessages"
    [errorMessage]="errorMessage"
    [placeholder]="placeholder"
    [required]="required"
    [pattern]="pattern"
    [min]="min"
    [max]="max"
    [maxlength]="maxlength"
    [noAutoComplete]="noAutoComplete"
    [acceptHtmlTags]="acceptHtmlTags"
    [debounceDuration]="debounceDuration"

    (valueChange)="valueChange = $event"
    (debouncedValueChange)="debouncedValueChange = $event"
    (keyUp)="keyupEvent = $event"
    (enter)="enterEvent = $event"
    (blurring)="blurEvent = $event"
    (focusing)="focusEvent = $event"
>Label</pa-input>`;

    formControlNameBasicCode = `<form [formGroup]="formGroup">
    <pa-input formControlName="text">Label</pa-input>
</form>`;

    formControlNameValidationCodeTs = `formGroup = new FormGroup({
        text: new FormControl(null, [customValidator, Validators.email]),
    });`;
    formControlNameValidationCodeHtml = `<form [formGroup]="formGroup">
    <pa-input
        formControlName="text"
        type="email"
        [required]="required"
        [pattern]="pattern"
    >Label
    </pa-input>
</form>`;

    formControlNameFullCode = `<form [formGroup]="formGroup">
    <pa-input
        formControlName="text"
        [id]="id"
        [name]="name"
        [type]="type"
        [help]="help"
        [describedBy]="describedBy"
        [readonly]="readonly"
        [hasFocus]="hasFocus"

        [showAllErrors]="showAllErrors"
        [errorMessages]="errorMessages"
        [errorMessage]="errorMessage"
        [placeholder]="placeholder"
        [required]="required"
        [pattern]="pattern"
        [min]="min"
        [max]="max"
        [maxlength]="maxlength"
        [noAutoComplete]="noAutoComplete"
        [acceptHtmlTags]="acceptHtmlTags"
        [debounceDuration]="debounceDuration"

        (valueChange)="valueChange = $event"
        (debouncedValueChange)="debouncedValueChange = $event"
        (keyUp)="keyupEvent = $event"
        (enter)="enterEvent = $event"
        (blurring)="blurEvent = $event"
        (focusing)="focusEvent = $event"
    >Label
    </pa-input>
</form>`;

    ngOnInit() {
        this.formControl.valueChanges.pipe(takeUntil(this.terminator)).subscribe((value) => {
            this.formControlValueChangeEvent = value;
        });
        this.formControl.statusChanges.pipe(takeUntil(this.terminator)).subscribe((status) => {
            this.formControlStatusChangeEvent = status;
        });
        this.formGroup.valueChanges.pipe(takeUntil(this.terminator)).subscribe((value) => {
            this.formGroupValueChangeEvent = value;
        });
        this.formGroup.statusChanges.pipe(takeUntil(this.terminator)).subscribe((status) => {
            this.formGroupStatusChangeEvent = status;
        });
    }

    ngOnDestroy() {
        this.terminator.next();
        this.terminator.complete();
    }

    changeValue() {
        let val;
        if (!!this.value) {
            val = null;
        } else if (!!this.type && this.type === 'number') {
            val = 7;
        } else {
            val = 'applied text';
        }
        this.value = val || undefined;
        this.formControl.patchValue(val);
        this.formGroup.get('text')?.patchValue(val);
    }

    changePlaceholder() {
        this.placeholder = !!this.placeholder ? undefined : 'A placeholder';
    }

    changeId() {
        this.id = !!this.id ? undefined : 'id';
    }

    changeName() {
        this.name = !!this.name ? undefined : 'name';
    }

    changeType() {
        this.type = this.type === 'text' ? 'number' : 'text';
    }

    changeHelp() {
        this.help = !!this.help ? undefined : 'the provided help message';
    }

    changeDisable() {
        this.disabled = !this.disabled;
        if (this.disabled) {
            this.formControl.disable();
            this.formGroup.get('text')?.disable();
        } else {
            this.formControl.enable();
            this.formGroup.get('text')?.enable();
        }
    }

    changeDescribedBy() {
        this.describedBy = !!this.describedBy ? undefined : 'other-element-describing-input';
    }

    changeReadonly() {
        this.readonly = !this.readonly;
    }

    changeFocus() {
        this.hasFocus = !this.hasFocus;
    }

    changeShowAllErrors() {
        this.showAllErrors = !this.showAllErrors;
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

    changeErrorMessage() {
        this.errorMessage = !!this.errorMessage ? undefined : 'External error message';
    }

    changeUpdateOn() {
        this.updateOn = this.updateOn === 'change' ? 'blur' : 'change';
    }

    changeRequired() {
        this.required = !this.required;
    }

    changePattern() {
        this.pattern = !!this.pattern ? undefined : new RegExp('.?test.?');
    }

    changeMin() {
        this.min = !!this.min ? undefined : 3;
    }

    changeMax() {
        this.max = !!this.max ? undefined : 5;
    }

    changeMaxlength() {
        this.maxlength = !!this.maxlength ? undefined : 2;
    }

    changeNoAutoComplete() {
        this.noAutoComplete = !this.noAutoComplete;
    }

    changeAcceptHtmlTags() {
        this.acceptHtmlTags = !this.acceptHtmlTags;
    }

    changeDebounceDuration() {
        this.debounceDuration = !!this.debounceDuration ? undefined : 100;
    }

    onModelChange() {
        this.ngModelChangeEvent = this.value;
    }
}
