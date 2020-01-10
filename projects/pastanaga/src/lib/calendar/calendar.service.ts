import { Injectable } from '@angular/core';
import { eachDayOfInterval, endOfMonth, endOfWeek, format, isFuture, isSaturday, isSunday, startOfMonth, startOfWeek } from 'date-fns';

@Injectable({providedIn: 'root'})
export class CalendarService {
    constructor() {
    }

    getCurrentMonth(): {monthLabel: string, dates: {date: Date, isFuture: boolean}[]} {
        const now = new Date();
        return this.getMonth(now);
    }

    private getMonth(date: Date) {
        let start = startOfMonth(date);
        let end = endOfMonth(date);
        if (!isSunday(start)) {
            start = startOfWeek(start);
        }
        if (!isSaturday(end)) {
            end = endOfWeek(end);
        }
        return {
            monthLabel: format(date, 'MMMM yyyy'),
            dates: eachDayOfInterval({start, end}).map(d => ({
                date: d,
                isFuture: isFuture(d),
            }))
        };
    }
}
