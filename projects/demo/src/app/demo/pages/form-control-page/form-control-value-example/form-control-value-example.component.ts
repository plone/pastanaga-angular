import { ChangeDetectorRef, Component, QueryList, ViewChildren } from '@angular/core';
import { PaFormControlDirective } from '../../../../../../../pastanaga-angular/src/lib/controls/form-field/pa-form-control.directive';
import { detectChanges } from '../../../../../../../pastanaga-angular/src';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'pa-demo-form-control-value-example',
    templateUrl: './form-control-value-example.component.html',
    styleUrls: ['./form-control-value-example.component.scss'],
})
export class FormControlValueExampleComponent {
    standaloneParentValue?: any;
    standaloneChangeEvent?: any;
    standaloneCode = `<div paFormControl
    [value]="..."
    (valueChange)="..."></div>`;
    ngModelCode = `<div paFormControl [(ngModel)]="..."></div>`;
    model = 'initial value';
    formControl = new FormControl('');
    formControlCode = `<input paFormControl [formControl]="formControl">`;
    @ViewChildren(PaFormControlDirective) directives?: QueryList<PaFormControlDirective>;

    constructor(private cdr: ChangeDetectorRef) {}

    onStandaloneChange(event: any) {
        this.standaloneChangeEvent = event;
    }

    standaloneParentToChildChange() {
        // reset former value;
        this.standaloneParentValue = undefined;
        detectChanges(this.cdr);
        this.standaloneParentValue = 'change from parent';
        detectChanges(this.cdr);
    }

    standaloneChildToParentChange() {
        this.directives?.first.control.patchValue('change from directive');
    }

    ngModelChildToParentChange() {
        this.directives?.toArray()[1].control.patchValue('change from directive');
    }

    ngModelParentToChildChange() {
        this.model = 'change from parent';
    }
    formControlChildToParentChange() {
        this.directives?.toArray()[2].control.patchValue('change from directive');
    }

    formControlParentToChildChange() {
        this.formControl.reset('change from parent');
    }
}
