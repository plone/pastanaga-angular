import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CalendarDate, CalendarView, ICalendar, IHeaderButtons } from './calendar.model';



@Component({
    selector: 'pa-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit, OnDestroy {
    @Input() set noFuture(value) { this._noFuture = coerceBooleanProperty(value); }
    _noFuture = false;

    terminator: Subject<void> = new Subject<void>();
    calendar: ICalendar = {
        headerButtons: [],
        dates: [],
        dateRef: new Date(),
    };
    selectedRange: {start: Date, end: Date} = {start: new Date(), end: new Date()};
    view: CalendarView  = 'day';

    constructor(
        private service: CalendarService,
    ) {
    }

    ngOnInit(): void {
        this.calendar = this.service.getMonth(this.calendar.dateRef, this.selectedRange);
    }

    ngOnDestroy(): void {
        this.terminator.next();
    }

    goToPrevious() {
        if (this.view === 'year') {
            this.calendar = this.service.getPreviousYears(this.calendar.dateRef, this.selectedRange.start);
        } else if (this.view === 'month') {
            this.calendar = this.service.getPreviousMonths(this.calendar.dateRef, this.selectedRange.start);
        } else {
            this.calendar = this.service.getPreviousMonth(this.calendar.dateRef, this.selectedRange);
        }
    }

    goToNext() {
        if (this.view === 'year') {
            this.calendar = this.service.getNextYears(this.calendar.dateRef, this.selectedRange.start);
        } else if (this.view === 'month') {
            this.calendar = this.service.getNextMonths(this.calendar.dateRef, this.selectedRange.start);
        } else {
            this.calendar = this.service.getNextMonth(this.calendar.dateRef, this.selectedRange);
        }
    }

    changeView(newView: CalendarView) {
        this.view = newView;
        if (this.view === 'year') {
            this.calendar = this.service.getYears(this.calendar.dateRef, this.selectedRange.start);
        } else if (this.view === 'month') {
            this.calendar = this.service.getMonths(this.calendar.dateRef, this.selectedRange.start);
        } else {
            this.calendar = this.service.getMonth(this.calendar.dateRef, this.selectedRange);
        }
    }

    selectDate(selection: CalendarDate) {
        if (this.view === 'year') {
            this.view = 'month';
            this.calendar = this.service.getMonths(selection.date, this.selectedRange.start);
        } else if (this.view === 'month') {
            this.view = 'day';
            this.calendar = this.service.getMonth(selection.date, this.selectedRange);
        } else {
            this.selectedRange = {start: selection.date, end: selection.date};
            this.calendar = this.service.getMonth(selection.date, this.selectedRange);
            // TODO: range selection
        }
    }
}
