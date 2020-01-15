import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CalendarDate, CalendarView, ICalendar } from './calendar.model';


@Component({
    selector: 'pa-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit, OnDestroy {
    @Input() set rangeStart(value) {
        this._isRangeStart = coerceBooleanProperty(value);
        if (this._isRangeStart) {
            this.legend = 'calendar.select-start-date-legend';
        }
    }
    _isRangeStart = false;

    @Input() set rangeEnd(value) {
        this._isRangeEnd = coerceBooleanProperty(value);
        if (this._isRangeEnd) {
            this.legend = 'calendar.select-end-date-legend';
        }
    }
    _isRangeEnd = false;

    @Input() set min(value: Date) {
        this._min = value;
        this.calendar = this.service.getMonth(this.calendar.dateRef, this._selection, this._min);
    }
    _min?: Date;

    @Input() set selection(value: {start?: Date, end?: Date} | Date) {
        if (!!value) {
            this._selection = value instanceof Date ? {start: value, end: value} : value;
            this.calendar = this.service.getMonth(this.calendar.dateRef, this._selection, this._min);
        }
    }
    _selection: {start?: Date, end?: Date} = {};

    @Input() set noFuture(value) { this._noFuture = coerceBooleanProperty(value); }
    _noFuture = false;

    @Output() select: EventEmitter<Date | null> = new EventEmitter<Date>();

    terminator: Subject<void> = new Subject<void>();
    calendar: ICalendar = {
        headerButtons: [],
        dates: [],
        dateRef: new Date(),
    };
    calendarViews = CalendarView;
    view: CalendarView  = CalendarView.day;
    legend = '';
    refDate = new Date();

    constructor(
        private service: CalendarService,
    ) {
    }

    ngOnInit(): void {
        this.calendar = this.service.getMonth(this.calendar.dateRef, this._selection, this._min);
    }

    ngOnDestroy(): void {
        this.terminator.next();
    }

    goToPrevious() {
        const ref: Date = this._selection && this._selection.start ? this._selection.start : this.refDate;
        if (this.view === CalendarView.year) {
            this.calendar = this.service.getPreviousYears(this.calendar.dateRef, ref, this._min);
        } else if (this.view === CalendarView.month) {
            this.calendar = this.service.getPreviousMonths(this.calendar.dateRef, ref, this._min);
        } else {
            this.calendar = this.service.getPreviousMonth(this.calendar.dateRef, this._selection, this._min);
        }
    }

    goToNext() {
        const ref: Date = this._selection && this._selection.start ? this._selection.start : this.refDate;
        if (this.view === CalendarView.year) {
            this.calendar = this.service.getNextYears(this.calendar.dateRef, ref, this._min);
        } else if (this.view === CalendarView.month) {
            this.calendar = this.service.getNextMonths(this.calendar.dateRef, ref, this._min);
        } else {
            this.calendar = this.service.getNextMonth(this.calendar.dateRef, this._selection, this._min);
        }
    }

    changeView(newView: CalendarView) {
        const ref: Date = this._selection && this._selection.start ? this._selection.start : this.refDate;
        this.view = newView;
        if (this.view === CalendarView.year) {
            this.calendar = this.service.getYears(this.calendar.dateRef, ref, this._min);
        } else if (this.view === CalendarView.month) {
            this.calendar = this.service.getMonths(this.calendar.dateRef, ref, this._min);
        } else {
            this.calendar = this.service.getMonth(this.calendar.dateRef, this._selection, this._min);
        }
    }

    selectDate(selection: CalendarDate) {
        const ref: Date = this._selection && this._selection.start ? this._selection.start : this.refDate;
        if (this.view === CalendarView.year) {
            this.view = CalendarView.month;
            this.calendar = this.service.getMonths(selection.date, ref, this._min);
        } else if (this.view === CalendarView.month) {
            this.view = CalendarView.day;
            this.calendar = this.service.getMonth(selection.date, this._selection, this._min);
        } else {
            this.calendar = this.service.getMonth(selection.date, this._selection, this._min);
            this.select.emit(selection.date);
        }
    }

    noEnd() {
        this.select.emit(null);
    }
}
