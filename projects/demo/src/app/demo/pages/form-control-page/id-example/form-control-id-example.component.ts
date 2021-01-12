import { AfterContentInit, Component, QueryList, ViewChildren } from '@angular/core';
import { PaFormControlDirective } from '../../../../../../../pastanaga-angular/src/lib/controls/form-field/pa-form-control.directive';

@Component({
    selector: 'pa-demo-form-control-id-example',
    templateUrl: './form-control-id-example.component.html',
})
export class FormControlIdExampleComponent implements AfterContentInit {
    @ViewChildren(PaFormControlDirective) directives?: QueryList<PaFormControlDirective>;
    elementId?: string;
    elementAndControlId?: string;
    controlId?: string;
    autoId?: string;

    elementHasId = `<div id="test1" paFormControl></div>`;
    elementHasIdAndControlHasId = `<div id="test2" [id]="'control'" paFormControl></div>`;
    elementWithoutIdAndControlHasId = `<div [id]="'test3'" paFormControl></div>`;
    noIdProvided = `<div paFormControl></div>`;

    ngAfterContentInit(): void {
        setTimeout(() => {
            if (!!this.directives) {
                const array = this.directives.toArray();
                this.autoId = array[0].id;
                this.elementId = array[1].id;
                this.elementAndControlId = array[2].id;
                this.controlId = array[3].id;
            }
        });
    }
}
