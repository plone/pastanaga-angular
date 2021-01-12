import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaFormControlDirective } from '../../../../../../../pastanaga-angular/src/lib/controls/form-field/pa-form-control.directive';

@Component({
    selector: 'pa-demo-form-control-name-example',
    templateUrl: './form-control-name-example.component.html',
    styleUrls: ['./form-control-name-example.component.scss'],
})
export class FormControlNameExampleComponent implements AfterViewInit {
    first = 'first value';
    second?: any;
    third = 'third value';
    fourth?: any;

    standaloneName1?: string;
    standaloneName2?: string;
    firstName?: string;
    secondName?: string;
    thirdName?: string;
    fourthName?: string;

    standaloneCode = `<div paFormControl name="name">provided</div>
<div paFormControl>generated</div>`;
    templateDrivenCode = `<form #form="ngForm" (ngSubmit)="...">
    <input paFormControl name="first" [ngModel]="first">
    <div paFormControl [name]="'second'" ngModel="second">second</div>
    <input paFormControl name="third" [(ngModel)]="third">
    <div paFormControl [name]="'fourth'" [(ngModel)]="fourth">forth</div>
</form>`;

    reactiveCode = `<form [formGroup]="form" (ngSubmit)="...">
    <input paFormControl formControlName="fifth">
    <input paFormControl name="ignored" formControlName="sixth">
</form>`;
    form = new FormGroup({
        fifth: new FormControl(),
        sixth: new FormControl(),
    });
    fifthName?: string;
    sixthName?: string;

    @ViewChildren(PaFormControlDirective) directives?: QueryList<PaFormControlDirective>;

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (!!this.directives) {
                const array = this.directives.toArray();
                this.standaloneName1 = array[0].name;
                this.standaloneName2 = array[1].name;
                this.firstName = array[2].name;
                this.secondName = array[3].name;
                this.thirdName = array[4].name;
                this.fourthName = array[5].name;
                this.fifthName = array[6].name;
                this.sixthName = array[7].name;
            }
        });
    }

    formSubmit(event: any) {
        console.log('submitting: ', event);
    }
}
