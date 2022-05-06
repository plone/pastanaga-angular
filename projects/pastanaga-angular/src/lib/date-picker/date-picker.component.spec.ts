import { ReactiveFormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { addMonths, format, parse, setMonth, setYear, subMonths } from 'date-fns';
import { MockModule } from 'ng-mocks';
import { DatePickerComponent, Day } from './date-picker.component';
import { PaButtonModule } from '../button';
import { PaIconModule } from '../icon';
import { PaPopupModule } from '../popup';
import { PaTextFieldModule } from '../controls';

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

    describe('form control changes', () => {
        beforeEach(() => {
            componentAny.generateWeeks = jest.fn();
            componentAny.cd.markForCheck = jest.fn();
        });

        it('should debounce', () => {
            // === Execute ===
            component.formControl.setValue(null);

            // === Verify ===
            expect(componentAny.generateWeeks).not.toHaveBeenCalled();
            expect(componentAny.cd.markForCheck).not.toHaveBeenCalled();

            // === Execute ===
            jest.advanceTimersByTime(500);

            // === Verify ===
            expect(componentAny.generateWeeks).toHaveBeenCalled();
            expect(componentAny.cd.markForCheck).toHaveBeenCalled();
        });

        it('should clear date when there is no value', () => {
            // === Setup ===
            componentAny._selectedDate = new Date();
            component.trackedDate = new Date('2020-01-03');
            const date = new Date();
            jest.setSystemTime(date);

            // === Execute ===
            component.formControl.setValue(null);
            jest.advanceTimersByTime(500);

            // === Verify ===
            expect(componentAny._selectedDate).toBe(undefined);
            expect(component.trackedDate.getTime()).toEqual(date.getTime() + 500);
        });

        it('should clear date for invalid value', () => {
            // === Setup ===
            const tracked = component.trackedDate = new Date();

            // === Execute ===
            component.formControl.setValue('foobar');
            jest.advanceTimersByTime(500);

            // === Verify ===
            expect(componentAny._selectedDate).toBe(undefined);
            expect(component.trackedDate).toBe(tracked);
        });

        it('should update with date', () => {
            // === Setup ===
            const value = 'March 22, 2022';
            const expected = parse(value, "MMMM d',' yyyy", new Date());

            // === Execute ===
            component.formControl.setValue(value);
            jest.advanceTimersByTime(500);

            // === Verify ===
            expect(componentAny._selectedDate).toEqual(expected);
            expect(component.trackedDate).toEqual(expected);
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
            const touched = jest.fn();
            component.registerOnTouched(touched);

            // === Execute ===
            component.handleInputClick(event);

            // === Verify ===
            expect(event.stopPropagation).toHaveBeenCalled();
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('should not trap events when popup is not displayed', () => {
            // === Setup ===
            component.popup = { isDisplayed: false } as any;
            componentAny._touched = false;

            // === Execute ===
            component.handleInputClick(event);

            // === Verify ===
            expect(event.stopPropagation).not.toHaveBeenCalled();
            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        it('should mark as touched', () => {
            // === Setup ===
            const touched = jest.fn();
            component.registerOnTouched(touched);

            // === Execute ===
            component.handleInputClick(event);

            // === Verify ===
            expect(touched).toHaveBeenCalled();
            expect(componentAny._touched).toBe(true);
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
        const spy = jest.spyOn(component, 'date', 'set');
        const onChange = jest.fn();
        component.registerOnChange(onChange);
        const day = {
            date: new Date(),
        } as Day;

        // === Execute ===
        component.selectDay(day);

        // === Verify ===
        expect(spy).toHaveBeenCalledWith(day.date);
        expect(onChange).toHaveBeenCalledWith(day.date);
    });

    describe('updating input', () => {
        beforeEach(() => {
            component.formControl.setValue = jest.fn();
        });

        it('should format selected date', () => {
            // === Setup ===
            const date = new Date();
            componentAny._selectedDate = date;

            // === Execute ===
            componentAny._updateInput();

            // === Verify ===
            expect(component.formControl.setValue).toHaveBeenCalledWith(format(date, "MMMM d',' yyyy"));
        });

        it('should do nothing when no date is selected', () => {
            // === Execute ===
            componentAny._updateInput();

            // === Verify ===
            expect(component.formControl.setValue).not.toHaveBeenCalled();
        });
    });

    it('should write date only when defined', () => {
        // === Setup ===
        const expected = new Date();
        const spy = jest.spyOn(component, 'date', 'set');

        // === Execute ===
        component.writeValue(expected);

        // === Verify ===
        expect(spy).toHaveBeenCalledWith(expected);

        // === Execute ===
        component.writeValue(null as any);

        // === Verify ===
        expect(spy).not.toHaveBeenCalledWith(null);
    });

    it('should register on change', () => {
        // === Setup ===
        const expected = jest.fn();

        // === Execute ===
        component.registerOnChange(expected);

        // === Verify ===
        expect(componentAny._onChange).toBe(expected);
    });

    it('should register on touched', () => {
        // === Setup ===
        const expected = jest.fn();

        // === Execute ===
        component.registerOnTouched(expected);

        // === Verify ===
        expect(componentAny._onTouched).toBe(expected);
    });

    it('should set disabled state', () => {
        // === Execute ===
        component.setDisabledState(true);

        // === Verify ===
        expect(component.disabled).toBe(true);
    });
});
