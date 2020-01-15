export enum CalendarView {
    day = 'day',
    month = 'month',
    year = 'year',
}

export interface IHeaderButtons {
    label: string;
    view: CalendarView;
}

export interface ICalendarDate {
    date: Date;
    label: string;
    isFuture: boolean;
    isActive: boolean;
    inInterval?: boolean;
    isDisabled?: boolean;
    firstOfInterval?: boolean;
    lastOfInterval?: boolean;
}

export class CalendarDate implements ICalendarDate {
    date: Date;
    label: string;
    isFuture: boolean;
    isActive: boolean;
    isDisabled: boolean;
    inInterval: boolean;
    firstOfInterval: boolean;
    lastOfInterval: boolean;

    constructor(data: ICalendarDate) {
        this.date = data.date;
        this.label = data.label;
        this.isFuture = data.isFuture;
        this.isActive = data.isActive;
        this.isDisabled = data.isDisabled || false;
        this.inInterval = data.inInterval || false;
        this.firstOfInterval = data.firstOfInterval || false;
        this.lastOfInterval = data.lastOfInterval || false;
    }
}

export interface ICalendar {
    dateRef: Date;
    dates: CalendarDate[];
    headerButtons: IHeaderButtons[];
}
