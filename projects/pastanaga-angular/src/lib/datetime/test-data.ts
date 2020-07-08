// tslint:disable:max-line-length

const amHours = 9;
const amMinutes = 45;
const todayAm = new Date();
todayAm.setHours(amHours);
todayAm.setMinutes(amMinutes);

const pmHours = 17;
const pmMinutes = 36;
const todayPm = new Date();
todayPm.setHours(pmHours);
todayPm.setMinutes(pmMinutes);

const yesterdayPm = new Date();
yesterdayPm.setDate(todayPm.getDate() - 1);
yesterdayPm.setHours(pmHours);
yesterdayPm.setMinutes(pmMinutes);

const yesterdayAm = new Date();
yesterdayAm.setDate(todayPm.getDate() - 1);
yesterdayAm.setHours(amHours);
yesterdayAm.setMinutes(amMinutes);

const fewSecondsAgo = new Date();
fewSecondsAgo.setSeconds(fewSecondsAgo.getSeconds() - 30);

const oneMinutesAgo = new Date();
oneMinutesAgo.setSeconds(oneMinutesAgo.getSeconds() - 65);

const tenMinutesAgo = new Date();
tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 9);

function getFormattedMonth(date: Date, isEuropean = false) {
    const month = `${date.getMonth() + 1}`;
    return !isEuropean || month.length === 2 ? month : '0' + month;
}

