import { Component } from '@angular/core';
import { startOfYear } from 'date-fns';

@Component({
    templateUrl: 'datetime-page.component.html',
})
export class DateTimePageComponent {
    todayAm: Date;
    yesterdayPm: Date;
    fewSecondsAgo: Date;
    tenMinutesAgo: Date;
    aDate: Date;
    oneMinuteAgo: Date;
    thisYear: Date;
    code = `<pa-datetime datetime="2010-10-20" format="numerical" dateOnly></pa-datetime>`;

    constructor() {
        const todayAm = new Date();
        todayAm.setHours(9);
        todayAm.setMinutes(45);
        this.todayAm = todayAm;

        const yesterdayPm = new Date();
        yesterdayPm.setDate(todayAm.getDate() - 1);
        yesterdayPm.setHours(18);
        yesterdayPm.setMinutes(7);
        this.yesterdayPm = yesterdayPm;

        const fewSecondsAgo = new Date();
        fewSecondsAgo.setSeconds(fewSecondsAgo.getSeconds() - 30);
        this.fewSecondsAgo = fewSecondsAgo;

        const oneMinuteAgo = new Date();
        oneMinuteAgo.setSeconds(oneMinuteAgo.getSeconds() - 60);
        this.oneMinuteAgo = oneMinuteAgo;

        const tenMinutesAgo = new Date();
        tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
        this.tenMinutesAgo = tenMinutesAgo;

        this.thisYear = startOfYear(todayAm);
        this.aDate = new Date('1974-10-20');
    }
}
