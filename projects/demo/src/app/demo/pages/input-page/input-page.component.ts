import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ErrorMessages } from '../../../../../../pastanaga-angular/src';

@Component({
    selector: 'pa-demo-input-page',
    templateUrl: './input-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPageComponent implements OnInit {
    disabledState = false;
    readOnlyState = false;
    errorMessages: ErrorMessages = new ErrorMessages({required: 'Field required'});
    customError = '';
    tsExample = `errorMessages: ErrorMessages = new ErrorMessages({required: 'Field required'});`;
    htmlExample = `<form #demoForm="ngForm">
    <pa-input required
              ngModel
              placeholder="Placeholder"
              id="demo"
              name="demo"
              [disabled]="disabledState"
              [readonly]="readOnlyState"
              [errorMessages]="errorMessages"
    >
        Label
    </pa-input>
</form>`;

    constructor() {
    }

    ngOnInit(): void {
    }

    toggleCustomErrorMessage() {
        if (!this.customError) {
            this.customError = 'Some error message from external validation';
        } else {
            this.customError = '';
        }
    }
}
