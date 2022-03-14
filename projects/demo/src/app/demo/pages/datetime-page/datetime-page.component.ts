import { Component } from '@angular/core';
import { startOfYear } from 'date-fns';

@Component({
    templateUrl: 'datetime-page.component.html',
})
export class DateTimePageComponent {
    todayAm: string;
    yesterdayPm: string;
    fewSecondsAgo: string;
    fifteenMinutesAgo: string;
    aDate: string;
    oneMinuteAgo: string;
    thisYear: string;
    code = `<pa-datetime datetime="2010-10-20" format="numerical" dateOnly></pa-datetime>`;

    constructor() {
        const todayAm = new Date();
        todayAm.setHours(9);
        todayAm.setMinutes(45);
        this.todayAm = todayAm.toISOString();

        const yesterdayPm = new Date();
        yesterdayPm.setDate(todayAm.getDate() - 1);
        yesterdayPm.setHours(18);
        yesterdayPm.setMinutes(7);
        this.yesterdayPm = yesterdayPm.toISOString();

        const fewSecondsAgo = new Date();
        fewSecondsAgo.setSeconds(fewSecondsAgo.getSeconds() - 30);
        this.fewSecondsAgo = fewSecondsAgo.toISOString();

        const oneMinuteAgo = new Date();
        oneMinuteAgo.setSeconds(oneMinuteAgo.getSeconds() - 60);
        this.oneMinuteAgo = oneMinuteAgo.toISOString();

        const fifteenMinutesAgo = new Date();
        fifteenMinutesAgo.setMinutes(fifteenMinutesAgo.getMinutes() - 15);
        this.fifteenMinutesAgo = fifteenMinutesAgo.toISOString();

        this.thisYear = startOfYear(todayAm).toISOString();
        this.aDate = new Date('1974-10-20').toISOString();
    }
}
