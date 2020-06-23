import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { DateTimeComponent } from './datetime.component';

@NgModule({
    imports: [],
    exports: [DateTimeComponent],
    declarations: [DateTimeComponent],
    providers: [
        DatePipe,
    ],
})
export class PaDateTimeModule { }
