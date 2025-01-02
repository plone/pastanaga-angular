import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './input-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class InputPageComponent {
  prefilledValue = 'I’m prefilled';
  model = '';
  someNumber = 100;
  selectedTab = 'standalone';

  getTypeOfSomeNumber() {
    return typeof this.someNumber;
  }

  standaloneBasicCode = `<pa-input [value]="value" (valueChange)="doSomething($event)">Label</pa-input>`;
  standaloneFullCode = `<pa-input
    [value]="value"

    [id]="id"
    [name]="name"
    [type]="type"
    [help]="help"
    [disabled]="disabled"
    [readonly]="readonly"
    [hasFocus]="hasFocus"

    [showAllErrors]="showAllErrors"
    [errorMessages]="errorMessages"
    [errorMessage]="errorMessage"
    [placeholder]="placeholder"
    [maxlength]="maxlength"
    [noAutoComplete]="noAutoComplete"
    [acceptHtmlTags]="acceptHtmlTags"

    (valueChange)="valueChange = $event"
    (statusChange)="statusChange = $event"
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
    [disabled]="disabled"
    [readonly]="readonly"
    [hasFocus]="hasFocus"

    [showAllErrors]="showAllErrors"
    [errorMessages]="errorMessages"
    [errorMessage]="errorMessage"
    [placeholder]="placeholder"
    [maxlength]="maxlength"
    [noAutoComplete]="noAutoComplete"
    [acceptHtmlTags]="acceptHtmlTags"

    (valueChange)="valueChange = $event"
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
>Label</pa-input>`;

  formControlFullCode = `<pa-input
    [formControl]="formControl"

    [id]="id"
    [name]="name"
    [type]="type"
    [help]="help"
    [readonly]="readonly"
    [hasFocus]="hasFocus"

    [showAllErrors]="showAllErrors"
    [errorMessages]="errorMessages"
    [errorMessage]="errorMessage"
    [placeholder]="placeholder"
    [maxlength]="maxlength"
    [noAutoComplete]="noAutoComplete"
    [acceptHtmlTags]="acceptHtmlTags"

    (valueChange)="valueChange = $event"
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
        [readonly]="readonly"
        [hasFocus]="hasFocus"

        [showAllErrors]="showAllErrors"
        [errorMessages]="errorMessages"
        [errorMessage]="errorMessage"
        [placeholder]="placeholder"
        [maxlength]="maxlength"
        [noAutoComplete]="noAutoComplete"
        [acceptHtmlTags]="acceptHtmlTags"

        (valueChange)="valueChange = $event"
        (keyUp)="keyupEvent = $event"
        (enter)="enterEvent = $event"
        (blurring)="blurEvent = $event"
        (focusing)="focusEvent = $event"
    >Label
    </pa-input>
</form>`;
}
