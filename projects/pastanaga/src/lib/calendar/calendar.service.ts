import { Injectable } from '@angular/core';
import {
    addMonths,
    addYears,
    eachDayOfInterval,
    eachMonthOfInterval,
    eachYearOfInterval,
    endOfMonth,
    endOfWeek,
    endOfYear,
    format,
    isFuture,
    isSameDay,
    isSameMonth,
    isSameYear,
    isSaturday,
    isSunday,
    startOfMonth,
    startOfWeek,
    startOfYear,
    subMonths,
    subYears
} from 'date-fns';
import { CalendarDate, ICalendar, IHeaderButtons } from './calendar.model';

@Injectable({providedIn: 'root'})
export class CalendarService {
    constructor() {
    }

    getNextMonth(date: Date, selectedRange: { start: Date, end: Date }): ICalendar {
        const nextDate = addMonths(date, 1);
        return this.getMonth(nextDate, selectedRange);
    }

    getPreviousMonth(date: Date, selectedRange: { start: Date, end: Date }): ICalendar {
        const previousDate = subMonths(date, 1);
        return this.getMonth(previousDate, selectedRange);
    }

    getMonth(date: Date, selectedRange: { start: Date, end: Date }): ICalendar {
        let start = startOfMonth(date);
        let end = endOfMonth(date);
        const dateRef = start;
        if (!isSunday(start)) {
            start = startOfWeek(start);
        }
        if (!isSaturday(end)) {
            end = endOfWeek(end);
        }
        return {
            dateRef,
            dates: eachDayOfInterval({start, end}).map(d => new CalendarDate({
                date: d,
                label: `${d.getDate()}`,
                isFuture: isFuture(d),
                isActive: isSameDay(d, selectedRange.start) || isSameDay(d, selectedRange.end),
            })),
            headerButtons: [
                {label: format(date, 'MMMM'), view: 'month'},
                {label: format(date, 'yyyy'), view: 'year'},
            ],
        };
    }

    getPreviousMonths(date: Date, currentDate: Date): ICalendar {
        const previousDate = subYears(date, 1);
        return this.getMonths(previousDate, currentDate);
    }

    getNextMonths(date: Date, currentDate: Date): ICalendar {
        const nextDate = addYears(date, 1);
        return this.getMonths(nextDate, currentDate);
    }

    getMonths(date: Date, currentDate: Date): ICalendar {
        const start = startOfYear(date);
        const end = endOfYear(date);
        return {
            dateRef: start,
            dates: eachMonthOfInterval({start, end}).map(d => new CalendarDate({
                date: d,
                label: format(d, 'MMMM'),
                isFuture: isFuture(d),
                isActive: isSameMonth(d, currentDate),
            })),
            headerButtons: [{label: format(date, 'yyyy'), view: 'year'}],
        };
    }

    getPreviousYears(date: Date, currentDate: Date): ICalendar {
        const previousDate = subYears(date, 20);
        return this.getYears(previousDate, currentDate);
    }

    getNextYears(date: Date, currentDate: Date): ICalendar {
        const nextDate = addYears(date, 20);
        return this.getYears(nextDate, currentDate);
    }

    getYears(date: Date, currentDate: Date): ICalendar {
        const start = subYears(date, 10);
        const end = addYears(date, 9);
        return {
            dateRef: date,
            dates: eachYearOfInterval({start, end}).map(d => new CalendarDate({
                date: d,
                label: `${d.getFullYear()}`,
                isFuture: isFuture(d),
                isActive: isSameYear(d, currentDate),
            })),
            headerButtons: [{label: `${start.getFullYear()} - ${end.getFullYear()}`, view: 'day'}],
        };
    }
}
