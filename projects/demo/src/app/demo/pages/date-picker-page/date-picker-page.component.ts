import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: 'date-picker-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerPageComponent {
    prefilledDate = new Date().toISOString();
    selectedTab: 'standalone' | 'ngModel' | 'formControl' | 'formControlName' = 'standalone';

    standaloneBasicCode = `<pa-date-picker [value]="value" (valueChange)="doSomething($event)"></pa-date-picker>`;
    standaloneFullCode = `<pa-date-picker
    [value]="value"

    [id]="id"
    [name]="name"
    [disabled]="disabled"
    [readonly]="readonly"

    [errorMessage]="errorMessage"

    (valueChange)="valueChange = $event"
    (statusChange)="statusChange = $event"
></pa-date-picker>`;

    ngModelBasicCode = `<pa-date-picker [(ngModel)]="value" (ngModelChange)="onModelChange()"></pa-date-picker>`;
    ngModelFullCode = `<pa-date-picker
    [(ngModel)]="value"

    [id]="id"
    [name]="name"
    [disabled]="disabled"
    [readonly]="readonly"

    [errorMessage]="errorMessage"

    (valueChange)="valueChange = $event"
    (ngModelChange)="onModelChange()"
></pa-date-picker>`;

    formControlBasicCode = `<pa-date-picker [formControl]="formControl"></pa-date-picker>`;

    formControlValidationCodeTs = `formControl = new FormControl(null, [customValidator, Validators.email])`;
    formControlValidationCodeHtml = `<pa-input
    type="email"
    [formControl]="formControl"
></pa-input>`;

    formControlFullCode = `<pa-date-picker
    [formControl]="formControl"

    [id]="id"
    [name]="name"
    [readonly]="readonly"

    [errorMessage]="errorMessage"

    (valueChange)="valueChange = $event"
></pa-date-picker>`;

    formControlNameBasicCode = `<form [formGroup]="formGroup">
    <pa-date-picker formControlName="text"></pa-date-picker>
</form>`;

    formControlNameFullCode = `<form [formGroup]="formGroup">
    <pa-date-picker
        formControlName="text"
        [id]="id"
        [name]="name"
        [readonly]="readonly"

        [errorMessage]="errorMessage"
        [maxlength]="maxlength"

        (valueChange)="valueChange = $event"
    ></pa-date-picker>
</form>`;
}
