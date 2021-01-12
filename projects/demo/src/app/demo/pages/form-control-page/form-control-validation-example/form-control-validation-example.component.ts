import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { PaFormControlDirective } from '../../../../../../../pastanaga-angular/src/lib/controls/form-field/pa-form-control.directive';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'pa-demo-form-control-validation-example',
    templateUrl: './form-control-validation-example.component.html',
    styleUrls: ['./form-control-validation-example.component.scss'],
})
export class FormControlValidationExampleComponent implements AfterViewInit {
    status?: any;
    firstControl?: FormControl;
    statusChangeCode = `<input paFormControl (statusChange)="status = $event">`;

    errorMessageCode = `<input paFormControl [errorMessage]="errorMessage">`;
    errorMessage?: any;
    errors?: any;

    model?: any;
    formControl = new FormControl('', [Validators.minLength(3)]);
    errorsNgModel?: any;
    mergingValidatorsCode = `<div paFormControl
    [(ngModel)]="model"
    email
    [errorMessage]="errorMessage">{{model}}</div>

formControl = new FormControl('', [Validators.minLength(3)]);

<input paFormControl
    [formControl]="formControl"
    [errorMessage]="errorMessage">`;
    @ViewChildren(PaFormControlDirective) directives?: QueryList<PaFormControlDirective>;

    constructor() {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (this.directives) {
                this.firstControl = this.directives.first.control;
                const secondControl = this.directives.toArray()[1].control;
                secondControl.markAsDirty();
                secondControl.statusChanges.subscribe(() => {
                    this.errors = secondControl.errors;
                });
                const thirdControl = this.directives.toArray()[2].control;
                thirdControl.markAsDirty();
                thirdControl.statusChanges.subscribe(() => {
                    this.errorsNgModel = thirdControl.errors;
                });
            }
        });
    }

    addError() {
        if (this.firstControl) {
            this.firstControl.invalid
                ? this.firstControl.setErrors(null)
                : this.firstControl.setErrors({ error: true });
        }
    }

    addCustomError() {
        if (!!this.errorMessage) {
            this.errorMessage = undefined;
        } else {
            this.errorMessage = 'A custom error message';
        }
    }
    patchInvalidModel() {
        this.directives?.toArray()[2].control.setValue('invalid');
    }
    patchValidModel() {
        this.directives?.toArray()[2].control.setValue('test@test.test');
    }
}
