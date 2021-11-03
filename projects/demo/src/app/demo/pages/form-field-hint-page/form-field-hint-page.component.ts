import { Component } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { IErrorMessages } from '@guillotinaweb/pastanaga-angular';

@Component({
    templateUrl: './form-field-hint-page.component.html',
})
export class FormFieldHintPageComponent {
    readonly helpMessage = 'a hint displayed to user';
    help?: string;
    readonly validationErrors: ValidationErrors = {
        minLength: {
            actualLength: 2,
            requiredLength: 3,
        },
        required: true,
        customError: 'A custom error message',
    };
    errors: ValidationErrors | null = null;
    showErrors = true;
    showAllErrors = true;
    readonly fieldErrorMessages = {
        minLength: 'You should add more characters',
        required: 'This field is required',
    };
    errorMessages?: IErrorMessages;

    hasHelp = true;
    hasErrors = false;
    hasShowErrors = false;
    hasShowAllErrors = false;
    hasErrorMessages = false;

    code = `<pa-form-field-hint id="id"
                    [help]="help"
                    [errors]="errors"
                    [showErrors]="showErrors"
                    [showAllErrors]="showAllErrors"
                    [errorMessages]="errorMessages">
</pa-form-field-hint>`;

    toggleHelp() {
        this.help = this.hasHelp ? this.helpMessage : undefined;
    }

    toggleErrors() {
        this.errors = this.hasErrors ? this.validationErrors : null;
    }

    toggleErrorMessages() {
        this.errorMessages = this.hasErrorMessages ? this.fieldErrorMessages : undefined;
    }
}
