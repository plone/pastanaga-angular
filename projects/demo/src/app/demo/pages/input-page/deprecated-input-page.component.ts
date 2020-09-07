import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ErrorMessages } from '../../../../../../pastanaga-angular/src';

@Component({
    templateUrl: './deprecated-input-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeprecatedInputPageComponent {
    disabledState = false;
    readOnlyState = false;
    errorMessages: ErrorMessages = new ErrorMessages({ required: 'Field required' });
    customError = '';
    tsExample = `errorMessages: ErrorMessages = new ErrorMessages({required: 'Field required'});`;
    htmlExample = `<form #demoForm="ngForm">
    <pa-deprecated-input required
              ngModel
              placeholder="Placeholder"
              id="demo"
              name="demo"
              [disabled]="disabledState"
              [readonly]="readOnlyState"
              [errorMessages]="errorMessages"
    >
        Label
    </pa-deprecated-input>
</form>`;

    toggleCustomErrorMessage() {
        if (!this.customError) {
            this.customError = 'Some error message from external validation';
        } else {
            this.customError = '';
        }
    }
}
