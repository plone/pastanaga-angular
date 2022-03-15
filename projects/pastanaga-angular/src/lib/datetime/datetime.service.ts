import { DatePipe, FormatWidth, getLocaleDateFormat } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { isToday, isYesterday, isThisMinute, differenceInMinutes, isThisYear } from 'date-fns';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslatePipe } from '../translate';

/**
 * Date and time spec: https://docs.google.com/document/d/1VNtaS9_jmbcWRqYi3EkCk925rvTP1kczD73cD732-KM
 *
 * DATE_FORMAT:
 *  - human:
 *      - format few seconds/minutes ago as relative time like 'Just now' or '10 minutes ago'
 *      - format today/yesterday as human date like 'Today, 8:13AM'
 *      - format date before yesterday like 'Dec 31, 2017'
 *  - numerical:
 *      - format date as numerical date like '12/31/2017'
 */
export type DateFormat = 'human' | 'numerical';

export class StringMap {
    yesterday: { key: string; value: string };
    fewSecondsAgo: { key: string; value: string };
    oneMinuteAgo: { key: string; value: string };
    minutesAgo: { key: string; value: string };
    at: { key: string; value: string };

    constructor(translateMap?: { [key: string]: string }) {
        this.yesterday = { key: 'pastanaga.datetime.yesterday', value: '' };
        this.fewSecondsAgo = { key: 'pastanaga.datetime.a-few-seconds-ago', value: '' };
        this.oneMinuteAgo = { key: 'pastanaga.datetime.one-minute-ago', value: '' };
        this.minutesAgo = { key: 'pastanaga.datetime.minutesAgo', value: '' };
        this.at = { key: 'pastanaga.datetime.at', value: '' };

        if (translateMap) {
            this.yesterday.value = translateMap[this.yesterday.key];
            this.fewSecondsAgo.value = translateMap[this.fewSecondsAgo.key];
            this.oneMinuteAgo.value = translateMap[this.oneMinuteAgo.key];
            this.minutesAgo.value = translateMap[this.minutesAgo.key];
            this.at.value = translateMap[this.at.key];
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
     * @param dateOnly: false by default
     * @param displaySeconds: false by default
     */
    getFormattedDate(
        timestamp: string,
        format: DateFormat,
        dateOnly = false,
        displaySeconds = false
    ): Observable<string | null> {
        if (format !== 'human' && format !== 'numerical') {
            throw new Error(`Unknown date/time format: ${format}`);
        } else {
            if (format === 'numerical') {
                return of(this.getNumericalDate(timestamp, dateOnly, displaySeconds));
            } else {
                return this.getHumanDate(timestamp, dateOnly, displaySeconds);
            }
        }
    }

    private getNumericalDate(timestamp: string, dateOnly: boolean, displaySeconds: boolean): string | null {
        let pattern = `d/MM/yyyy`;

        if (this.locale === 'en-US' || this.locale === 'en') {
            pattern = `M/d/yyyy`;
        }

        if (!dateOnly) {
            const formattedTime = this.getFormattedTime(timestamp, displaySeconds);
            pattern += `, '${formattedTime}'`;
        }

        return this.transform(timestamp, pattern);
    }

    private getHumanDate(timestamp: string, dateOnly: boolean, displaySeconds: boolean): Observable<string | null> {
        const date = new Date(timestamp);
        const now = new Date();
        return this.strings.pipe(
            map((strings) => {
                const diff = differenceInMinutes(now, date);
                if (isThisMinute(date)) {
                    return strings.fewSecondsAgo.value;
                } else if (diff >= 0 && diff <= 1) {
                    return strings.oneMinuteAgo.value;
                } else if (diff >= 0 && diff <= 15) {
                    return strings.minutesAgo.value.replace('{{minutes}}', `${diff}`);
                } else if (isToday(date)) {
                    return this.getFormattedTime(timestamp, displaySeconds);
                } else if (isYesterday(date)) {
                    return `${strings.yesterday.value}, ${this.getFormattedTime(timestamp, displaySeconds)}`;
                } else if (isThisYear(date)) {
                    const formatted = this.transform(timestamp, 'MMM d');
                    return dateOnly ? formatted : `${formatted}, ${this.getFormattedTime(timestamp, displaySeconds)}`;
                } else {
                    const formatted = this.transform(timestamp, 'MMM d, y');
                    return dateOnly
                        ? formatted
                        : `${formatted} ${strings.at.value} ${this.getFormattedTime(timestamp, displaySeconds)}`;
                }
            })
        );
    }

    private getFormattedTime(timestamp: string, displaySeconds?: boolean): string | null {
        let pattern = displaySeconds ? `h:mm:ss a` : `h:mm a`;
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
