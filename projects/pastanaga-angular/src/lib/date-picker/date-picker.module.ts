import { NgModule } from '@angular/core';
import { DatePickerComponent } from './date-picker.component';
import { PaButtonModule } from '../button';
import { CommonModule } from '@angular/common';
import { PaTextFieldModule } from '../controls';
import { ReactiveFormsModule } from '@angular/forms';
import { PaIconModule } from '../icon';
import { PaPopupModule } from '../popup';
import { PaTranslateModule } from '../translate';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PaButtonModule,
        PaIconModule,
        PaPopupModule,
        PaTextFieldModule,
        PaTranslateModule,
    ],
    exports: [DatePickerComponent],
    declarations: [DatePickerComponent],
})
export class PaDatePickerModule {}
