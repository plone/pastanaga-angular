import { Component } from '@angular/core';

@Component({
    templateUrl: 'datetime-page.component.html',
})
export class DateTimePageComponent {
    todayAm: Date;
    yesterdayPm: Date;
    fewSecondsAgo: Date;
    tenMinutesAgo: Date;
    aDate: Date;
    code = `<pa-datetime datetime="2010-10-20" format="mixed"></pa-datetime>`;

    constructor() {
        const amHours = 9;
        const amMinutes = 45;
        this.todayAm = new Date();
        this.todayAm.setHours(9);
        this.todayAm.setMinutes(45);

        this.yesterdayPm = new Date();
        this.yesterdayPm.setDate(this.todayAm.getDate() - 1);
        this.yesterdayPm.setHours(18);
        this.yesterdayPm.setMinutes(7);

        this.fewSecondsAgo = new Date();
        this.fewSecondsAgo.setSeconds(this.fewSecondsAgo.getSeconds() - 30);

        this.tenMinutesAgo = new Date();
        this.tenMinutesAgo.setMinutes(this.tenMinutesAgo.getMinutes() - 9);

        this.aDate = new Date('1974-10-20');
    }
}
