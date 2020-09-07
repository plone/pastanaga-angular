import { async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { InputComponent } from '../input.component';
import { Component, ViewChild } from '@angular/core';
import {
    initTest,
    clearFakeAsyncZone,
    whenUserInputs,
    whenParentSets,
    whenUserBlurControl,
} from '../../../form-field-test-utils.spec';
import {
    testAutocomplete,
    testDebounce,
    testDescribedBy,
    testDisabled,
    testErrorMessage,
    testErrorMessages,
    testFocus,
    testHelp,
    testHtmlTags,
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
    testWriteValueDoNotEmit,
} from './common-behaviors.spec';
import { TextInputType, UpdateOnStrategy } from '../../../form-field.model';

@Component({
    template: ` <pa-input
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
    </pa-input>`,
})
export class TestComponent {
    @ViewChild('paInput') paField?: InputComponent;
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
}

describe('InputFieldComponent standalone', () => {
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

    it('should apply disabled state', fakeAsync(() => testDisabled(fixture)));

    it('should apply showAllErrors', fakeAsync(() => testShowAllErrors(fixture)));

    it('should display errorMessages', fakeAsync(() => testErrorMessages(fixture)));

    it('should not show errors when pristine', fakeAsync(() => testNoErrorForPristine(fixture)));

    it('should apply errorMessage', fakeAsync(() => testErrorMessage(fixture)));

    it('should assign value without emitting', fakeAsync(() => testWriteValueDoNotEmit(fixture)));

    it('should assign type', fakeAsync(() => testType(fixture)));

    it('should assign placeholder', fakeAsync(() => testPlaceholder(fixture)));

    it('should validate required', fakeAsync(() => testRequired(fixture)));

    it('should validate pattern', fakeAsync(() => testPattern(fixture)));

    it('should validate min', fakeAsync(() => testMin(fixture)));

    it('should validate max', fakeAsync(() => testMax(fixture)));

    it('should validate maxlength', fakeAsync(() => testMaxlength(fixture)));

    it('should assign noAutoComplete', fakeAsync(() => testAutocomplete(fixture)));

    it('should apply acceptHtmlTags', fakeAsync(() => testHtmlTags(fixture)));

    it('should change debounceDuration', fakeAsync(() => testDebounce(fixture)));

    it('should propagate keyUp', fakeAsync(() => testKeyup(fixture)));

    it('should not propagate keyUp for tab', fakeAsync(() => testKeyupTab(fixture)));

    it('should propagate enter keyUp', fakeAsync(() => testOnEnter(fixture)));

    it('should propagate focus', fakeAsync(() => testOnFocus(fixture)));

    it('should propagate blur', fakeAsync(() => testOnBlur(fixture)));

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
});
