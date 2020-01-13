import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { CalendarComponent } from './calendar.component';
import { TranslateModule } from 'pastanaga-angular/lib/translate/translate.module';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        TooltipModule,
        TranslateModule,
    ],
    exports: [CalendarComponent],
    declarations: [CalendarComponent],
})
export class CalendarModule {
}
