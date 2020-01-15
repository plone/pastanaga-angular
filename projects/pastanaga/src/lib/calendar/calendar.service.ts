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
    isBefore,
    isFuture,
    isSameDay,
    isSameMonth,
    isSameYear,
    isSaturday,
    isSunday,
    isWithinInterval,
    startOfMonth,
    startOfWeek,
    startOfYear,
    subMonths,
    subYears
} from 'date-fns';
import { CalendarDate, CalendarView, ICalendar } from './calendar.model';

@Injectable({providedIn: 'root'})
export class CalendarService {
    constructor() {
    }

    getNextMonth(date: Date, selectedRange: { start?: Date, end?: Date }, min?: Date): ICalendar {
        const nextDate = addMonths(date, 1);
        return this.getMonth(nextDate, selectedRange, min);
    }

    getPreviousMonth(date: Date, selectedRange: { start?: Date, end?: Date }, min?: Date): ICalendar {
        const previousDate = subMonths(date, 1);
        return this.getMonth(previousDate, selectedRange, min);
    }

    getMonth(date: Date, selectedRange: { start?: Date, end?: Date }, min?: Date): ICalendar {
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
                firstOfInterval: !!selectedRange.start && isSameDay(d, selectedRange.start),
                lastOfInterval: !!selectedRange.end && isSameDay(d, selectedRange.end),
                inInterval: !!selectedRange.start && !!selectedRange.end
                    && isWithinInterval(d, {start: selectedRange.start, end: selectedRange.end}),
                isActive: (!!selectedRange.start && isSameDay(d, selectedRange.start))
                    || (!!selectedRange.end && isSameDay(d, selectedRange.end)),
                isDisabled: !!min && isBefore(d, min),
            })),
            headerButtons: [
                {label: format(date, 'MMMM'), view: CalendarView.month},
                {label: format(date, 'yyyy'), view: CalendarView.year},
            ],
        };
    }

    getPreviousMonths(date: Date, currentDate: Date, min?: Date): ICalendar {
        const previousDate = subYears(date, 1);
        return this.getMonths(previousDate, currentDate, min);
    }

    getNextMonths(date: Date, currentDate: Date, min?: Date): ICalendar {
        const nextDate = addYears(date, 1);
        return this.getMonths(nextDate, currentDate, min);
    }

    getMonths(date: Date, currentDate: Date, min?: Date): ICalendar {
        const start = startOfYear(date);
        const end = endOfYear(date);
        return {
            dateRef: start,
            dates: eachMonthOfInterval({start, end}).map(d => new CalendarDate({
                date: d,
                label: format(d, 'MMMM'),
                isFuture: isFuture(d),
                isActive: isSameMonth(d, currentDate),
                isDisabled: !!min && !isSameMonth(d, min) && isBefore(d, min),
            })),
            headerButtons: [{label: format(date, 'yyyy'), view: CalendarView.year}],
        };
    }

    getPreviousYears(date: Date, currentDate: Date, min?: Date): ICalendar {
        const previousDate = subYears(date, 20);
        return this.getYears(previousDate, currentDate, min);
    }

    getNextYears(date: Date, currentDate: Date, min?: Date): ICalendar {
        const nextDate = addYears(date, 20);
        return this.getYears(nextDate, currentDate, min);
    }

    getYears(date: Date, currentDate: Date, min?: Date): ICalendar {
        const start = subYears(date, 10);
        const end = addYears(date, 9);
        return {
            dateRef: date,
            dates: eachYearOfInterval({start, end}).map(d => new CalendarDate({
                date: d,
                label: `${d.getFullYear()}`,
                isFuture: isFuture(d),
                isActive: isSameYear(d, currentDate),
                isDisabled: !!min && !isSameYear(d, min) && isBefore(d, min),
            })),
            headerButtons: [{label: `${start.getFullYear()} - ${end.getFullYear()}`, view: CalendarView.day}],
        };
    }
}
