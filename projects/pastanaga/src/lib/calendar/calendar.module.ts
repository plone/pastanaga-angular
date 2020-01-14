import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { TranslateModule } from '../translate/translate.module';
import { CalendarComponent } from './calendar.component';
import { DatePickerComponent } from './date-picker.component';
import { PopupModule } from '../popup/popup.module';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        PopupModule,
        TooltipModule,
        TranslateModule,
    ],
    exports: [CalendarComponent, DatePickerComponent],
    declarations: [CalendarComponent, DatePickerComponent],
})
export class CalendarModule {
}
