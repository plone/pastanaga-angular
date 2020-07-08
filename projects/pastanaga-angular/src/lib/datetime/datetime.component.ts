import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DATE_FORMAT, DateTimeService } from './datetime.service';

const formats = [DATE_FORMAT.human, DATE_FORMAT.numerical, DATE_FORMAT.mixed, DATE_FORMAT.absolute];

@Component({
    selector: 'pa-datetime',
    templateUrl: './datetime.component.html',
})
export class DateTimeComponent implements OnChanges {
    @Input() datetime?: string;
    @Input() format = DATE_FORMAT.human;
    @Input() displaySeconds = false;

    formattedTime = '';

    constructor(private service: DateTimeService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.format && changes.format.currentValue && formats.indexOf(changes.format.currentValue) === -1) {
            console.warn(`Invalid format "${this.format}", using "${DATE_FORMAT.human}" by default`);
            this.format = DATE_FORMAT.human;
        }

        if (changes.datetime && changes.datetime.currentValue) {
            this.service
                .getFormattedDate(changes.datetime.currentValue, this.format, this.displaySeconds)
                .subscribe((formattedDate) => {
                    if (!!formattedDate) {
                        this.formattedTime = formattedDate;
                    }
                });
        }
    }
}
