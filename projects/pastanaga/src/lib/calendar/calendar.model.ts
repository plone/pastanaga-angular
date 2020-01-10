export type CalendarView = 'day' | 'month' | 'year';

export interface IHeaderButtons {
    label: string;
    view: CalendarView;
}

export interface ICalendarDate {
    date: Date;
    label: string;
    isFuture: boolean;
    isActive: boolean;
}

export class CalendarDate implements ICalendarDate {
    date: Date;
    label: string;
    isFuture: boolean;
    isActive: boolean;

    constructor(data: ICalendarDate) {
        this.date = data.date;
        this.label = data.label;
        this.isFuture = data.isFuture;
        this.isActive = data.isActive;
    }
}

export interface ICalendar {
    dateRef: Date;
    dates: CalendarDate[];
    headerButtons: IHeaderButtons[];
}
