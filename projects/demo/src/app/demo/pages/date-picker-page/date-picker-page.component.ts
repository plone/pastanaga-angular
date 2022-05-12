import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
    templateUrl: 'date-picker-page.component.html',
})
export class DatePickerPageComponent {
    selectedTab: 'standalone' | 'ngmodel' | 'reactive' = 'ngmodel';

    standaloneDate: Date | undefined;
    ngModelDate: Date | undefined;
    formControl: FormControl;

    constructor() {
        this.formControl = new FormControl();
    }
}
