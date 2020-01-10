import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from 'pastanaga-angular/lib/calendar/calendar.component';
import { ButtonModule } from 'pastanaga-angular/lib/button/button.module';
import { TooltipModule } from 'pastanaga-angular/lib/tooltip/tooltip.module';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        TooltipModule,
    ],
    exports: [CalendarComponent],
    declarations: [CalendarComponent],
})
export class CalendarModule {
}
