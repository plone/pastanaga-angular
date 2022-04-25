import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
    templateUrl: 'date-picker-page.component.html',
})
export class DatePickerPageComponent {
    date = new Date();
    selection: Date | undefined;
    formControl = new FormControl();
}
