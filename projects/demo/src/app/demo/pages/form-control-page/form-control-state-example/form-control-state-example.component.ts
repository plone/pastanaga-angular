import { AfterViewInit, ChangeDetectorRef, Component, QueryList, ViewChildren } from '@angular/core';
import { PaFormControlDirective } from '../../../../../../../pastanaga-angular/src/lib/controls/form-field/pa-form-control.directive';
import { detectChanges } from '../../../../../../../pastanaga-angular/src';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'pa-demo-form-control-state-example',
    templateUrl: './form-control-state-example.component.html',
    styleUrls: ['./form-control-state-example.component.scss'],
})
export class FormControlStateExampleComponent implements AfterViewInit {
    disabled = false;
    readonly = false;
    model?: any;
    controlDisabled = false;
    modelDisabled = false;
    controlReadonly = false;
    modelReadonly = false;

    model2?: any;
    myFormControl = new FormControl();

    code = `<div paFormControl [disabled]="disabled" [readonly]="readonly"></div>
<div paFormControl
    [(ngModel)]="model">
    [disabled]="disabled"
    [readonly]="readonly"
</div>`;
    formStatusCode = `<div paFormControl></div>
<div paFormControl [(ngModel)]="model"></div>
<input paFormControl [formControl]="myFormControl">`;

    @ViewChildren(PaFormControlDirective) directives?: QueryList<PaFormControlDirective>;

    control2?: FormControl;
    control3?: FormControl;
    control4?: FormControl;
    constructor(private cdr: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (!!this.directives) {
                const array = this.directives.toArray();
                this.control2 = array[2].control;
                this.control3 = array[2].control;
                this.control4 = array[2].control;
            }
        });
    }
    setDisabled() {
        this.disabled = !this.disabled;
        detectChanges(this.cdr);
        const controls = this.directives?.toArray().map((d) => d.control);
        if (controls) {
            this.controlDisabled = controls[0].disabled;
            this.modelDisabled = controls[1].disabled;
        }
    }

    setReadonly() {
        this.readonly = !this.readonly;
        detectChanges(this.cdr);
        const controls = this.directives?.toArray();
        if (controls) {
            this.controlReadonly = controls[0].readonly;
            this.modelReadonly = controls[1].readonly;
        }
    }
    setTouched() {
        this.control2?.markAsTouched();
        this.control3?.markAsTouched();
        this.control4?.markAsTouched();
    }
    setPristine() {
        this.control2?.markAsPristine();
        this.control3?.markAsPristine();
        this.control4?.markAsPristine();
    }
    setDirty() {
        this.control2?.markAsDirty();
        this.control3?.markAsDirty();
        this.control4?.markAsDirty();
    }
    setInvalid() {
        this.control2?.setErrors({ error: true });
        this.control3?.setErrors({ error: true });
        this.control4?.setErrors({ error: true });
    }
    setValid() {
        this.control2?.setErrors(null);
        this.control3?.setErrors(null);
        this.control4?.setErrors(null);
    }
}
