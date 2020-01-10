import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from 'pastanaga-angular/lib/calendar/calendar.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [CalendarComponent],
    declarations: [CalendarComponent],
})
export class CalendarModule {
}
