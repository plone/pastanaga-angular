import '@angular/common/locales/global/fr';
import { DateTimeService } from './datetime.service';

import { dates } from './test-data';

describe('DateTimeService', () => {
    let service: DateTimeService;

    describe('en-US locale', () => {
        beforeEach(() => {
            service = new DateTimeService('en-US');
        });

        it('should be defined', () => {
            expect(service).toBeDefined();
        });

        describe('getFormattedDate method with human param', () => {
            it('should return before yesterday afternoon as a full date with PM', (done) => {
                service.getFormattedDate(dates.beforeYesterdayPM.timestamp, 'human').subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.beforeYesterdayPM.humanEn);
                    done();
                });
            });

            it('should format before yesterday morning as a full date with AM', (done) => {
                service.getFormattedDate(dates.beforeYesterdayAM.timestamp, 'human').subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.beforeYesterdayAM.humanEn);
                    done();
                });
            });

            it('should return today morning as today with AM', (done) => {
                service.getFormattedDate(dates.todayAM.timestamp, 'human').subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.todayAM.humanEn);
                    done();
                });
            });

            it('should format today afternoon as today with PM', (done) => {
                service.getFormattedDate(dates.todayPM.timestamp, 'human').subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.todayPM.humanEn);
                    done();
                });
            });

            it('should return yesterday morning as yesterday with AM', (done) => {
                service.getFormattedDate(dates.yesterdayAM.timestamp, 'human').subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.yesterdayAM.humanEn);
                    done();
                });
            });

            it('should format yesterday afternoon as yesterday with PM', (done) => {
                service.getFormattedDate(dates.yesterdayPM.timestamp, 'human').subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.yesterdayPM.humanEn);
                    done();
                });
            });
        });

        describe('getFormattedDate method with numerical param', () => {
            it('should return before yesterday afternoon as a numerical date without time', (done) => {
                service.getFormattedDate(dates.beforeYesterdayPM.timestamp, 'numerical').subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.beforeYesterdayPM.numericalEn);
                    done();
                });
            });

            it('should format before yesterday morning as a numerical date without time', (done) => {
                service.getFormattedDate(dates.beforeYesterdayAM.timestamp, 'numerical').subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.beforeYesterdayAM.numericalEn);
                    done();
                });
            });

            it('should return today morning as today with AM', (done) => {
                service.getFormattedDate(dates.todayAM.timestamp, 'numerical').subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.todayAM.numericalEn);
                    done();
                });
            });

            it('should format today afternoon as today with PM', (done) => {
                service.getFormattedDate(dates.todayPM.timestamp, 'numerical').subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.todayPM.numericalEn);
                    done();
                });
            });

            it('should return yesterday morning as yesterday with AM', (done) => {
                service.getFormattedDate(dates.yesterdayAM.timestamp, 'numerical').subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.yesterdayAM.numericalEn);
                    done();
                });
            });

            it('should format yesterday afternoon as yesterday with PM', (done) => {
                service.getFormattedDate(dates.yesterdayPM.timestamp, 'numerical').subscribe((formattedDate) => {
                    expect(formattedDate).toBe(dates.yesterdayPM.numericalEn);
                    done();
                });
            });
        });

        describe('getFormattedDate method with displaySeconds option set', () => {
            it('should display time with seconds for human format', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayPM.timestamp, 'human', false, true)
                    .subscribe((formattedHuman) => {
                        expect(formattedHuman).toBe(dates.beforeYesterdayPM.humanWithSec);
                        done();
                    });
            });

            it('should display time with seconds for numerical format', (done) => {
                service
                    .getFormattedDate(dates.beforeYesterdayPM.timestamp, 'numerical', false, true)
                    .subscribe((formattedNumerical) => {
                        expect(formattedNumerical).toBe(dates.beforeYesterdayPM.numericalWithSec);
                        done();
                    });
            });
        });
    });
});
