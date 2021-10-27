import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { PaFormControlDirective } from '@guillotinaweb/pastanaga-angular';
import { FormControl } from '@angular/forms';

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
    errorsNgModel?: any;

    @ViewChildren(PaFormControlDirective) directives?: QueryList<PaFormControlDirective>;

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
}
