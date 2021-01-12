import { ChangeDetectorRef, Component } from '@angular/core';
import { markForCheck } from '../../../../../../pastanaga-angular/src';

@Component({
    templateUrl: './form-control-page.component.html',
    styleUrls: ['./form-control-page.component.scss'],
})
export class FormControlPageComponent {
    selected = '';
    standaloneCode = `<input paFormControl [value]="myValue"/>`;
    ngModelCode = `<div paFormControl [(ngModel)]="myModel"></div>`;
    formControlCode = `<input paFormControl [formControl]="myFormControl"/>
<input paFormControl [formControlName]="nameInAFormGroup"/>`;
    constructor(private cdr: ChangeDetectorRef) {}

    selectExample(exampleRef: string) {
        if (this.selected === exampleRef) {
            this.selected = '';
        } else {
            this.selected = exampleRef;
        }
        markForCheck(this.cdr);
    }
}
