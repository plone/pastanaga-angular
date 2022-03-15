import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PA_LANG, PaTranslateModule, TranslatePipe } from '../translate';
import { DateTimeComponent } from './datetime.component';
import { DateTimeService } from './datetime.service';
import { dates, mockTranslateEn } from './test-data';

describe('DateTimeComponent', () => {
    let component: DateTimeComponent;
    let fixture: ComponentFixture<DateTimeComponent>;
    let span: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DateTimeComponent],
            imports: [PaTranslateModule.addTranslations([{ en_US: { ...mockTranslateEn } }])],
            providers: [DateTimeService, TranslatePipe, { provide: PA_LANG, useValue: 'en_US' }],
            teardown: { destroyAfterEach: false },
        });
        fixture = TestBed.createComponent(DateTimeComponent);
        component = fixture.componentInstance;
        span = fixture.nativeElement.querySelector('span');
    });

    it('should display date in human by default', () => {
        component.datetime = dates.beforeYesterdayPM.timestamp;

        component.ngOnChanges({
            datetime: new SimpleChange(null, component.datetime, true),
        });
        fixture.detectChanges();
        expect(span.innerHTML).toBe(dates.beforeYesterdayPM.humanEn);
    });

    it('should display date in numerical', () => {
        component.datetime = dates.beforeYesterdayPM.timestamp;
        component.format = 'numerical';

        component.ngOnChanges({
            datetime: new SimpleChange(null, component.datetime, true),
            format: new SimpleChange(null, component.format, true),
        });
        fixture.detectChanges();
        expect(span.innerHTML).toBe(dates.beforeYesterdayPM.numericalEn);
    });

    it('should display date in numerical with seconds', () => {
        component.datetime = dates.beforeYesterdayPM.timestamp;
        component.format = 'numerical';
        component.displaySeconds = true;

        component.ngOnChanges({
            datetime: new SimpleChange(null, component.datetime, true),
            format: new SimpleChange(null, component.format, true),
            displaySeconds: new SimpleChange(null, component.displaySeconds, true),
        });
        fixture.detectChanges();
        expect(span.innerHTML).toBe(dates.beforeYesterdayPM.numericalWithSec);
    });

    it('should display date in human date only', () => {
        component.datetime = dates.beforeYesterdayPM.timestamp;
        component.dateOnly = true;

        component.ngOnChanges({
            datetime: new SimpleChange(null, component.datetime, true),
            dateOnly: new SimpleChange(null, component.dateOnly, true),
        });
        fixture.detectChanges();
        expect(span.innerHTML).toBe(dates.beforeYesterdayPM.humanDateOnlyEn);
    });

    it('should display date with seconds', () => {
        component.datetime = dates.beforeYesterdayPM.timestamp;
        component.format = 'numerical';
        component.displaySeconds = true;

        component.ngOnChanges({
            datetime: new SimpleChange(null, component.datetime, true),
            format: new SimpleChange(null, component.format, true),
            displaySeconds: new SimpleChange(null, component.displaySeconds, true),
        });
        fixture.detectChanges();
        expect(span.innerHTML).toBe(dates.beforeYesterdayPM.numericalWithSec);
    });
});
