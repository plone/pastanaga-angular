// tslint:disable:max-line-length

const now = new Date();
const isAM = now.getHours() < 12;
const before10 = now.getHours() < 10;
const amHours = isAM && before10 ? now.getHours() + 1 : 7;
const amMinutes = 45;
const todayAm = new Date();
todayAm.setHours(amHours);
todayAm.setMinutes(amMinutes);

const before17 = now.getHours() < 17;
const pmHours = !isAM && before17 ? now.getHours() + 1 : 15;
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
    humanEn: 'Dec 31, 2017 at 7:12 PM',
    humanDateOnlyEn: 'Dec 31, 2017',
    numericalEn: '12/31/2017, 7:12 PM',
    numericalDateOnlyEn: '12/31/2017',
    humanWithSec: 'Dec 31, 2017 at 7:12:13 PM',
    numericalWithSec: '12/31/2017, 7:12:13 PM',
    humanFr: '31 Déc 2017, 19:12',
    numericalFr: '31/12/2017, 19:12',
  },
  beforeYesterdayAM: {
    timestamp: '2017-12-02T08:12:13.002',
    humanEn: 'Dec 2, 2017 at 8:12 AM',
    numericalEn: '12/2/2017, 8:12 AM',
    humanFr: '2 Décembre 2017, 8:12',
    numericalFr: '2/12/2017, 8:12',
  },
  yesterdayAM: {
    timestamp: yesterdayAm.toISOString(),
    humanEn: `Yesterday, ${amHours}:${amMinutes} AM`,
    numericalEn: `${getFormattedMonth(
      yesterdayAm,
    )}/${yesterdayAm.getDate()}/${yesterdayAm.getFullYear()}, ${amHours}:${amMinutes} AM`,
    humanFr: `Hier, ${amHours}:${amMinutes}`,
    numericalFr: `${yesterdayAm.getDate()}/${getFormattedMonth(
      yesterdayAm,
      true,
    )}/${yesterdayAm.getFullYear()}, ${amHours}:${amMinutes}`,
  },
  yesterdayPM: {
    timestamp: yesterdayPm.toISOString(),
    humanEn: `Yesterday, ${pmHours - 12}:${pmMinutes} PM`,
    numericalEn: `${getFormattedMonth(yesterdayPm)}/${yesterdayPm.getDate()}/${yesterdayAm.getFullYear()}, ${
      pmHours - 12
    }:${pmMinutes} PM`,
    humanFr: `Hier, ${pmHours}:${pmMinutes}`,
    numericalFr: `${yesterdayAm.getDate()}/${getFormattedMonth(
      yesterdayAm,
      true,
    )}/${yesterdayAm.getFullYear()}, ${pmHours}:${pmMinutes}`,
  },
  todayAM: {
    timestamp: todayAm.toISOString(),
    humanEn: `${amHours}:${amMinutes} AM`,
    numericalEn: `${todayAm.getMonth() + 1}/${todayAm.getDate()}/${todayAm.getFullYear()}, ${amHours}:${amMinutes} AM`,
    humanFr: `${amHours}:${amMinutes}`,
    numericalFr: `${todayAm.getDate()}/${getFormattedMonth(
      todayAm,
      true,
    )}/${todayAm.getFullYear()}, ${amHours}:${amMinutes}`,
  },
  todayPM: {
    timestamp: todayPm.toISOString(),
    humanEn: `${pmHours - 12}:${pmMinutes} PM`,
    numericalEn: `${todayPm.getMonth() + 1}/${todayPm.getDate()}/${todayPm.getFullYear()}, ${
      pmHours - 12
    }:${pmMinutes} PM`,
    humanFr: `${pmHours}:${pmMinutes}`,
    numericalFr: `${todayPm.getDate()}/${getFormattedMonth(
      todayPm,
      true,
    )}/${todayPm.getFullYear()}, ${pmHours}:${pmMinutes}`,
  },
  fewSecondsAgo: {
    timestamp: fewSecondsAgo.toISOString(),
    relativeEn: 'Just now',
    relativeFr: 'Il y a quelques secondes',
  },
  oneMinutesAgo: {
    timestamp: oneMinutesAgo.toISOString(),
    relativeEn: '1 min ago',
    relativeFr: 'Il y a 1 minute',
  },
  tenMinutesAgo: {
    timestamp: tenMinutesAgo.toISOString(),
    relativeEn: '10 mins ago',
    relativeFr: 'Il y a 10 minutes',
  },
};

export const mockTranslateEn = {
  pastanaga: {
    datetime: {
      yesterday: 'Yesterday',
      'a-few-seconds-ago': 'Just now',
      'one-minute-ago': '1 min ago',
      minutesAgo: '{{minutes}} mins ago',
      at: 'at',
    },
  },
};

export const mockTranslateFr = {
  pastanaga: {
    datetime: {
      yesterday: 'Hier',
      'a-few-seconds-ago': 'Maintenant',
      'one-minute-ago': 'Il y a 1 minute',
      at: 'à',
    },
  },
};
