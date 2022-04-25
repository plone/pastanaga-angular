import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import {
    add,
    addMonths,
    format,
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
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

interface Day {
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

const DEFAULT_FORMAT = "MMMM d',' yyyy";
const DATE_FORMATS = [DEFAULT_FORMAT, "MMMM d',' yy"];

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

    private _onChange = (date: Date) => {};

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

    weeks: Day[][] = [];
    years: Year[] | undefined;
    months: Month[] | undefined;

    disabled = true;

    constructor(private cd: ChangeDetectorRef) {
        this.formControl = new FormControl();
        this.trackedDate = new Date();
    }

    ngOnInit(): void {
        // honor text entry
        this.formControl.valueChanges
            .pipe(
                debounceTime(500),
                switchMap((value) => {
                    const format = DATE_FORMATS.find((format) => isMatch(value, format));
                    const date = format ? parse(value, format, this.trackedDate) : null;
                    return of(date);
                }),
            )
            .subscribe((date) => {
                if (!date) {
                    if (!this.formControl.value) {
                        this._selectedDate = undefined;
                        this.trackedDate = new Date();
                    }
                } else {
                    // this maintains the user's format for now
                    this._selectedDate = date;
                    this.trackedDate = date;
                }

                this.generateWeeks();

                this.cd.markForCheck();
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
        this.months = [
            // TODO: translate
            { name: 'January', selected: false },
            { name: 'February', selected: false },
            { name: 'March', selected: false },
            { name: 'April', selected: false },
            { name: 'May', selected: false },
            { name: 'June', selected: false },
            { name: 'July', selected: false },
            { name: 'August', selected: false },
            { name: 'September', selected: false },
            { name: 'October', selected: false },
            { name: 'November', selected: false },
            { name: 'December', selected: false },
        ];

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
        if (this.popup?.isDisplayed) {
            // using companionElement doesn't behave correctly; intercepting the click before
            // it bubbles up to the popup directive to keep open
            event.stopPropagation();
            event.preventDefault();
            return;
        }

        // mark as touched
        if (!this._touched && this._onTouched) {
            this._onTouched();
            this._touched = true;
        }
    }

    handlePopupClose() {
        this._updateInput();
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
        const value = this._selectedDate ? format(this._selectedDate, DEFAULT_FORMAT) : '';

        this.formControl.setValue(value, {
            emitEvent: false,
            emitModelToViewChange: true,
        });
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
        this.disabled = disabled;
    }
}
