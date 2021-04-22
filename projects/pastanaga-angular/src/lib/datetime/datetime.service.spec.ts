import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DATE_FORMAT, DateTimeService } from './datetime.service';

import { TranslatePipe } from '../translate/translate.pipe';
import { dates, mockTranslateEn, mockTranslateFr } from './test-data';
import { PA_TRANSLATIONS } from '../translate/translate.model';

describe('DateTimeService', () => {
    let service: DateTimeService;

    describe('en-US locale', () => {
        beforeEach(() => {
            PA_TRANSLATIONS.en_US = mockTranslateEn;
            service = new DateTimeService(new TranslatePipe('en-US'), 'en-US');
        });

        it('should be defined', () => {
            expect(service).toBeDefined();
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

        describe('getFormattedDate method with displaySeconds option set', () => {
            it('should display time with seconds for human format', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayPM.timestamp, DATE_FORMAT.human, false, true)
                    .subscribe((formattedHuman) => {
                        expect(formattedHuman).toBe(dates.beforeYesterdayPM.humanWithSec);
                        done();
                    });
            });

            it('should display time with seconds for numerical format', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayPM.timestamp, DATE_FORMAT.numerical, false, true)
                    .subscribe((formattedNumerical) => {
                        expect(formattedNumerical).toBe(dates.beforeYesterdayPM.numericalWithSec);
                        done();
                    });
            });
        });
    });

    describe('fr-FR locale', () => {
        beforeEach(() => {
            registerLocaleData(localeFr, 'fr-FR');
            PA_TRANSLATIONS['fr-FR'] = mockTranslateFr;
            service = new DateTimeService(new TranslatePipe('fr-FR'), 'fr-FR');
        });

        describe('getFormattedDate method with human param', () => {
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
    });
});
