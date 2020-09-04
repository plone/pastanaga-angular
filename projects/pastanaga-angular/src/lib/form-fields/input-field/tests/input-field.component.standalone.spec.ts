import { async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { InputFieldComponent } from './input-field.component';
import { Component, ViewChild } from '@angular/core';
import {
    initTest,
    clearFakeAsyncZone,
    thenFieldControlHasId,
    thenFieldControlHasName,
    thenFormFieldHasHelp,
    thenFieldControlHasDescribedBy,
    thenFieldControlIsReadonly,
    trackFieldControlFocusEvent,
    thenFieldControlIsDisabled,
    whenUserInputs,
    thenErrorIsDisplayed,
    thenFormFieldHasError,
    thenErrorIsNotDisplayed,
    thenFormFieldHasNoError,
    thenFieldControlHasValue,
    thenFieldControlHasType,
    thenFieldControlHasPlaceholder,
    whenParentSets,
    thenFieldControlIsRequired,
    thenFieldControlHasAutoComplete,
    whenUserKeyUp,
    whenUserFocusControl,
    whenUserBlurControl,
} from '../form-field-test.utils.spec';
import { Keys } from '../../common';

@Component({
    template: ` <pa-input-field
        #paInput
        [id]="id"
        [name]="name"
        [help]="help"
        [describedBy]="describedBy"
        [readonly]="readonly"
        [hasFocus]="hasFocus"
        [disabled]="disabled"
        [showAllErrors]="showAllErrors"
        [errorMessages]="errorMessages"
        [errorMessage]="errorMessage"
        [updateOn]="updateOn"
        [value]="value"
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
        >Label
    </pa-input-field>`,
})
export class TestComponent {
    @ViewChild('paInput') paField?: InputFieldComponent;
    id?: string;
    name?: string;
    help?: string;
    describedBy?: string;
    readonly = false;
    hasFocus = false;
    disabled = false;
    showAllErrors = false;
    errorMessages?: any;
    errorMessage?: string;
    updateOn = 'change';
    value?: string | number;
    type?: string;
    placeholder?: string;
    required = false;
    pattern?: string | RegExp;
    min?: number;
    max?: number;
    maxlength?: number;
    noAutoComplete = false;
    acceptHtmlTags = false;
    // avoid debouncing for most tests
    debounceDuration? = 0;

    onValueChange(event: any) {}

    onDebouncedValueChange(event: any) {}

    onKeyup(event: any) {}

    onEnter(event: { event: KeyboardEvent; value: any }) {}

    onFocusing(event: FocusEvent) {}

    onBlurring(event: any) {}
}

describe('InputFieldComponent standalone', () => {
    let nextId = 0;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(async(() => {
        nextId++;
        fixture = initTest(TestComponent);
    }));

    it('should assign id', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('id', undefined, fixture);
        thenFieldControlHasId(fixture, `input-${nextId}`);

        whenParentSets('id', 'testId', fixture);
        thenFieldControlHasId(fixture, 'testId-input');
    }));

    it('should assign name', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('name', undefined, fixture);
        thenFieldControlHasName(fixture, `input-${nextId}`);

        whenParentSets('name', 'testName', fixture);
        thenFieldControlHasName(fixture, null);
    }));

    it('should assign help', fakeAsync(() => {
        clearFakeAsyncZone(fixture);

        whenParentSets('help', undefined, fixture);
        thenFormFieldHasHelp(fixture, undefined);

        whenParentSets('help', 'help test', fixture);
        thenFormFieldHasHelp(fixture, 'help test');
    }));

    it('should assign describedBy', fakeAsync(() => {
        clearFakeAsyncZone(fixture);

        whenParentSets('describedBy', undefined, fixture);
        thenFieldControlHasDescribedBy(fixture, '');

        whenParentSets('help', 'testHelp', fixture);
        thenFieldControlHasDescribedBy(fixture, `input-${nextId}-help`);

        whenParentSets('help', undefined, fixture);
        whenParentSets('describedBy', 'described-by-test', fixture);
        thenFieldControlHasDescribedBy(fixture, 'described-by-test');
    }));

    it('should assign readonly', fakeAsync(() => {
        clearFakeAsyncZone(fixture);

        whenParentSets('readonly', true, fixture);
        thenFieldControlIsReadonly(fixture, true);

        whenParentSets('readonly', false, fixture);
        thenFieldControlIsReadonly(fixture, false);
    }));

    it('should focus field', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        const spyFocused = trackFieldControlFocusEvent(fixture);
        whenParentSets('hasFocus', true, fixture);
        expect(spyFocused).toHaveBeenCalled();
    }));

    it('should apply disabled state', fakeAsync(() => {
        clearFakeAsyncZone(fixture);

        whenParentSets('disabled', true, fixture);
        thenFieldControlIsDisabled(fixture, true);

        whenParentSets('disabled', false, fixture);
        thenFieldControlIsDisabled(fixture, false);
    }));

    it('should apply showAllErrors', fakeAsync(() => {
        clearFakeAsyncZone(fixture);

        whenParentSets('showAllErrors', true, fixture);
        whenParentSets(
            'errorMessages',
            {
                maxlength: 'wrong length',
                pattern: 'wrong pattern',
            },
            fixture
        );
        whenParentSets('pattern', 'test', fixture);
        whenParentSets('maxlength', 2, fixture);
        whenUserInputs(fixture, 'no match for all validators');
        thenErrorIsDisplayed(fixture, 'wrong length, wrong pattern');

        whenParentSets('showAllErrors', false, fixture);
        thenErrorIsDisplayed(fixture, 'wrong length');
    }));

    it('should display errorMessages', fakeAsync(() => {
        clearFakeAsyncZone(fixture);

        whenParentSets('showAllErrors', true, fixture);
        whenParentSets('pattern', 'test', fixture);
        whenParentSets('maxlength', 2, fixture);
        whenUserInputs(fixture, 'no match for all validators');
        thenFormFieldHasError(fixture);
        thenErrorIsNotDisplayed(fixture);

        whenParentSets(
            'errorMessages',
            {
                maxlength: 'wrong length',
                pattern: 'wrong pattern',
            },
            fixture
        );
        thenErrorIsDisplayed(fixture, 'wrong length, wrong pattern');
    }));

    it('should not show errors when pristine', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('pattern', 'test', fixture);
        whenParentSets('value', 'wrong', fixture);
        thenErrorIsNotDisplayed(fixture);
    }));

    it('should apply errorMessage', fakeAsync(() => {
        clearFakeAsyncZone(fixture);

        whenUserInputs(fixture, 'make component dirty');
        whenParentSets('errorMessage', 'test error message', fixture);
        thenFormFieldHasError(fixture);
        thenErrorIsDisplayed(fixture, 'test error message');

        whenParentSets('errorMessage', undefined, fixture);
        thenFormFieldHasNoError(fixture);
        thenErrorIsNotDisplayed(fixture);
    }));

    it('should change updateOn strategy', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('updateOn', 'change', fixture);
        jest.spyOn(fixture.componentInstance, 'onValueChange');
        whenUserInputs(fixture, 'anything');
        expect(fixture.componentInstance.onValueChange).toHaveBeenCalledWith('anything');

        whenParentSets('updateOn', 'blur', fixture);
        whenUserInputs(fixture, 'something else');
        // onValueChange not triggered
        expect(fixture.componentInstance.onValueChange).toHaveReturnedTimes(1);
        whenUserBlurControl(fixture);
        expect(fixture.componentInstance.onValueChange).toHaveReturnedTimes(2);
        expect(fixture.componentInstance.onValueChange).toHaveBeenCalledWith('something else');
    }));

    it('should assign value without emitting', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        jest.spyOn(fixture.componentInstance, 'onValueChange');
        whenParentSets('value', 'test', fixture);
        thenFieldControlHasValue(fixture, 'test');
        expect(fixture.componentInstance.onValueChange).toHaveReturnedTimes(0);
    }));

    it('should assign type', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('type', 'number', fixture);
        thenFieldControlHasType(fixture, 'number');
        whenParentSets('type', 'email', fixture);
        thenFieldControlHasType(fixture, 'email');
    }));

    it('should assign placeholder', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('placeholder', 'a placeholder', fixture);
        thenFieldControlHasPlaceholder(fixture, 'a placeholder');
    }));

    it('should validate required', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenUserInputs(fixture, 'make component dirty');

        whenParentSets('required', true, fixture);
        thenFieldControlIsRequired(fixture, true);

        whenUserInputs(fixture, '');
        thenFormFieldHasError(fixture);

        whenParentSets('required', false, fixture);
        thenFieldControlIsRequired(fixture, false);
        thenFormFieldHasNoError(fixture);
    }));

    it('should validate pattern', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenUserInputs(fixture, 'make component dirty');

        whenParentSets('pattern', 'test', fixture);
        thenFormFieldHasError(fixture);

        whenUserInputs(fixture, 'test');
        thenFormFieldHasNoError(fixture);
    }));

    it('should validate min', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('type', 'number', fixture);
        whenUserInputs(fixture, 5);

        whenParentSets('min', 7, fixture);
        thenFormFieldHasError(fixture);

        whenParentSets('min', undefined, fixture);
        thenFormFieldHasNoError(fixture);
    }));

    it('should validate max', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('type', 'number', fixture);
        whenUserInputs(fixture, 5);

        whenParentSets('max', 3, fixture);
        thenFormFieldHasError(fixture);

        whenParentSets('max', undefined, fixture);
        thenFormFieldHasNoError(fixture);
    }));

    it('should validate maxlength', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenUserInputs(fixture, 'a long text');

        whenParentSets('maxlength', 3, fixture);
        thenFormFieldHasError(fixture);

        whenParentSets('maxlength', undefined, fixture);
        thenFormFieldHasNoError(fixture);
    }));

    it('should assign noAutoComplete', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('noAutoComplete', true, fixture);
        thenFieldControlHasAutoComplete(fixture, 'off');
        whenParentSets('noAutoComplete', false, fixture);
        thenFieldControlHasAutoComplete(fixture, null);
    }));

    it('should apply acceptHtmlTags', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('acceptHtmlTags', false, fixture);
        whenUserInputs(fixture, '<div>');
        thenFieldControlHasValue(fixture, 'div');

        whenParentSets('value', '<span>', fixture);
        thenFieldControlHasValue(fixture, 'span');

        whenParentSets('acceptHtmlTags', true, fixture);
        whenUserInputs(fixture, '<h1>');
        thenFieldControlHasValue(fixture, '<h1>');

        whenParentSets('value', '<h2>', fixture);
        thenFieldControlHasValue(fixture, '<h2>');
    }));

    it('should change debounceDuration', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('debounceDuration', 50, fixture);
        const spy = jest.spyOn(fixture.componentInstance, 'onDebouncedValueChange');
        whenUserInputs(fixture, 'test 50ms');
        expect(spy).toHaveReturnedTimes(0);
        tick(50);
        expect(spy).toHaveReturnedTimes(1); // spy returns twice when eventEmitter triggers once
        expect(spy).toHaveBeenCalledWith('test 50ms');

        whenParentSets('debounceDuration', undefined, fixture);
        whenUserInputs(fixture, 'test default 500ms');
        expect(spy).toHaveReturnedTimes(1);
        tick(50);
        expect(spy).toHaveReturnedTimes(1);
        tick(450);
        expect(spy).toHaveReturnedTimes(2);
        expect(spy).toHaveBeenCalledWith('test default 500ms');
    }));

    it('should trigger debounceValueChange when updateOn is blur', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('debounceDuration', 10, fixture);
        whenParentSets('updateOn', 'blur', fixture);
        const spy = jest.spyOn(fixture.componentInstance, 'onDebouncedValueChange');
        whenUserInputs(fixture, 'test 10ms');
        expect(spy).toHaveReturnedTimes(0);
        tick(10);
        expect(spy).toHaveReturnedTimes(0);
        whenUserBlurControl(fixture);
        expect(spy).toHaveReturnedTimes(0);
        tick(10);
        expect(spy).toHaveReturnedTimes(1);
        expect(spy).toHaveBeenCalledWith('test 10ms');
    }));

    it('should propagate keyUp', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        const spy = jest.spyOn(fixture.componentInstance, 'onKeyup');
        whenUserKeyUp(fixture, 'test', undefined);
        expect(spy).toHaveReturnedTimes(1);
        expect(spy).toHaveBeenCalledWith('test');
    }));

    it('should not propagate keyUp for tab', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        const spy = jest.spyOn(fixture.componentInstance, 'onKeyup');
        whenUserKeyUp(fixture, 'test', Keys.tab);
        expect(spy).toHaveReturnedTimes(0);
    }));

    it('should propagate enter keyUp', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        const spyEnter = jest.spyOn(fixture.componentInstance, 'onEnter');
        whenUserKeyUp(fixture, 'test', Keys.enter);
        expect(spyEnter).toHaveReturnedTimes(1);
    }));

    it('should not propagate change when component is not active', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        const spyOnChange = jest.spyOn(fixture.componentInstance, 'onValueChange');
        whenParentSets('readonly', true, fixture);
        whenUserInputs(fixture, 'test');
        expect(spyOnChange).toHaveReturnedTimes(0);
        whenParentSets('readonly', false, fixture);
        whenParentSets('disabled', true, fixture);
        whenUserInputs(fixture, 'test');
        expect(spyOnChange).toHaveReturnedTimes(0);
    }));

    it('should propagate focus', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        const spy = jest.spyOn(fixture.componentInstance, 'onFocusing');
        whenUserFocusControl(fixture);
        expect(spy).toHaveReturnedTimes(1);
    }));

    it('should propagate blur', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        const spy = jest.spyOn(fixture.componentInstance, 'onBlurring');
        whenUserBlurControl(fixture);
        expect(spy).toHaveReturnedTimes(1);
    }));
});
