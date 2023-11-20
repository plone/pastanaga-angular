import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DateFormat, DateTimeService } from './datetime.service';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { filter, map, switchMap, takeUntil, takeWhile } from 'rxjs/operators';
import { differenceInMinutes } from 'date-fns';
import { Observable, Subject, timer } from 'rxjs';
import { markForCheck } from '../common';

const formats = ['human', 'numerical'];

@Component({
  selector: 'pa-datetime',
  templateUrl: './datetime.component.html',
})
export class DateTimeComponent implements OnChanges, OnDestroy {
  @Input() datetime?: string;
  @Input() format: DateFormat = 'human';

  @Input()
  set dateOnly(value: any) {
    this._dateOnly = coerceBooleanProperty(value);
  }
  get dateOnly() {
    return this._dateOnly;
  }

  @Input()
  set displaySeconds(value: any) {
    this._displaySeconds = coerceBooleanProperty(value);
  }
  get displaySeconds() {
    return this._displaySeconds;
  }

  private _dateOnly = false;
  private _displaySeconds = false;
  private _terminator = new Subject<void>();
  formattedTime = '';

  constructor(
    private service: DateTimeService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['format'] && changes['format'].currentValue && formats.indexOf(changes['format'].currentValue) === -1) {
      console.warn(`Invalid format "${this.format}", using "human" by default`);
      this.format = 'human';
    }

    if (!!changes['datetime']?.currentValue) {
      if (this.format === 'numerical') {
        this.updateFormattedTime(changes['datetime'].currentValue).subscribe((formattedDate: string) => {
          this.formattedTime = formattedDate;
          markForCheck(this.cdr);
        });
      } else {
        this.updateHumanFormattedTime(changes['datetime'].currentValue).subscribe((formattedDate: string) => {
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
    return this.service.getFormattedDate(datetime, this.format, this.dateOnly, this.displaySeconds).pipe(
      filter((formattedDate) => !!formattedDate),
      map((formattedDate) => formattedDate as string),
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
          takeUntil(this._terminator),
        );
  }
}