export const dates = {
    beforeYesterdayPM: {
        timestamp: '2017-12-31T19:12:13.002',
        humanEn: 'December 31<sup>st</sup> 2017, 7:12 <abbr title="Post Meridiem">PM</abbr>',
        numericalEn: '12/31/2017',
        humanWithSec: 'December 31<sup>st</sup> 2017, 7:12:13 <abbr title="Post Meridiem">PM</abbr>',
        numericalWithSec: '12/31/2017',
        mixedEn: 'December 31<sup>st</sup> 2017, 7:12 <abbr title="Post Meridiem">PM</abbr>',
        humanFr: '31 Décembre 2017, 19:12',
        numericalFr: '31/12/2017',
        mixedFr: '31 Décembre 2017, 19:12',
        absoluteEn: '12/31/2017, 7:12 <abbr title="Post Meridiem">PM</abbr>',
        absoluteFr: '31/12/2017, 19:12',
        absoluteWithSec: '12/31/2017, 7:12:13 <abbr title="Post Meridiem">PM</abbr>',
    },
    beforeYesterdayAM: {
        timestamp: '2017-12-02T08:12:13.002',
        humanEn: 'December 2<sup>nd</sup> 2017, 8:12 <abbr title="Ante Meridiem">AM</abbr>',
        numericalEn: '12/2/2017',
        mixedEn: 'December 2<sup>nd</sup> 2017, 8:12 <abbr title="Ante Meridiem">AM</abbr>',
        humanFr: '2 Décembre 2017, 8:12',
        numericalFr: '2/12/2017',
        mixedFr: '2 Décembre 2017, 8:12',
        absoluteEn: '12/2/2017, 8:12 <abbr title="Ante Meridiem">AM</abbr>',
        absoluteFr: '2/12/2017, 8:12',
    },
    yesterdayAM: {
        timestamp: yesterdayAm.toISOString(),
        humanEn: `Yesterday, ${amHours}:${amMinutes} <abbr title="Ante Meridiem">AM</abbr>`,
        numericalEn: `Yesterday, ${amHours}:${amMinutes} <abbr title="Ante Meridiem">AM</abbr>`,
        mixedEn: `Yesterday, ${amHours}:${amMinutes} <abbr title="Ante Meridiem">AM</abbr>`,
        humanFr: `Hier, ${amHours}:${amMinutes}`,
        numericalFr: `Hier, ${amHours}:${amMinutes}`,
        mixedFr: `Hier, ${amHours}:${amMinutes}`,
        absoluteEn: `${getFormattedMonth(
            yesterdayAm
        )}/${yesterdayAm.getDate()}/${yesterdayAm.getFullYear()}, ${amHours}:${amMinutes} <abbr title="Ante Meridiem">AM</abbr>`,
        absoluteFr: `${yesterdayAm.getDate()}/${getFormattedMonth(
            yesterdayAm,
            true
        )}/${yesterdayAm.getFullYear()}, ${amHours}:${amMinutes}`,
    },
    yesterdayPM: {
        timestamp: yesterdayPm.toISOString(),
        humanEn: `Yesterday, ${pmHours - 12}:${pmMinutes} <abbr title="Post Meridiem">PM</abbr>`,
        numericalEn: `Yesterday, ${pmHours - 12}:${pmMinutes} <abbr title="Post Meridiem">PM</abbr>`,
        mixedEn: `Yesterday, ${pmHours - 12}:${pmMinutes} <abbr title="Post Meridiem">PM</abbr>`,
        humanFr: `Hier, ${pmHours}:${pmMinutes}`,
        numericalFr: `Hier, ${pmHours}:${pmMinutes}`,
        mixedFr: `Hier, ${pmHours}:${pmMinutes}`,
        absoluteEn: `${getFormattedMonth(yesterdayPm)}/${yesterdayPm.getDate()}/${yesterdayPm.getFullYear()}, ${
            pmHours - 12
        }:${pmMinutes} <abbr title="Post Meridiem">PM</abbr>`,
        absoluteFr: `${yesterdayPm.getDate()}/${getFormattedMonth(
            yesterdayPm,
            true
        )}/${yesterdayPm.getFullYear()}, ${pmHours}:${pmMinutes}`,
    },
    todayAM: {
        timestamp: todayAm.toISOString(),
        humanEn: `Today, ${amHours}:${amMinutes} <abbr title="Ante Meridiem">AM</abbr>`,
        numericalEn: `Today, ${amHours}:${amMinutes} <abbr title="Ante Meridiem">AM</abbr>`,
        humanFr: `Aujourd'hui, ${amHours}:${amMinutes}`,
        numericalFr: `Aujourd'hui, ${amHours}:${amMinutes}`,
        absoluteEn: `${
            todayAm.getMonth() + 1
        }/${todayAm.getDate()}/${todayAm.getFullYear()}, ${amHours}:${amMinutes} <abbr title="Ante Meridiem">AM</abbr>`,
        absoluteFr: `${todayAm.getDate()}/${getFormattedMonth(
            todayAm,
            true
        )}/${todayAm.getFullYear()}, ${amHours}:${amMinutes}`,
    },
    todayPM: {
        timestamp: todayPm.toISOString(),
        humanEn: `Today, ${pmHours - 12}:${pmMinutes} <abbr title="Post Meridiem">PM</abbr>`,
        numericalEn: `Today, ${pmHours - 12}:${pmMinutes} <abbr title="Post Meridiem">PM</abbr>`,
        humanFr: `Aujourd'hui, ${pmHours}:${pmMinutes}`,
        numericalFr: `Aujourd'hui, ${pmHours}:${pmMinutes}`,
        absoluteEn: `${todayPm.getMonth() + 1}/${todayPm.getDate()}/${todayPm.getFullYear()}, ${
            pmHours - 12
        }:${pmMinutes} <abbr title="Post Meridiem">PM</abbr>`,
        absoluteFr: `${todayPm.getDate()}/${getFormattedMonth(
            todayPm,
            true
        )}/${todayPm.getFullYear()}, ${pmHours}:${pmMinutes}`,
    },
    fewSecondsAgo: {
        timestamp: fewSecondsAgo.toISOString(),
        relativeEn: 'A few seconds ago',
        relativeFr: 'Il y a quelques secondes',
    },
    oneMinutesAgo: {
        timestamp: oneMinutesAgo.toISOString(),
        relativeEn: '1 minute ago',
        relativeFr: 'Il y a 1 minute',
    },
    tenMinutesAgo: {
        timestamp: tenMinutesAgo.toISOString(),
        relativeEn: '10 minutes ago',
        relativeFr: 'Il y a 10 minutes',
    },
};

export const mockTranslateEn = {
    pastanaga: {
        datetime: {
            today: 'Today',
            yesterday: 'Yesterday',
            'a-few-seconds-ago': 'A few seconds ago',
            'one-minute-ago': '1 minute ago',
            minutesAgo: '{{minutes}} minutes ago',
        },
    },
};

export const mockTranslateFr = {
    pastanaga: {
        datetime: {
            today: `Aujourd'hui`,
            yesterday: 'Hier',
            'a-few-seconds-ago': 'Il y a quelques secondes',
            'one-minute-ago': 'Il y a 1 minute',
            minutesAgo: 'Il y a {{minutes}} minutes',
        },
    },
};
