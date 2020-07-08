import { DatePipe, FormatWidth, getLocaleDateFormat } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { isToday, isYesterday } from 'date-fns';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslatePipe } from '../translate/translate.pipe';

/**
 * Date and time spec: https://docs.google.com/document/d/1VNtaS9_jmbcWRqYi3EkCk925rvTP1kczD73cD732-KM
 *
 * DATE_FORMAT:
 *  - human:
 *      - format date before yesterday as full sentence like 'December 31st 2017, 7:12PM'
 *      - format today/yesterday like 'Today, 8:13AM'
 *  - numerical:
 *      - format date before yesterday as numerical date without time like '12/31/2017'
 *      - format today/yesterday with time like 'Today, 8:13AM'
 *  - mixed:
 *      - format date before yesterday as human date like 'December 31st 2017, 7:12PM'
 *      - format today/yesterday as human date like 'Today, 8:13AM'
 *      - format few seconds/minutes ago as relative time like 'A few seconds ago' or '10 minutes ago'
 *  - absolute:
 *      - format all dates as numerical date with time like '12/31/2017, 7:12PM'
 */
export enum DATE_FORMAT {
    human = 'human',
    numerical = 'numerical',
    mixed = 'mixed',
    absolute = 'absolute',
}

export class StringMap {
    today: { key: string; value: string };
    yesterday: { key: string; value: string };
    fewSecondsAgo: { key: string; value: string };
    oneMinuteAgo: { key: string; value: string };
    minutesAgo: { key: string; value: string };

    constructor(translateMap?: { [key: string]: string }) {
        this.today = { key: 'pastanaga.datetime.today', value: '' };
        this.yesterday = { key: 'pastanaga.datetime.yesterday', value: '' };
        this.fewSecondsAgo = { key: 'pastanaga.datetime.a-few-seconds-ago', value: '' };
        this.oneMinuteAgo = { key: 'pastanaga.datetime.one-minute-ago', value: '' };
        this.minutesAgo = { key: 'pastanaga.datetime.minutesAgo', value: '' };

        if (translateMap) {
            this.today.value = translateMap[this.today.key];
            this.yesterday.value = translateMap[this.yesterday.key];
            this.fewSecondsAgo.value = translateMap[this.fewSecondsAgo.key];
            this.oneMinuteAgo.value = translateMap[this.oneMinuteAgo.key];
            this.minutesAgo.value = translateMap[this.minutesAgo.key];
        }
    }
}

@Injectable({
    providedIn: 'root',
})
export class DateTimeService {
    strings: ReplaySubject<StringMap> = new ReplaySubject(1);
    localeDatePipe: DatePipe;
    cache: { [key: string]: string | null } = {};
    numericalFormat: string;

    constructor(private translate: TranslatePipe, @Inject(LOCALE_ID) private locale: string) {
        const stringMap = new StringMap();
        const stringKeys: string[] = Object.values(stringMap).map((item) => item.key);
        const values = stringKeys.reduce((acc: { [key: string]: string }, key) => {
            acc[key] = this.translate.transform(key);
            return acc;
        }, {});
        this.strings.next(new StringMap(values));
        this.localeDatePipe = new DatePipe(this.locale || 'en');
        this.numericalFormat = getLocaleDateFormat(this.locale, FormatWidth.Short);
    }

    /**
     * Returns an observable containing the formatted date as a string.
     * @param timestamp: string representation of a date which can be used with `new Date(timestamp)`
     * (timestamp coming directly from backend can be used). All timestamp should have a timezone set so final date is correct.
     * @param format: format to use.
     * @param displaySeconds: false by default
     * @param useTags: use <abbr title="${meridian}"></abbr> tags for the time. true by default
     */
    getFormattedDate(
        timestamp: string,
        format: DATE_FORMAT,
        displaySeconds?: boolean,
        useTags = true
    ): Observable<string | null> {
        if (format === DATE_FORMAT.human || format === DATE_FORMAT.numerical) {
            return this.getRelativeFormattedDate(timestamp, format, displaySeconds, useTags);
        } else if (format === DATE_FORMAT.mixed) {
            return this.getMixedFormattedDate(timestamp, displaySeconds, useTags);
        } else if (format === DATE_FORMAT.absolute) {
            return of(this.getBeforeYesterdayAsNumericalDate(timestamp, displaySeconds, useTags));
        } else {
            throw new Error(`Unknown OnnaTime format: ${format}`);
        }
    }

    getRelativeFormattedDate(
        timestamp: string,
        format: string,
        displaySeconds?: boolean,
        useTags = true
    ): Observable<string | null> {
        const date = new Date(timestamp);
        return this.strings.pipe(
            map((strings) => {
                if (isToday(date)) {
                    return `${strings.today.value}, ${this.getFormattedTime(timestamp, displaySeconds, useTags)}`;
                } else if (isYesterday(date)) {
                    return `${strings.yesterday.value}, ${this.getFormattedTime(timestamp, displaySeconds, useTags)}`;
                } else {
                    return format === DATE_FORMAT.human
                        ? this.getBeforeYesterdayAsHumanDate(timestamp, displaySeconds, useTags)
                        : this.getBeforeYesterdayAsNumericalDate(timestamp, displaySeconds, useTags, false);
                }
            })
        );
    }

