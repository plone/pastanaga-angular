import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DATE_FORMAT, DateTimeService } from './datetime.service';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { filter, map, switchMap, takeUntil, takeWhile } from 'rxjs/operators';
import { differenceInMinutes } from 'date-fns';
import { Observable, Subject, timer } from 'rxjs';
import { markForCheck } from '../common';

const formats = [DATE_FORMAT.human, DATE_FORMAT.numerical];

@Component({
    selector: 'pa-datetime',
    templateUrl: './datetime.component.html',
})
export class DateTimeComponent implements OnChanges, OnDestroy {
    @Input() datetime?: string;
    @Input() format = DATE_FORMAT.human;

    @Input()
    set dateOnly(value: boolean) {
        this._dateOnly = coerceBooleanProperty(value);
    }

    @Input()
    set displaySeconds(value: boolean) {
        this._displaySeconds = coerceBooleanProperty(value);
    }

    private _dateOnly = false;
    private _displaySeconds = false;
    private _terminator = new Subject();
    formattedTime = '';

    constructor(private service: DateTimeService, private cdr: ChangeDetectorRef) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.format && changes.format.currentValue && formats.indexOf(changes.format.currentValue) === -1) {
            console.warn(`Invalid format "${this.format}", using "${DATE_FORMAT.human}" by default`);
            this.format = DATE_FORMAT.human;
        }

        if (!!changes.datetime?.currentValue) {
            if (this.format === DATE_FORMAT.numerical) {
                this.updateFormattedTime(changes.datetime.currentValue).subscribe((formattedDate: string) => {
                    this.formattedTime = formattedDate;
                    markForCheck(this.cdr);
                });
            } else {
                this.updateHumanFormattedTime(changes.datetime.currentValue).subscribe((formattedDate: string) => {
                    this.formattedTime = formattedDate;
                    markForCheck(this.cdr);
                });
            }
        }
    }

    ngOnDestroy() {
        this._terminator.next();
        this._terminator.complete();
    }

    private updateFormattedTime(datetime: string): Observable<string> {
        return this.service.getFormattedDate(datetime, this.format, this._dateOnly, this._displaySeconds).pipe(
            filter((formattedDate) => !!formattedDate),
            map((formattedDate) => formattedDate as string)
        );
    }

    private updateHumanFormattedTime(timestamp: string): Observable<string> {
        const limit = 15;
        let minutesFromNow = differenceInMinutes(new Date(), new Date(timestamp));
        return minutesFromNow > limit
            ? this.updateFormattedTime(timestamp)
            : timer(0, 1000 * 60).pipe(
                  switchMap(() => this.updateFormattedTime(timestamp)),
                  takeWhile(() => {
                      minutesFromNow++;
                      return minutesFromNow <= limit + 2;
                  }),
                  takeUntil(this._terminator)
              );
    }
}
