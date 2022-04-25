import { NgModule } from '@angular/core';
import { DatePickerComponent } from './date-picker.component';
import { PaButtonModule } from '../button';
import { CommonModule } from '@angular/common';
import { PaTextFieldModule } from '../controls';
import { ReactiveFormsModule } from '@angular/forms';
import { PaIconModule } from '../icon';
import { PaScrollModule } from '../scroll';
import { PaPopupModule } from "../popup";

@NgModule({
    imports: [CommonModule, PaButtonModule, PaTextFieldModule, ReactiveFormsModule, PaIconModule, PaScrollModule, PaPopupModule],
    exports: [DatePickerComponent],
    declarations: [DatePickerComponent],
})
export class PaDatePickerModule {}