    getMixedFormattedDate(timestamp: string, displaySeconds?: boolean, useTags = true): Observable<string | null> {
        const dateFromTimestamp = new Date(timestamp);
        const distanceFromNowInSeconds = this.getDistanceFromNowInSeconds(dateFromTimestamp);

        if (distanceFromNowInSeconds > 30 * 60) {
            return this.getRelativeFormattedDate(timestamp, DATE_FORMAT.human, displaySeconds, useTags);
        } else {
            return this.getFormattedRelativeTime(distanceFromNowInSeconds);
        }
    }

    getFormattedRelativeTime(distanceFromNowInSeconds: number): Observable<string> {
        return this.strings.pipe(
            map((strings) => {
                if (distanceFromNowInSeconds < 60) {
                    return strings.fewSecondsAgo.value;
                } else if (distanceFromNowInSeconds < 120) {
                    return strings.oneMinuteAgo.value;
                } else {
                    const minutes: string = Math.ceil(distanceFromNowInSeconds / 60).toString(10);
                    return strings.minutesAgo.value.replace('{{minutes}}', minutes);
                }
            })
        );
    }

    getDistanceFromNowInSeconds(datetime: Date): number {
        const today = new Date().getTime();
        const dateFromTimestamp = datetime.getTime();

        return Math.ceil((today - dateFromTimestamp) / 1000);
    }

    /*
     * Angular DatePipe doesn't support ordinal in dates: https://github.com/angular/angular/issues/14448
     * This function works only for english dates (I don't know if other languages have ordinal in dates).
     */
    getOrdinalSuffixEnglish(timestamp: string): string {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const day = new Date(timestamp).getDate();
        const relevantDigits = day < 30 ? day % 20 : day % 30;

        return relevantDigits <= 3 ? suffixes[relevantDigits] : suffixes[0];
    }

    getMeridianString(timestamp: string): string {
        const meridian = this.transform(timestamp, 'a');

        return !!meridian && meridian.toLowerCase() === 'am' ? 'Ante Meridiem' : 'Post Meridiem';
    }

    private getBeforeYesterdayAsHumanDate(timestamp: string, displaySeconds?: boolean, useTags = true) {
        const ordinal = this.getOrdinalSuffixEnglish(timestamp);
        let pattern = `d MMMM yyyy, '${this.getFormattedTime(timestamp, displaySeconds, useTags)}'`;
        if (this.locale === 'en-US' || this.locale === 'en') {
            pattern = `MMMM d'<sup>${ordinal}</sup>' yyyy, '${this.getFormattedTime(
                timestamp,
                displaySeconds,
                useTags
            )}'`;
        } else if (this.locale.startsWith('en-')) {
            pattern = `d'<sup>${ordinal}</sup>' MMMM yyyy, '${this.getFormattedTime(
                timestamp,
                displaySeconds,
                useTags
            )}'`;
        }

        return this.transform(timestamp, pattern);
    }

    private getBeforeYesterdayAsNumericalDate(
        timestamp: string,
        displaySeconds?: boolean,
        useTags = true,
        displayTime = true
    ) {
        let pattern = `d/MM/yyyy`;

        if (this.locale === 'en-US' || this.locale === 'en') {
            pattern = `M/d/yyyy`;
        }

        if (displayTime) {
            const formattedTime = this.getFormattedTime(timestamp, displaySeconds, useTags);
            pattern += `, '${formattedTime}'`;
        }

        return this.transform(timestamp, pattern);
    }

    private getFormattedTime(timestamp: string, displaySeconds?: boolean, useTags = true): string | null {
        const meridian = this.getMeridianString(timestamp);
        let pattern: string;

        if (useTags) {
            pattern = displaySeconds
                ? `h:mm:ss '<abbr title="${meridian}">'a'</abbr>'`
                : `h:mm '<abbr title="${meridian}">'a'</abbr>'`;
        } else {
            pattern = displaySeconds ? `h:mm:ss a` : `h:mm a`;
        }

        // spec said only US is using AM/PM :
        // https://docs.google.com/document/d/1VNtaS9_jmbcWRqYi3EkCk925rvTP1kczD73cD732-KM/edit#heading=h.ajjlrvq0fflk
        if (this.locale !== 'en-US' && this.locale !== 'en') {
            pattern = displaySeconds ? 'H:mm:ss' : 'H:mm';
        }

        return this.transform(timestamp, pattern);
    }

    private transform(timestamp: string, pattern: string): string | null {
        const cacheKey = 'LOCAL-' + timestamp + pattern;
        if (!this.cache[cacheKey]) {
            this.cache[cacheKey] = this.localeDatePipe.transform(timestamp, pattern);
        }
        return this.cache[cacheKey];
    }
}
