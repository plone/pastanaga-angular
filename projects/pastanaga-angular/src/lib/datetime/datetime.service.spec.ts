import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DATE_FORMAT, DateTimeService } from './datetime.service';

import { TranslatePipe } from '../translate/translate.pipe';
import { dates, mockTranslateEn, mockTranslateFr } from './test-data';

describe('DateTimeService', () => {
    let service: DateTimeService;

    describe('en-US locale', () => {
        beforeEach(() => {
            service = new DateTimeService(new TranslatePipe('en-US', { 'en-US': mockTranslateEn }), 'en-US');
        });

        it('should be defined', () => {
            expect(service).toBeDefined();
        });

        describe('getOrdinalSuffixEnglish method', () => {
            it('should return "st" for dates of 1, 21, and 31', () => {
                expect(service.getOrdinalSuffixEnglish('2017-12-31')).toBe('st');
                expect(service.getOrdinalSuffixEnglish('2017-12-21')).toBe('st');
                expect(service.getOrdinalSuffixEnglish('2017-12-01')).toBe('st');
            });

            it('should return "nd" for dates of 2, 22', () => {
                expect(service.getOrdinalSuffixEnglish('2017-12-02')).toBe('nd');
                expect(service.getOrdinalSuffixEnglish('2017-12-22')).toBe('nd');
            });

            it('should return "rd" for dates of 3, 23', () => {
                expect(service.getOrdinalSuffixEnglish('2017-12-03')).toBe('rd');
                expect(service.getOrdinalSuffixEnglish('2017-12-23')).toBe('rd');
            });

            it('should return "th" for any other cases', () => {
                expect(service.getOrdinalSuffixEnglish('2017-12-04')).toBe('th');
                expect(service.getOrdinalSuffixEnglish('2017-12-11')).toBe('th');
                expect(service.getOrdinalSuffixEnglish('2017-12-12')).toBe('th');
                expect(service.getOrdinalSuffixEnglish('2017-12-13')).toBe('th');
                expect(service.getOrdinalSuffixEnglish('2017-12-14')).toBe('th');
                expect(service.getOrdinalSuffixEnglish('2017-12-25')).toBe('th');
                expect(service.getOrdinalSuffixEnglish('2017-12-30')).toBe('th');
            });
        });

        describe('getFormattedDate method with human param', () => {
            it('should return before yesterday afternoon as a full date with PM', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayPM.timestamp, DATE_FORMAT.human)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.beforeYesterdayPM.humanEn);
                        done();
                    });
            });

            it('should format before yesterday morning as a full date with AM', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayAM.timestamp, DATE_FORMAT.human)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.beforeYesterdayAM.humanEn);
                        done();
                    });
            });

            it('should return today morning as today with AM', (done) => {
                service.getFormattedDate(dates.todayAM.timestamp, DATE_FORMAT.human).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.todayAM.humanEn);
                    done();
                });
            });

            it('should format today afternoon as today with PM', (done) => {
                service.getFormattedDate(dates.todayPM.timestamp, DATE_FORMAT.human).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.todayPM.humanEn);
                    done();
                });
            });

            it('should return yesterday morning as yesterday with AM', (done) => {
                service.getFormattedDate(dates.yesterdayAM.timestamp, DATE_FORMAT.human).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.yesterdayAM.humanEn);
                    done();
                });
            });

            it('should format yesterday afternoon as yesterday with PM', (done) => {
                service.getFormattedDate(dates.yesterdayPM.timestamp, DATE_FORMAT.human).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.yesterdayPM.humanEn);
                    done();
                });
            });
        });

        describe('getFormattedDate method with numerical param', () => {
            it('should return before yesterday afternoon as a numerical date without time', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayPM.timestamp, DATE_FORMAT.numerical)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.beforeYesterdayPM.numericalEn);
                        done();
                    });
            });

            it('should format before yesterday morning as a numerical date without time', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayAM.timestamp, DATE_FORMAT.numerical)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.beforeYesterdayAM.numericalEn);
                        done();
                    });
            });

            it('should return today morning as today with AM', (done) => {
                service.getFormattedDate(dates.todayAM.timestamp, DATE_FORMAT.numerical).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.todayAM.numericalEn);
                    done();
                });
            });

            it('should format today afternoon as today with PM', (done) => {
                service.getFormattedDate(dates.todayPM.timestamp, DATE_FORMAT.numerical).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.todayPM.numericalEn);
                    done();
                });
            });

            it('should return yesterday morning as yesterday with AM', (done) => {
                service
                    .getFormattedDate(dates.yesterdayAM.timestamp, DATE_FORMAT.numerical)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.yesterdayAM.numericalEn);
                        done();
                    });
            });

            it('should format yesterday afternoon as yesterday with PM', (done) => {
                service
                    .getFormattedDate(dates.yesterdayPM.timestamp, DATE_FORMAT.numerical)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.yesterdayPM.numericalEn);
                        done();
                    });
            });
        });

        describe('getFormattedDate method with mixed param', () => {
            it('should return before yesterday afternoon as a human date (full date with PM)', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayPM.timestamp, DATE_FORMAT.mixed)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.beforeYesterdayPM.mixedEn);
                        done();
                    });
            });

            it('should format before yesterday morning as a human date (full date with AM)', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayAM.timestamp, DATE_FORMAT.mixed)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.beforeYesterdayAM.mixedEn);
                        done();
                    });
            });

            it('should return yesterday morning as a human date (today with AM)', (done) => {
                service.getFormattedDate(dates.yesterdayAM.timestamp, DATE_FORMAT.mixed).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.yesterdayAM.mixedEn);
                    done();
                });
            });

            it('should format yesterday afternoon as a human date (today with PM)', (done) => {
                service.getFormattedDate(dates.yesterdayPM.timestamp, DATE_FORMAT.mixed).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.yesterdayPM.mixedEn);
                    done();
                });
            });

            it('should format few seconds ago as relative time', (done) => {
                service
                    .getFormattedDate(dates.fewSecondsAgo.timestamp, DATE_FORMAT.mixed)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.fewSecondsAgo.relativeEn);
                        done();
                    });
            });

            it('should format one minute ago as relative time', (done) => {
                service
                    .getFormattedDate(dates.oneMinutesAgo.timestamp, DATE_FORMAT.mixed)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.oneMinutesAgo.relativeEn);
                        done();
                    });
            });

            it('should format 10 minutes ago as relative time', (done) => {
                service
                    .getFormattedDate(dates.tenMinutesAgo.timestamp, DATE_FORMAT.mixed)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.tenMinutesAgo.relativeEn);
                        done();
                    });
            });
        });

        describe('getFormattedDate method with absolute param', () => {
            it('should return before yesterday afternoon as a numerical date with PM', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayPM.timestamp, DATE_FORMAT.absolute)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.beforeYesterdayPM.absoluteEn);
                        done();
                    });
            });

            it('should format before yesterday morning as a numerical date with AM', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayAM.timestamp, DATE_FORMAT.absolute)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.beforeYesterdayAM.absoluteEn);
                        done();
                    });
            });

            it('should return today morning as a numerical date with AM', (done) => {
                service.getFormattedDate(dates.todayAM.timestamp, DATE_FORMAT.absolute).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.todayAM.absoluteEn);
                    done();
                });
            });

            it('should format today afternoon as a numerical date with PM', (done) => {
                service.getFormattedDate(dates.todayPM.timestamp, DATE_FORMAT.absolute).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.todayPM.absoluteEn);
                    done();
                });
            });

            it('should return yesterday morning as a numerical date with AM', (done) => {
                service
                    .getFormattedDate(dates.yesterdayAM.timestamp, DATE_FORMAT.absolute)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.yesterdayAM.absoluteEn);
                        done();
                    });
            });

            it('should format yesterday afternoon as a numerical date with PM', (done) => {
                service
                    .getFormattedDate(dates.yesterdayPM.timestamp, DATE_FORMAT.absolute)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.yesterdayPM.absoluteEn);
                        done();
                    });
            });
        });

        describe('getFormattedDate method with displaySeconds option set', () => {
            it('should display time with seconds for human format', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayPM.timestamp, DATE_FORMAT.human, true)
                    .subscribe((formattedHuman) => {
                        expect(formattedHuman).toBe(dates.beforeYesterdayPM.humanWithSec);
                        done();
                    });
            });

            it('should display no time for numerical format', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayPM.timestamp, DATE_FORMAT.numerical, true)
                    .subscribe((formattedNumerical) => {
                        expect(formattedNumerical).toBe(dates.beforeYesterdayPM.numericalWithSec);
                        done();
                    });
            });

            it('should display time with seconds for absolute format', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayPM.timestamp, DATE_FORMAT.absolute, true)
                    .subscribe((formattedNumerical) => {
                        expect(formattedNumerical).toBe(dates.beforeYesterdayPM.absoluteWithSec);
                        done();
                    });
            });
        });
    });

    describe('fr-FR locale', () => {
        beforeEach(() => {
            registerLocaleData(localeFr, 'fr-FR');
            service = new DateTimeService(new TranslatePipe('fr-FR', { 'fr-FR': mockTranslateFr }), 'fr-FR');
        });

        describe('getFormattedDate method with human param', () => {
            // FIXME: these tests won't work until we upgrade to Angular 5 allowing us to register another locale:
            // https://angular.io/guide/i18n#i18n-pipes
            // No easy way to test it with Angular 4 and it's not urgent as we currently use en-US locale.

            // it('should return before yesterday afternoon as a full date H24', () => {
            //     const formattedDate = service.getFormattedDate(dates.beforeYesterdayPM.timestamp, DATE_FORMAT.human);
            //     expect(formattedDate).toBe(dates.beforeYesterdayPM.humanFr);
            // });
            //
            // it('should format before yesterday morning as a full date H24', () => {
            //     const formattedDate = service.getFormattedDate(dates.beforeYesterdayAM.timestamp, DATE_FORMAT.human);
            //     expect(formattedDate).toBe(dates.beforeYesterdayAM.humanFr);
            // });

            it('should return today morning as today H24', (done) => {
                service.getFormattedDate(dates.todayAM.timestamp, DATE_FORMAT.human).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.todayAM.humanFr);
                    done();
                });
            });

            it('should format today afternoon as today H24', (done) => {
                service.getFormattedDate(dates.todayPM.timestamp, DATE_FORMAT.human).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.todayPM.humanFr);
                    done();
                });
            });

            it('should return yesterday morning as yesterday H24', (done) => {
                service.getFormattedDate(dates.yesterdayAM.timestamp, DATE_FORMAT.human).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.yesterdayAM.humanFr);
                    done();
                });
            });

            it('should format yesterday afternoon as yesterday H24', (done) => {
                service.getFormattedDate(dates.yesterdayPM.timestamp, DATE_FORMAT.human).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.yesterdayPM.humanFr);
                    done();
                });
            });
        });

        describe('getFormattedDate method with numerical param', () => {
            it('should return before yesterday afternoon without time', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayPM.timestamp, DATE_FORMAT.numerical)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.beforeYesterdayPM.numericalFr);
                        done();
                    });
            });

            it('should format before yesterday morning as a numerical date H24', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayAM.timestamp, DATE_FORMAT.numerical)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.beforeYesterdayAM.numericalFr);
                        done();
                    });
            });

            it('should return today morning as today H24', (done) => {
                service.getFormattedDate(dates.todayAM.timestamp, DATE_FORMAT.numerical).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.todayAM.numericalFr);
                    done();
                });
            });

            it('should format today afternoon as today H24', (done) => {
                service.getFormattedDate(dates.todayPM.timestamp, DATE_FORMAT.numerical).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.todayPM.numericalFr);
                    done();
                });
            });

            it('should return yesterday morning as yesterday H24', (done) => {
                service
                    .getFormattedDate(dates.yesterdayAM.timestamp, DATE_FORMAT.numerical)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.yesterdayAM.numericalFr);
                        done();
                    });
            });

            it('should format yesterday afternoon as yesterday H24', (done) => {
                service
                    .getFormattedDate(dates.yesterdayPM.timestamp, DATE_FORMAT.numerical)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.yesterdayPM.numericalFr);
                        done();
                    });
            });
        });

        describe('getFormattedDate method with absolute param', () => {
            it('should return before yesterday afternoon as a numerical date H24', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayPM.timestamp, DATE_FORMAT.absolute)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.beforeYesterdayPM.absoluteFr);
                        done();
                    });
            });

            it('should format before yesterday morning as a numerical date H24', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayAM.timestamp, DATE_FORMAT.absolute)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.beforeYesterdayAM.absoluteFr);
                        done();
                    });
            });

            it('should return today morning as a numerical date H24', (done) => {
                service.getFormattedDate(dates.todayAM.timestamp, DATE_FORMAT.absolute).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.todayAM.absoluteFr);
                    done();
                });
            });

            it('should format today afternoon as a numerical date H24', (done) => {
                service.getFormattedDate(dates.todayPM.timestamp, DATE_FORMAT.absolute).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.todayPM.absoluteFr);
                    done();
                });
            });

            it('should return yesterday morning as a numerical date H24', (done) => {
                service
                    .getFormattedDate(dates.yesterdayAM.timestamp, DATE_FORMAT.absolute)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.yesterdayAM.absoluteFr);
                        done();
                    });
            });

            it('should format yesterday afternoon as a numerical date H24', (done) => {
                service
                    .getFormattedDate(dates.yesterdayPM.timestamp, DATE_FORMAT.absolute)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.yesterdayPM.absoluteFr);
                        done();
                    });
            });
        });

        describe('getFormattedDate method with mixed param', () => {
            // FIXME: these tests won't work until we upgrade to Angular 5 allowing us to register another locale:
            // https://angular.io/guide/i18n#i18n-pipes
            // it('should return before yesterday afternoon as a human date (full date H24)', () => {
            //     const formattedDate = service.getFormattedDate(dates.beforeYesterdayPM.timestamp, DATE_FORMAT.mixed);
            //     expect(formattedDate).toBe(dates.beforeYesterdayPM.mixedFr);
            // });
            //
            // it('should format before yesterday morning as a human date (full date H24)', () => {
            //     const formattedDate = service.getFormattedDate(dates.beforeYesterdayAM.timestamp, DATE_FORMAT.mixed);
            //     expect(formattedDate).toBe(dates.beforeYesterdayAM.mixedFr);
            // });

            it('should return yesterday morning as a human date (today H24)', (done) => {
                service.getFormattedDate(dates.yesterdayAM.timestamp, DATE_FORMAT.mixed).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.yesterdayAM.mixedFr);
                    done();
                });
            });

            it('should format yesterday afternoon as a human date (today H24)', (done) => {
                service.getFormattedDate(dates.yesterdayPM.timestamp, DATE_FORMAT.mixed).subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.yesterdayPM.mixedFr);
                    done();
                });
            });

            it('should format few seconds ago as french relative time', (done) => {
                service
                    .getFormattedDate(dates.fewSecondsAgo.timestamp, DATE_FORMAT.mixed)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.fewSecondsAgo.relativeFr);
                        done();
                    });
            });

            it('should format one minute ago as french relative time', (done) => {
                service
                    .getFormattedDate(dates.oneMinutesAgo.timestamp, DATE_FORMAT.mixed)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.oneMinutesAgo.relativeFr);
                        done();
                    });
            });

            it('should format 10 minutes ago as french relative time', (done) => {
                service
                    .getFormattedDate(dates.tenMinutesAgo.timestamp, DATE_FORMAT.mixed)
                    .subscribe((formattedDate) => {
                        expect(formattedDate).toBe(dates.tenMinutesAgo.relativeFr);
                        done();
                    });
            });
        });
    });
});
