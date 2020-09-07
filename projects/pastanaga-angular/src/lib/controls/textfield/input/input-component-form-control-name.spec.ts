import { Component, ViewChild } from '@angular/core';
import { InputComponent } from './input.component';
import { FormControl, FormGroup } from '@angular/forms';
import { async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import {
    clearFakeAsyncZone,
    initTest,
    thenFieldControlHasValue,
    thenFieldControlIsDisabled,
    whenFormControlSetValue,
    whenParentSets,
    whenUserInputs,
} from '../../form-field-test-utils.spec';
import {
    testAutocomplete,
    testDebounce,
    testDescribedBy,
    testErrorMessage,
    testErrorMessages,
    testFocus,
    testHelp,
    testId,
    testKeyup,
    testKeyupTab,
    testMax,
    testMaxlength,
    testMin,
    testName,
    testNoErrorForPristine,
    testOnBlur,
    testOnEnter,
    testOnFocus,
    testPattern,
    testPlaceholder,
    testReadonly,
    testRequired,
    testShowAllErrors,
    testType,
} from './common-behaviors.spec';
import { TextInputType, UpdateOnStrategy } from '../../form-field.model';

@Component({
    template: ` <form [formGroup]="form">
        <pa-input
            #paInput
            formControlName="text"
            [id]="id"
            [name]="name"
            [help]="help"
            [describedBy]="describedBy"
            [readonly]="readonly"
            [hasFocus]="hasFocus"
            [showAllErrors]="showAllErrors"
            [errorMessages]="errorMessages"
            [errorMessage]="errorMessage"
            [updateOn]="updateOn"
            [type]="type"
            [placeholder]="placeholder"
            [required]="required"
            [pattern]="pattern"
            [min]="min"
            [max]="max"
            [maxlength]="maxlength"
            [noAutoComplete]="noAutoComplete"
            [acceptHtmlTags]="acceptHtmlTags"
            [debounceDuration]="debounceDuration"
            (valueChange)="onValueChange($event)"
            (debouncedValueChange)="onDebouncedValueChange($event)"
            (keyUp)="onKeyup($event)"
            (enter)="onEnter($event)"
            (focusing)="onFocusing($event)"
            (blurring)="onBlurring($event)"
            (ngModelChange)="onNgModelChange($event)"
            >Label
        </pa-input>
    </form>`,
})
export class TestComponent {
    @ViewChild('paInput') paField?: InputComponent;
    form = new FormGroup({
        text: new FormControl(),
    });
    get formControl() {
        return this.form.get('text');
    }
    id?: string;
    name?: string;
    help?: string;
    describedBy?: string;
    readonly = false;
    hasFocus = false;
    showAllErrors = false;
    errorMessages?: any;
    errorMessage?: string;
    updateOn: UpdateOnStrategy = 'change';
    value?: string | number;
    type?: TextInputType;
    placeholder?: string;
    required = false;
    pattern?: string | RegExp;
    min?: number;
    max?: number;
    maxlength?: number;
    noAutoComplete = false;
    acceptHtmlTags = false;
    // avoid debouncing for most input-component-tests
    debounceDuration? = 0;

    onValueChange(event: any) {}

    onDebouncedValueChange(event: any) {}

    onKeyup(event: any) {}

    onEnter(event: { event: KeyboardEvent; value: any }) {}

    onFocusing(event: FocusEvent) {}

    onBlurring(event: any) {}

    onNgModelChange(event: any) {}
}

describe('InputFieldComponent FormControlName', () => {
    let nextId = 0;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(async(() => {
        nextId++;
        fixture = initTest(TestComponent);
    }));

    it('should assign id', fakeAsync(() => testId(fixture, nextId)));

    it('should assign name', fakeAsync(() => testName(fixture, nextId)));

    it('should assign help', fakeAsync(() => testHelp(fixture)));

    it('should assign describedBy', fakeAsync(() => testDescribedBy(fixture, nextId)));

    it('should assign readonly', fakeAsync(() => testReadonly(fixture)));

    it('should focus field', fakeAsync(() => testFocus(fixture)));

    it('should apply disabled state', fakeAsync(() => {
        clearFakeAsyncZone(fixture);

        fixture.componentInstance.form.disable();
        fixture.detectChanges();
        tick();
        thenFieldControlIsDisabled(fixture, true);

        fixture.componentInstance.form.enable();
        fixture.detectChanges();
        tick();
        thenFieldControlIsDisabled(fixture, false);

        if (!fixture.componentInstance.formControl) {
            expect(true).toEqual(false);
            return;
        }

        fixture.componentInstance.formControl.disable();
        fixture.detectChanges();
        tick();
        thenFieldControlIsDisabled(fixture, true);

        fixture.componentInstance.formControl.enable();
        fixture.detectChanges();
        tick();
        thenFieldControlIsDisabled(fixture, false);
    }));

    it('should apply showAllErrors', fakeAsync(() => testShowAllErrors(fixture)));

    it('should display errorMessages', fakeAsync(() => testErrorMessages(fixture)));

    it('should not show errors when pristine', fakeAsync(() => testNoErrorForPristine(fixture)));

    it('should apply errorMessage', fakeAsync(() => testErrorMessage(fixture)));

    it('should assign value without emitting', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        jest.spyOn(fixture.componentInstance, 'onValueChange');
        whenFormControlSetValue(fixture, fixture.componentInstance.form, { text: 'test' });
        thenFieldControlHasValue(fixture, 'test');
        expect(fixture.componentInstance.onValueChange).not.toHaveBeenCalled();

        if (!fixture.componentInstance.formControl) {
            expect(true).toEqual(false);
            return;
        }
        whenFormControlSetValue(fixture, fixture.componentInstance.formControl, 'test2');
        thenFieldControlHasValue(fixture, 'test2');
        expect(fixture.componentInstance.onValueChange).not.toHaveBeenCalled();
    }));

    it('should assign type', fakeAsync(() => testType(fixture)));

    it('should assign placeholder', fakeAsync(() => testPlaceholder(fixture)));

    it('should validate required', fakeAsync(() => testRequired(fixture)));

    it('should validate pattern', fakeAsync(() => testPattern(fixture)));

    it('should validate min', fakeAsync(() => testMin(fixture)));

    it('should validate max', fakeAsync(() => testMax(fixture)));

    it('should validate maxlength', fakeAsync(() => testMaxlength(fixture)));

    it('should assign noAutoComplete', fakeAsync(() => testAutocomplete(fixture)));

    it('should apply acceptHtmlTags', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('acceptHtmlTags', false, fixture);
        whenUserInputs(fixture, '<div>');
        thenFieldControlHasValue(fixture, 'div');

        whenFormControlSetValue(fixture, fixture.componentInstance.form, { text: '<span>' });
        thenFieldControlHasValue(fixture, 'span');

        whenParentSets('acceptHtmlTags', true, fixture);
        whenUserInputs(fixture, '<h1>');
        thenFieldControlHasValue(fixture, '<h1>');

        whenFormControlSetValue(fixture, fixture.componentInstance.form, { text: '<h2>' });
        tick();
        thenFieldControlHasValue(fixture, '<h2>');
    }));

    it('should change debounceDuration', fakeAsync(() => testDebounce(fixture)));

    it('should propagate keyUp', fakeAsync(() => testKeyup(fixture)));

    it('should not propagate keyUp for tab', fakeAsync(() => testKeyupTab(fixture)));

    it('should propagate enter keyUp', fakeAsync(() => testOnEnter(fixture)));

    it('should propagate focus', fakeAsync(() => testOnFocus(fixture)));

    it('should propagate blur', fakeAsync(() => testOnBlur(fixture)));
});
