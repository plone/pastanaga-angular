import { ReactiveFormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { addMinutes, addMonths, parse, setMonth, setYear, subMonths } from 'date-fns';
import { MockModule } from 'ng-mocks';
import { DatePickerComponent, Day } from './date-picker.component';
import { PaButtonModule } from '../button';
import { PaIconModule } from '../icon';
import { PaPopupModule } from '../popup';
import { PaTextFieldModule } from '../controls';
import { markForCheck, TRANSITION_DURATION } from '../common';
import { formatDate } from '@angular/common';
import { PaTranslateModule } from '../translate';

jest.mock('../common', () => ({
    markForCheck: jest.fn(),
    TRANSITION_DURATION: {
        moderate: 500,
    },
}));

describe('DatePickerComponent', () => {
    let component: DatePickerComponent;
    let componentAny: any;

    const createComponent = createComponentFactory({
        component: DatePickerComponent,
        imports: [
            MockModule(PaButtonModule),
            MockModule(PaIconModule),
            MockModule(PaPopupModule),
            MockModule(PaTextFieldModule),
            MockModule(PaTranslateModule),
            ReactiveFormsModule,
        ],
    });

    let spectator: Spectator<DatePickerComponent>;

    beforeEach(() => {
        spectator = createComponent();
        componentAny = component = spectator.component;
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('value control changes', () => {
        beforeEach(() => {
            component.inputControl.setValue = jest.fn();
        });

        it('should do nothing for null value', () => {
            // === Execute ===
            component.control.setValue(null);

            // === Verify ===
            expect(component.inputControl.setValue).not.toHaveBeenCalled();
        });

        it('should update input control with value', () => {
            // === Setup ===
            const text = 'March 22, 1980';
            const date = formatDate(text, 'longDate', componentAny.locale);

            // === Execute ===
            component.control.setValue(text);

            // === Verify ===
            expect(component.inputControl.setValue).toHaveBeenCalledWith(date);
        });
    });

    describe('input control changes', () => {
        beforeEach(() => {
            componentAny.generateWeeks = jest.fn();
            componentAny.setDate = jest.fn();
        });

        it('should debounce', () => {
            // === Execute ===
            component.inputControl.setValue(null);

            // === Verify ===
            expect(componentAny.generateWeeks).not.toHaveBeenCalled();

            // === Execute ===
            jest.advanceTimersByTime(TRANSITION_DURATION.moderate);

            // === Verify ===
            expect(componentAny.setDate).toHaveBeenCalled();
            expect(componentAny.generateWeeks).toHaveBeenCalled();
            expect(markForCheck).toHaveBeenCalledWith(componentAny.cdr);
        });

        it('should clear date when there is no value', () => {
            // === Setup ===
            componentAny._selectedDate = new Date();
            component.trackedDate = new Date('2020-01-03');
            const date = new Date();
            jest.setSystemTime(date);

            // === Execute ===
            component.inputControl.setValue(null);
            jest.advanceTimersByTime(TRANSITION_DURATION.moderate);

            // === Verify ===
            expect(componentAny.setDate).toHaveBeenCalledWith(undefined);
            expect(componentAny.generateWeeks).toHaveBeenCalled();
            expect(markForCheck).toHaveBeenCalledWith(componentAny.cdr);
            expect(component.trackedDate.getTime()).toEqual(date.getTime() + TRANSITION_DURATION.moderate);
        });

        it('should clear date for invalid value', () => {
            // === Execute ===
            component.inputControl.setValue('foobar');
            jest.advanceTimersByTime(TRANSITION_DURATION.moderate);

            // === Verify ===
            expect(componentAny.setDate).toHaveBeenCalledWith(undefined);
            expect(componentAny.generateWeeks).toHaveBeenCalled();
            expect(markForCheck).toHaveBeenCalledWith(componentAny.cdr);
        });

        it('should update with date', () => {
            // === Setup ===
            const value = 'March 22, 2022';
            const expected = parse(value, "MMMM d',' yyyy", new Date());

            // === Execute ===
            component.inputControl.setValue(value);
            jest.advanceTimersByTime(TRANSITION_DURATION.moderate);

            // === Verify ===
            expect(componentAny.setDate).toHaveBeenCalledWith(expected);
            expect(componentAny.generateWeeks).toHaveBeenCalled();
            expect(markForCheck).toHaveBeenCalledWith(componentAny.cdr);
        });
    });

    describe('disabled field ', () => {
        it('should set disabled state using string', () => {
            // === Setup ===
            component.setDisabledState = jest.fn();

            // === Execute ===
            component.disabled = 'false';

            // === Verify ===
            expect(component.setDisabledState).toHaveBeenCalledWith(false);
        });

        it('should set disabled state using boolean', () => {
            // === Setup ===
            component.setDisabledState = jest.fn();

            // === Execute ===
            component.disabled = true;

            // === Verify ===
            expect(component.setDisabledState).toHaveBeenCalledWith(true);
        });

        it('should get value from control', () => {
            // === Setup ===
            const getter = jest.spyOn(component.inputControl, 'disabled', 'get').mockReturnValue(true);

            // === Verify ===
            expect(component.disabled).toBe(true);
            expect(getter).toHaveBeenCalled();
        });
    });

    it('should generate weeks', () => {
        // === Setup ===
        component.trackedDate = new Date('2022-7-10');

        // === Execute ===
        componentAny.generateWeeks();

        // === Verify ===
        expect(component.weeks).toMatchSnapshot();
    });

    it('should generate months', () => {
        // === Setup ===
        component.trackedDate = new Date('2022-7-10');

        // === Execute ===
        componentAny.generateMonths();

        // === Verify ===
        expect(component.months).toMatchSnapshot();
    });

    describe('generating years', () => {
        beforeEach(() => {
            jest.setSystemTime(new Date('2022-03-22'));
        });

        it('should max at current year when tracked is earlier', () => {
            // === Setup ===
            component.trackedDate = new Date('2015-4-9');

            // === Execute ===
            componentAny.generateYears();

            // === Verify ===
            expect(component.years).toMatchSnapshot();
        });

        it('should max at tracked year when tracked is later', () => {
            // === Setup ===
            component.trackedDate = new Date('2040-4-9');

            // === Execute ===
            componentAny.generateYears();

            // === Verify ===
            expect(component.years).toMatchSnapshot();
        });

        it('should min at 2000 year when tracked is later', () => {
            // === Setup ===
            component.trackedDate = new Date('2002-4-9');

            // === Execute ===
            componentAny.generateYears();

            // === Verify ===
            expect(component.years).toMatchSnapshot();
        });

        it('should min at tracked year when tracked is earlier', () => {
            // === Setup ===
            component.trackedDate = new Date('1998-4-9');

            // === Execute ===
            componentAny.generateYears();

            // === Verify ===
            expect(component.years).toMatchSnapshot();
        });
    });

    describe('input click handler', () => {
        let event: MouseEvent;

        beforeEach(() => {
            event = {
                stopPropagation: jest.fn(),
                preventDefault: jest.fn(),
            } as any;
        });

        it('should trap events when popup is displayed', () => {
            // === Setup ===
            component.popup = { isDisplayed: true } as any;
            componentAny._touched = false;
            jest.spyOn(component, 'disabled', 'get').mockReturnValue(false);
            component.readonly = false;
            const touched = jest.fn();
            component.registerOnTouched(touched);

            // === Execute ===
            component.handleInputClick(event);

            // === Verify ===
            expect(event.stopPropagation).toHaveBeenCalled();
            expect(event.preventDefault).toHaveBeenCalled();
            expect(touched).toHaveBeenCalled();
        });

        it('should trap events when input is disabled', () => {
            // === Setup ===
            component.popup = { isDisplayed: false } as any;
            componentAny._touched = false;
            jest.spyOn(component, 'disabled', 'get').mockReturnValue(true);
            component.readonly = false;
            const touched = jest.fn();
            component.registerOnTouched(touched);

            // === Execute ===
            component.handleInputClick(event);

            // === Verify ===
            expect(event.stopPropagation).toHaveBeenCalled();
            expect(event.preventDefault).toHaveBeenCalled();
            expect(touched).not.toHaveBeenCalled();
        });

        it('should trap events when input is readonly', () => {
            // === Setup ===
            component.popup = { isDisplayed: false } as any;
            componentAny._touched = false;
            jest.spyOn(component, 'disabled', 'get').mockReturnValue(false);
            component.readonly = true;
            const touched = jest.fn();
            component.registerOnTouched(touched);

            // === Execute ===
            component.handleInputClick(event);

            // === Verify ===
            expect(event.stopPropagation).toHaveBeenCalled();
            expect(event.preventDefault).toHaveBeenCalled();
            expect(touched).not.toHaveBeenCalled();
        });

        it('should not trap events when popup is not displayed', () => {
            // === Setup ===
            component.popup = { isDisplayed: false } as any;
            const touched = jest.fn();
            component.registerOnTouched(touched);

            // === Execute ===
            component.handleInputClick(event);

            // === Verify ===
            expect(event.stopPropagation).not.toHaveBeenCalled();
            expect(event.preventDefault).not.toHaveBeenCalled();
            expect(touched).toHaveBeenCalled();
        });
    });

    describe('popup close handler', () => {
        it('should set tracked date to selected date', () => {
            // === Setup ===
            componentAny._selectedDate = new Date();

            // === Execute ===
            component.handlePopupClose();

            // === Verify ===
            expect(component.trackedDate).toBe(componentAny._selectedDate);
        });

        it('should set tracked date to a new date', () => {
            // === Setup ===
            const date = new Date();
            jest.setSystemTime(date);

            // === Execute ===
            component.handlePopupClose();

            // === Verify ===
            expect(component.trackedDate).toEqual(date);
        });
    });

    it('should open weeks', () => {
        // === Setup ===
        const event: Event = { stopPropagation: jest.fn() } as any;
        componentAny.generateWeeks = jest.fn();

        // === Execute ===
        component.openWeeks(event);

        // === Verify ===
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(componentAny.generateWeeks).toHaveBeenCalled();
        expect(component.mode).toBe('weeks');
    });

    it('should open years', () => {
        // === Setup ===
        const event: Event = { stopPropagation: jest.fn() } as any;
        componentAny.generateYears = jest.fn();

        // === Execute ===
        component.openYears(event);

        // === Verify ===
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(componentAny.generateYears).toHaveBeenCalled();
        expect(component.mode).toBe('years');
    });

    it('should open months', () => {
        // === Setup ===
        const event: Event = { stopPropagation: jest.fn() } as any;
        componentAny.generateMonths = jest.fn();

        // === Execute ===
        component.openMonths(event);

        // === Verify ===
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(componentAny.generateMonths).toHaveBeenCalled();
        expect(component.mode).toBe('months');
    });

    it('should update to previous month', () => {
        // === Setup ===
        const date = new Date();
        component.trackedDate = date;
        componentAny.generateWeeks = jest.fn();

        // === Execute ===
        component.previousMonth();

        // === Verify ===
        expect(component.trackedDate).toEqual(subMonths(date, 1));
        expect(componentAny.generateWeeks).toHaveBeenCalled();
    });

    it('should update to next month', () => {
        // === Setup ===
        const date = new Date();
        component.trackedDate = date;
        componentAny.generateWeeks = jest.fn();

        // === Execute ===
        component.nextMonth();

        // === Verify ===
        expect(component.trackedDate).toEqual(addMonths(date, 1));
        expect(componentAny.generateWeeks).toHaveBeenCalled();
    });

    it('should select year', () => {
        // === Setup ===
        component.trackedDate = new Date('2022-05-02');
        component.openWeeks = jest.fn();
        const event = {} as Event;

        // === Execute ===
        component.selectYear(event, 1980);

        // === Verify ===
        expect(component.trackedDate).toEqual(setYear(component.trackedDate, 1980));
        expect(component.openWeeks).toHaveBeenCalledWith(event);
    });

    it('should select month', () => {
        // === Setup ===
        component.trackedDate = new Date('2022-05-02');
        component.openWeeks = jest.fn();
        const event = {} as Event;

        // === Execute ===
        component.selectMonth(event, 11);

        // === Verify ===
        expect(component.trackedDate).toEqual(setMonth(component.trackedDate, 11));
        expect(component.openWeeks).toHaveBeenCalledWith(event);
    });

    it('should select day', () => {
        // === Setup ===
        component.popupDirective!.toggle = jest.fn();
        const setDate = (componentAny.setDate = jest.fn());
        const day = {
            date: new Date(),
        } as Day;
        component.input = {
            htmlInputRef: {
                nativeElement: {
                    focus: jest.fn(),
                },
            },
        } as any;

        // === Execute ===
        component.selectDay(day);

        // === Verify ===
        expect(setDate).toHaveBeenCalledWith(day.date);
        expect(component.input?.htmlInputRef?.nativeElement.focus).toHaveBeenCalled();
    });

    describe('setting date', () => {
        beforeEach(() => {
            component.onChange = jest.fn();
        });

        it('should use date value', () => {
            // === Setup ===
            const date = new Date();
            const expected = addMinutes(date, date.getTimezoneOffset() * -1);

            // === Execute ===
            componentAny.setDate(date);

            // === Verify ===
            expect(componentAny._selectedDate).toEqual(expected);
            expect(component.trackedDate).toEqual(expected);
            expect(component.onChange).toHaveBeenCalledWith(expected);
        });

        it('should handle undefined', () => {
            // === Setup ===
            const expected = new Date();
            jest.setSystemTime(expected);

            // === Execute ===
            componentAny.setDate(undefined);

            // === Verify ===
            expect(componentAny._selectedDate).toEqual(undefined);
            expect(component.trackedDate).toEqual(expected);
            expect(component.onChange).toHaveBeenCalledWith(undefined);
        });
    });

    it('should set disabled state', () => {
        // === Execute ===
        component.setDisabledState(true);

        // === Verify ===
        expect(component.disabled).toBe(true);
    });

    describe('setting disabled state', () => {
        it('should do nothing if already enabled', () => {
            // === Setup ===
            component.setDisabledState(false);
            component.inputControl.enable = jest.fn();

            // === Execute ===
            component.setDisabledState(false);

            // === Verify ===
            expect(component.inputControl.enable).not.toHaveBeenCalled();
        });

        it('should do nothing if already disabled', () => {
            // === Setup ===
            component.setDisabledState(true);
            component.inputControl.disable = jest.fn();

            // === Execute ===
            component.setDisabledState(true);

            // === Verify ===
            expect(component.inputControl.disable).not.toHaveBeenCalled();
        });

        it('should become disabled', () => {
            // === Setup ===
            component.setDisabledState(false);
            component.inputControl.disable = jest.fn();

            // === Execute ===
            component.setDisabledState(true);

            // === Verify ===
            expect(component.inputControl.disable).toHaveBeenCalled();
        });

        it('should become enabled', () => {
            // === Setup ===
            component.setDisabledState(true);
            component.inputControl.enable = jest.fn();

            // === Execute ===
            component.setDisabledState(false);

            // === Verify ===
            expect(component.inputControl.enable).toHaveBeenCalled();
        });
    });
});
