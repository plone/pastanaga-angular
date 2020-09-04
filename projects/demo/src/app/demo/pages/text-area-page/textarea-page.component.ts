import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ErrorMessages } from '../../../../../../pastanaga-angular/src';

@Component({
    selector: 'app-text-area-page',
    templateUrl: './textarea-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaPageComponent {
    autoHeightState = false;
    disabledState = false;
    filledLongState = false;
    filledState = false;
    focusedState = false;
    readOnlyState = false;
    resizableState = true;
    value: string | undefined;

    shortText = 'A short text already filled';
    longText =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    errorMessages: ErrorMessages = new ErrorMessages({ required: 'Field required' });
    customError = '';

    tsExample = `errorMessages: ErrorMessages = new ErrorMessages({required: 'Field required'});`;
    htmlExample = `<form #demoForm="ngForm">
    <pa-deprecated-textarea
            id="demo"
            name="demo"
            ngModel
            placeholder="Placeholder"
            required
            [autoHeight]="autoHeightState"
            [hasFocus]="focusedState"
            [resizable]="resizableState"
            [disabled]="disabledState"
            [readonly]="readOnlyState"
            [errorMessages]="errorMessages"
            [errorMessage]="customError"
        >
            Label
    </pa-deprecated-textarea>
</form>`;

    externalValueChange(addText: boolean, text: string) {
        this.value = addText ? text : undefined;
    }

    toggleCustomErrorMessage() {
        if (!this.customError) {
            this.customError = 'Some error message from external validation';
        } else {
            this.customError = '';
        }
    }
}
