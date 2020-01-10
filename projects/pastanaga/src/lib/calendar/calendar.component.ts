import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

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
    currentMonth: {monthLabel: string, dates: {date: Date, isFuture: boolean}[]} = {monthLabel: '', dates: []};

    constructor(
        private service: CalendarService,
    ) {
    }

    ngOnInit(): void {
        this.currentMonth = this.service.getCurrentMonth();
    }

    ngOnDestroy(): void {
        this.terminator.next();
    }
}
