import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { TranslateModule } from '../translate/translate.module';
import { CalendarComponent } from './calendar.component';
import { DatePickerComponent } from './date-picker.component';
import { PopupModule } from '../popup/popup.module';
import { DateInputComponent } from './date-input.component';
import { TextFieldModule } from '../textfield/textfield.module';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        PopupModule,
        TooltipModule,
        TranslateModule,
        TextFieldModule,
        FormsModule,
    ],
    exports: [CalendarComponent, DatePickerComponent, DateInputComponent],
    declarations: [CalendarComponent, DatePickerComponent, DateInputComponent],
})
export class CalendarModule {
}
