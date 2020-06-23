import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatePipe } from '../translate/translate.pipe';
import { DateTimeComponent } from './datetime.component';
import { DATE_FORMAT, DateTimeService } from './datetime.service';
import { dates, mockTranslateEn } from './test-data';

describe('DateTimeComponent', () => {
    let component: DateTimeComponent;
    let fixture: ComponentFixture<DateTimeComponent>;
    let span: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DateTimeComponent],
            providers: [
                DateTimeService,
                TranslatePipe,
                {provide: 'LANG', useValue: 'en_US'},
                {provide: 'TRANSLATIONS', useValue: {'en_US': {...mockTranslateEn} as any}},
            ],
        });
        fixture = TestBed.createComponent(DateTimeComponent);
        component = fixture.componentInstance;
        span = fixture.nativeElement.querySelector('span');
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should display date in human by default', () => {
        component.datetime = dates.beforeYesterdayPM.timestamp;

        component.ngOnChanges({
            datetime: new SimpleChange(null, component.datetime, true)
        });
        fixture.detectChanges();
        expect(span.innerHTML).toBe(dates.beforeYesterdayPM.humanEn);
    });

    it('should display date in numerical', () => {
        component.datetime = dates.beforeYesterdayPM.timestamp;
        component.format = DATE_FORMAT.numerical;

        component.ngOnChanges({
            datetime: new SimpleChange(null, component.datetime, true),
            format: new SimpleChange(null, component.format, true),
        });
        fixture.detectChanges();
        expect(span.innerHTML).toBe(dates.beforeYesterdayPM.numericalEn);
    });

    it('should display date in numerical with seconds', () => {
        component.datetime = dates.beforeYesterdayPM.timestamp;
        component.format = DATE_FORMAT.numerical;
        component.displaySeconds = true;

        component.ngOnChanges({
            datetime: new SimpleChange(null, component.datetime, true),
            format: new SimpleChange(null, component.format, true),
            displaySeconds: new SimpleChange(null, component.displaySeconds, true),
        });
        fixture.detectChanges();
        expect(span.innerHTML).toBe(dates.beforeYesterdayPM.numericalWithSec);
    });

    it('should display date in absolute', () => {
        component.datetime = dates.beforeYesterdayPM.timestamp;
        component.format = DATE_FORMAT.absolute;

        component.ngOnChanges({
            datetime: new SimpleChange(null, component.datetime, true),
            format: new SimpleChange(null, component.format, true),
        });
        fixture.detectChanges();
        expect(span.innerHTML).toBe(dates.beforeYesterdayPM.absoluteEn);
    });

    it('should display date in absolute with seconds', () => {
        component.datetime = dates.beforeYesterdayPM.timestamp;
        component.format = DATE_FORMAT.absolute;
        component.displaySeconds = true;

        component.ngOnChanges({
            datetime: new SimpleChange(null, component.datetime, true),
            format: new SimpleChange(null, component.format, true),
            displaySeconds: new SimpleChange(null, component.displaySeconds, true),
        });
        fixture.detectChanges();
        expect(span.innerHTML).toBe(dates.beforeYesterdayPM.absoluteWithSec);
    });

    it('should display date in mixed when date is one minute ago', () => {
        component.datetime = dates.oneMinutesAgo.timestamp;
        component.format = DATE_FORMAT.mixed;

        component.ngOnChanges({
            datetime: new SimpleChange(null, component.datetime, true),
            format: new SimpleChange(null, component.format, true),
        });
        fixture.detectChanges();
        expect(span.innerHTML).toBe(dates.oneMinutesAgo.relativeEn);
    });

    it('should display date in mixed when date is ten minutes ago', () => {
        component.datetime = dates.tenMinutesAgo.timestamp;
        component.format = DATE_FORMAT.mixed;

        component.ngOnChanges({
            datetime: new SimpleChange(null, component.datetime, true),
            format: new SimpleChange(null, component.format, true),
        });
        fixture.detectChanges();
        expect(span.innerHTML).toBe(dates.tenMinutesAgo.relativeEn);
    });
});
