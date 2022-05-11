import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    Input,
    LOCALE_ID,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    add,
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
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { markForCheck, TRANSITION_DURATION } from '../common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { formatDate } from '@angular/common';

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

@Component({
    selector: 'pa-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: DatePickerComponent,
        },
    ],
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
    private _selectedDate?: Date;

    private _onChange = (date: Date | undefined) => {};

    private _onTouched = () => {};

    private _touched = false;

    formControl: FormControl;

    @ViewChild('popupRef') popupDirective?: PopupDirective;
    @ViewChild('popup') popup?: PopupComponent;

    @Input()
    get date() {
        return this._selectedDate;
    }

    set date(date: Date | undefined) {
        this._selectedDate = date && startOfDay(date);
        this.trackedDate = this._selectedDate || new Date();

        this._updateInput();
    }

    trackedDate!: Date;

    mode: 'weeks' | 'months' | 'years' = 'weeks';

    readonly days: string[] = range(7, (i) => formatDate(new Date(2017, 0, i + 1), 'EEEEE', this.locale));
    weeks: Day[][] = [];
    years: Year[] | undefined;
    months: Month[] | undefined;

    @Input() set disabled(value: any) {
        this.setDisabledState(coerceBooleanProperty(value));
    }

    get disabled() {
        return this.formControl.disabled;
    }

    constructor(@Inject(LOCALE_ID) private locale: string, private cdr: ChangeDetectorRef) {
        this.formControl = new FormControl(null, (control: AbstractControl) => {
            if (!DATE_FORMATS.some((format) => isMatch(control.value, format))) {
                return {
                    invalidFormat: 'Invalid date format',
                };
            }

            return null;
        });
        this.trackedDate = new Date();
    }

    ngOnInit(): void {
        // honor text entry
        this.formControl.valueChanges
            .pipe(
                debounceTime(TRANSITION_DURATION.moderate),
                map((value) => DATE_FORMATS.find((format) => isMatch(value, format)) || null),
            )
            .subscribe((format) => {
                if (!format) {
                    this._selectedDate = undefined;
                    if (!this.formControl.value) {
                        this.trackedDate = new Date();
                    }
                } else {
                    // this maintains the user's format for now
                    const date = parse(this.formControl.value, format, this.trackedDate);
                    this._selectedDate = date;
                    this.trackedDate = date;
                }

                this.generateWeeks();
                this._onChange(this._selectedDate);

                markForCheck(this.cdr);
            });
    }

    private generateWeeks(): void {
        this.weeks = [];

        const monthStartDate = startOfDay(set(this.trackedDate, { date: 1 }));
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
        if (this.popup?.isDisplayed || this.disabled) {
            // using companionElement doesn't behave correctly; intercepting the click before
            // it bubbles up to the popup directive to keep open
            event.stopPropagation();
            event.preventDefault();
        }

        // mark as touched
        if (!this.disabled && !this._touched && this._onTouched) {
            this._onTouched();
            this._touched = true;
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
        this.date = day.date;
        this._onChange(day.date);
    }

    private _updateInput() {
        if (this._selectedDate) {
            this.formControl.setValue(formatDate(this._selectedDate, 'longDate', this.locale));
        }
    }

    /*
     * ControlValueAccessor
     */

    writeValue(date: Date): void {
        if (date) {
            this.date = date;
        }
    }

    registerOnChange(onChange: any): void {
        this._onChange = onChange;
    }

    registerOnTouched(onTouched: any): void {
        this._onTouched = onTouched;
    }

    setDisabledState(disabled: boolean) {
        if (disabled !== this.formControl.disabled) {
            if (disabled) {
                this.formControl.disable();
            } else {
                this.formControl.enable();
            }
        }
    }
}
