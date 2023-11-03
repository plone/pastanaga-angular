import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  LOCALE_ID,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import {
  add,
  addMinutes,
  addMonths,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  isEqual,
  isMatch,
  lastDayOfMonth,
  parse,
  set,
  setMonth,
  setYear,
  startOfDay,
  subMonths,
} from 'date-fns';
import { PopupComponent, PopupDirective } from '../popup';
import { AbstractControl, FormControl, NgControl, ValidatorFn } from '@angular/forms';
import { debounceTime, filter, map, startWith } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { InputComponent, PaFormControlDirective } from '../controls';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { markForCheck, TRANSITION_DURATION } from '../common';

export interface Day {
  otherMonth: boolean;
  number: number;
  date: Date;
  selected: boolean;
}

interface Month {
  name: string;
  selected: boolean;
}

interface Year {
  number: number;
  selected: boolean;
}

const DATE_FORMATS = ["MMMM d',' yyyy", "MMMM d',' yy"];

function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}

function DateValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.value && !DATE_FORMATS.some((format) => isMatch(control.value, format))) {
      return {
        invalidFormat: 'pastanaga.calendar.invalid-format',
      };
    }
    return null;
  };
}

@Component({
  selector: 'pa-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent extends PaFormControlDirective {
  private _selectedDate?: Date;

  @Input()
  set externalLabel(value: any) {
    this._externalLabel = coerceBooleanProperty(value);
  }
  get externalLabel() {
    return this._externalLabel;
  }
  private _externalLabel = false;

  @ViewChild('popupRef') popupDirective?: PopupDirective;
  @ViewChild('popup') popup?: PopupComponent;
  @ViewChild('input') input?: InputComponent;

  trackedDate: Date;
  inputControl: FormControl<string | null> = new FormControl<string | null>(null, {
    validators: [DateValidator()],
  });

  mode: 'weeks' | 'months' | 'years' = 'weeks';

  readonly days: string[] = range(7, (i) => formatDate(new Date(2017, 0, i + 1), 'EEEEE', this.locale));
  weeks: Day[][] = [];
  years: Year[] | undefined;
  months: Month[] | undefined;

  @Input()
  label: string | undefined;

  @Input()
  override get disabled() {
    return this.inputControl.disabled;
  }

  override set disabled(value: any) {
    this.setDisabledState(coerceBooleanProperty(value));
  }

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    element: ElementRef,
    @Optional() @Self() parentControl: NgControl,
    cdr: ChangeDetectorRef,
  ) {
    super(element, parentControl, cdr);
    this.trackedDate = new Date();
    // @ts-ignore
    this.valueCompare = <D extends Date>(a: D, b: D) => isEqual(a, b);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    // whenever date value changes make sure it is reflected in the input
    this.control.valueChanges
      .pipe(
        startWith(this.control.value),
        filter((value) => !!value),
      )
      .subscribe((value: string) => {
        const date = formatDate(value, 'longDate', this.locale);

        this.inputControl.setValue(date);
        this._selectedDate = this.getUtcDate(startOfDay(new Date(value)));
      });

    // honor text entry
    this.inputControl.valueChanges
      .pipe(
        debounceTime(TRANSITION_DURATION.moderate),
        map((v) => {
          const value = v as string;
          return {
            value,
            format: DATE_FORMATS.find((format) => isMatch(value, format)) || null,
          };
        }),
        map(({ value, format }) => {
          let date: Date | undefined = undefined;

          if (!format) {
            if (!value) {
              this.trackedDate = new Date();
            }
          } else {
            // this maintains the user's format for now
            date = this.getUtcDate(parse(value, format, this.trackedDate));
          }
          return date;
        }),
        filter((date) => {
          return !date || !this._selectedDate || !isEqual(date, this._selectedDate);
        }),
      )
      .subscribe((date) => {
        this.setDate(date);
        this.generateWeeks();
        markForCheck(this.cdr);
      });
  }

  private generateWeeks(): void {
    this.weeks = [];

    const monthStartDate = this.getUtcDate(startOfDay(set(this.trackedDate, { date: 1 }))) as Date;
    const monthFirstDay = getDay(monthStartDate);
    const monthLastDay = getDay(lastDayOfMonth(this.trackedDate));
    const monthNumDays = getDaysInMonth(monthStartDate);

    const offsetBefore = -monthFirstDay;
    const offsetAfter = monthNumDays + (6 - monthLastDay);

    for (let i = offsetBefore, days = 0; i < offsetAfter; i++, days++) {
      // determine week number in month for day
      const weekNum = Math.floor(days / 7);

      // get/create current week
      this.weeks[weekNum] = this.weeks[weekNum] || [];
      const week = this.weeks[weekNum];

      // create date for day
      const date = add(monthStartDate, { days: i });

      // add day to week
      week.push({
        otherMonth: i < 0 || i > monthNumDays - 1,
        number: getDate(date),
        date,
        selected: isEqual(date, this._selectedDate || 0),
      });
    }
  }

  private generateMonths(): void {
    this.months = range(12, (i) => {
      return {
        name: formatDate(new Date(2017, i, 1), 'LLLL', this.locale),
        selected: false,
      };
    });

    const trackedMonth = getMonth(this.trackedDate);
    this.months.forEach((month, i) => (month.selected = i === trackedMonth));
  }

  private generateYears(): void {
    const year: number = getYear(this.trackedDate);

    this.years = [];
    const start = Math.max(getYear(new Date()), year);
    const end = Math.min(2000, year);

    // add years in descending order
    for (let y = start; y >= end; y--) {
      this.years.push({ number: y, selected: y === year });
    }
  }

  handleInputClick(event: MouseEvent) {
    if (this.popup?.isDisplayed || this.disabled || this.readonly) {
      // using companionElement doesn't behave correctly; intercepting the click before
      // it bubbles up to the popup directive to keep open
      event.stopPropagation();
      event.preventDefault();
    }

    // mark as touched
    if (!this.disabled && !this.readonly && this.onTouched) {
      this.onTouched();
    }
  }

  handlePopupClose() {
    this.trackedDate = this._selectedDate || new Date();
  }

  openWeeks(event?: Event): void {
    event?.stopPropagation();
    this.generateWeeks();
    this.mode = 'weeks';
  }

  openYears(event: Event): void {
    event.stopPropagation();
    this.generateYears();
    this.mode = 'years';
  }

  openMonths(event: Event): void {
    event.stopPropagation();
    this.generateMonths();
    this.mode = 'months';
  }

  previousMonth(): void {
    this.trackedDate = subMonths(this.trackedDate, 1);
    this.generateWeeks();
  }

  nextMonth(): void {
    this.trackedDate = addMonths(this.trackedDate, 1);
    this.generateWeeks();
  }

  selectYear(event: Event, year: number) {
    this.trackedDate = setYear(this.trackedDate, year);
    this.openWeeks(event);
  }

  selectMonth(event: Event, month: number) {
    this.trackedDate = setMonth(this.trackedDate, month);
    this.openWeeks(event);
  }

  selectDay(day: Day) {
    // close pop up
    this.popupDirective?.toggle();

    // change date
    this.setDate(day.date);

    this.input?.htmlInputRef?.nativeElement.focus();
  }

  private setDate(date: Date | undefined) {
    this._selectedDate = date;

    this.trackedDate = this._selectedDate || new Date();
    // Patch this.control value (which is meant to be a timestamp, ie an ISO string representation of a Date)
    this.onChange(this._selectedDate?.toISOString());
  }

  /**
   * date is corresponding to the start of the day in the current local, like 2023-06-02T00:00:00.000 GMT+0200
   * If we keep it like this, date.toISOString() returns 2023-06-01T22:00:00.000Z (toISOString always converting the date provided date to UTC)
   * So we add the timezone offset to the date: that way this._selectedDate.toISOString() will return 2023-06-02T00:00:00.000Z as expected
   */
  private getUtcDate(date: Date | undefined) {
    return date && addMinutes(date, date.getTimezoneOffset() * -1);
  }

  override setDisabledState(isDisabled: boolean) {
    if (isDisabled === this.inputControl.disabled) {
      return;
    }
    if (isDisabled) {
      this.inputControl.disable();
    } else {
      this.inputControl.enable();
    }
  }
}
