import { Component, ElementRef, ViewChild } from '@angular/core';
import { InputComponent } from '../input.component';
import { async, ComponentFixture, fakeAsync } from '@angular/core/testing';
import {
    clearFakeAsyncZone,
    initTest,
    thenErrorIsDisplayed,
    thenErrorIsNotDisplayed,
    thenFormFieldHasError,
    thenFormFieldHasNoError,
    whenUserInputs,
} from '../../../form-field-test.utils.spec';
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
        [(ngModel)]="value"
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

    onNgModelChange(event: any) {}
}

describe('InputFieldComponent ngModel', () => {
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

    it('should provide ngModelChange', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        const spy = jest.spyOn(fixture.componentInstance, 'onNgModelChange');
        whenUserInputs(fixture, 'a user input');
        expect(spy).toHaveReturnedTimes(1);
        expect(spy).toHaveBeenCalledWith('a user input');
    }));
});

@Component({
    template: ` <pa-input
        #paInput
        [(ngModel)]="value"
        type="email"
        name="name"
        email
        [pattern]="pattern"
        [errorMessages]="errorMessages"
        [debounceDuration]="debounceDuration"
        >Label
    </pa-input>`,
})
export class TestMixedValidationComponent {
    @ViewChild('paInput') paField?: InputComponent;

    value = '';
    pattern = new RegExp('.?test.?');
    errorMessages = {
        pattern: 'pattern error',
        email: 'email error',
    };
    // avoid debouncing for most input-component-tests
    debounceDuration? = 0;
}
describe('InputFieldComponent ngModel mixed validation', () => {
    let fixture: ComponentFixture<TestMixedValidationComponent>;
    beforeEach(async(() => {
        fixture = initTest(TestMixedValidationComponent);
    }));
    it('should display errorMessages for all validators', fakeAsync(() => {
        clearFakeAsyncZone(fixture);

        whenUserInputs(fixture, 'no match for all validators');
        thenFormFieldHasError(fixture);
        thenErrorIsDisplayed(fixture, 'email error, pattern error');

        whenUserInputs(fixture, 'email@invalid.com');
        thenFormFieldHasError(fixture);
        thenErrorIsDisplayed(fixture, 'pattern error');

        whenUserInputs(fixture, 'email@test.com');
        thenFormFieldHasNoError(fixture);
        thenErrorIsNotDisplayed(fixture);
    }));
});

export function thenFormHasStatus(fixture: ComponentFixture<any>, status: string) {
    expect(fixture.componentInstance.form.form.status).toEqual(status);
}

export function thenFormHasValue(fixture: ComponentFixture<any>, value: any) {
    expect(fixture.componentInstance.form.form.value).toEqual(value);
}

@Component({
    template: ` <form #form="ngForm">
        <pa-input
            #paInput
            [(ngModel)]="value"
            type="email"
            name="name"
            email
            [pattern]="pattern"
            [errorMessages]="errorMessages"
            [debounceDuration]="debounceDuration"
            >Label
        </pa-input>
    </form>`,
})
export class TestFormComponent {
    @ViewChild('paInput') paField?: InputComponent;
    @ViewChild('form') form?: ElementRef;

    value = '';
    pattern = new RegExp('.?test.?');
    errorMessages = {
        pattern: 'pattern error',
        email: 'email error',
    };
    // avoid debouncing for most input-component-tests
    debounceDuration? = 0;
}
describe('InputFieldComponent ngModel in a form', () => {
    let fixture: ComponentFixture<TestFormComponent>;
    beforeEach(async(() => {
        fixture = initTest(TestFormComponent);
    }));
    it('should interact with a form', fakeAsync(() => {
        clearFakeAsyncZone(fixture);

        whenUserInputs(fixture, 'no match for all validators');
        thenFormFieldHasError(fixture);
        thenErrorIsDisplayed(fixture, 'email error, pattern error');
        thenFormHasStatus(fixture, 'INVALID');

        whenUserInputs(fixture, 'email@test.com');
        thenFormFieldHasNoError(fixture);
        thenErrorIsNotDisplayed(fixture);
        thenFormHasStatus(fixture, 'VALID');
        thenFormHasValue(fixture, { name: 'email@test.com' });
    }));
});
