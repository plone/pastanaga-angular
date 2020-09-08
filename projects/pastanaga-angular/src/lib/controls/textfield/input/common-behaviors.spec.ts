import { ComponentFixture, tick } from '@angular/core/testing';
import {
    clearFakeAsyncZone,
    thenErrorIsDisplayed,
    thenErrorIsNotDisplayed,
    thenFieldControlHasAutoComplete,
    thenFieldControlHasDescribedBy,
    thenFieldControlHasId,
    thenFieldControlHasName,
    thenFieldControlHasPlaceholder,
    thenFieldControlHasType,
    thenFieldControlHasValue,
    thenFieldControlIsDisabled,
    thenFieldControlIsReadonly,
    thenFieldControlIsRequired,
    thenFormFieldHasError,
    thenFormFieldHasHelp,
    thenFormFieldHasNoError,
    trackFieldControlFocusEvent,
    whenParentSets,
    whenUserBlurControl,
    whenUserFocusControl,
    whenUserInputs,
    whenUserKeyUp,
} from '../../form-field-test-utils.spec';
import { Keys } from '../../../common';

it('is a toolkit for input component tests', () => {
    expect(true).toEqual(true);
});

export function testId(fixture: ComponentFixture<any>, nextId: number) {
    clearFakeAsyncZone(fixture);
    whenParentSets('id', undefined, fixture);
    thenFieldControlHasId(fixture, `input-${nextId}`);

    whenParentSets('id', 'testId', fixture);
    thenFieldControlHasId(fixture, 'testId-input');
}

export function testName(fixture: ComponentFixture<any>, nextId: number) {
    clearFakeAsyncZone(fixture);
    whenParentSets('name', undefined, fixture);
    thenFieldControlHasName(fixture, `input-${nextId}`);

    whenParentSets('name', 'testName', fixture);
    thenFieldControlHasName(fixture, 'testName');
}

export function testHelp(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);

    whenParentSets('help', undefined, fixture);
    thenFormFieldHasHelp(fixture, undefined);

    whenParentSets('help', 'help test', fixture);
    thenFormFieldHasHelp(fixture, 'help test');
}

export function testDescribedBy(fixture: ComponentFixture<any>, nextId: number) {
    clearFakeAsyncZone(fixture);

    whenParentSets('describedBy', undefined, fixture);
    thenFieldControlHasDescribedBy(fixture, '');

    whenParentSets('help', 'testHelp', fixture);
    thenFieldControlHasDescribedBy(fixture, `input-${nextId}-help`);

    whenParentSets('help', undefined, fixture);
    whenParentSets('describedBy', 'described-by-test', fixture);
    thenFieldControlHasDescribedBy(fixture, 'described-by-test');
}

export function testReadonly(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);

    whenParentSets('readonly', true, fixture);
    thenFieldControlIsReadonly(fixture, true);

    whenParentSets('readonly', false, fixture);
    thenFieldControlIsReadonly(fixture, false);
}

export function testFocus(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    const spyFocused = trackFieldControlFocusEvent(fixture);
    whenParentSets('hasFocus', true, fixture);
    expect(spyFocused).toHaveBeenCalled();
}

export function testDisabled(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);

    whenParentSets('disabled', true, fixture);
    thenFieldControlIsDisabled(fixture, true);

    whenParentSets('disabled', false, fixture);
    thenFieldControlIsDisabled(fixture, false);
}

export function testShowAllErrors(fixture: ComponentFixture<any>) {
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
}

export function testErrorMessages(fixture: ComponentFixture<any>) {
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
}

export function testNoErrorForPristine(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    whenParentSets('pattern', 'test', fixture);
    whenParentSets('value', 'wrong', fixture);
    thenErrorIsNotDisplayed(fixture);
}

export function testErrorMessage(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);

    whenUserInputs(fixture, 'make component dirty');
    whenParentSets('errorMessage', 'test error message', fixture);
    thenFormFieldHasError(fixture);
    thenErrorIsDisplayed(fixture, 'test error message');

    whenParentSets('errorMessage', undefined, fixture);
    thenFormFieldHasNoError(fixture);
    thenErrorIsNotDisplayed(fixture);
}

export function testWriteValueDoNotEmit(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    jest.spyOn(fixture.componentInstance, 'onValueChange');
    whenParentSets('value', 'test', fixture);
    thenFieldControlHasValue(fixture, 'test');
    expect(fixture.componentInstance.onValueChange).not.toHaveBeenCalled();
}

export function testType(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    whenParentSets('type', 'number', fixture);
    thenFieldControlHasType(fixture, 'number');
    whenParentSets('type', 'email', fixture);
    thenFieldControlHasType(fixture, 'email');
}

export function testPlaceholder(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    whenParentSets('placeholder', 'a placeholder', fixture);
    thenFieldControlHasPlaceholder(fixture, 'a placeholder');
}

export function testRequired(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    whenUserInputs(fixture, 'make component dirty');

    whenParentSets('required', true, fixture);
    thenFieldControlIsRequired(fixture, true);

    whenUserInputs(fixture, '');
    thenFormFieldHasError(fixture);

    whenParentSets('required', false, fixture);
    thenFieldControlIsRequired(fixture, false);
    thenFormFieldHasNoError(fixture);
}

export function testPattern(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    whenUserInputs(fixture, 'make component dirty');

    whenParentSets('pattern', 'test', fixture);
    thenFormFieldHasError(fixture);

    whenUserInputs(fixture, 'test');
    thenFormFieldHasNoError(fixture);
}

export function testMin(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    whenParentSets('type', 'number', fixture);
    whenUserInputs(fixture, 5);

    whenParentSets('min', 7, fixture);
    thenFormFieldHasError(fixture);

    whenParentSets('min', undefined, fixture);
    thenFormFieldHasNoError(fixture);
}

export function testMax(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    whenParentSets('type', 'number', fixture);
    whenUserInputs(fixture, 5);

    whenParentSets('max', 3, fixture);
    thenFormFieldHasError(fixture);

    whenParentSets('max', undefined, fixture);
    thenFormFieldHasNoError(fixture);
}

export function testMaxlength(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    whenUserInputs(fixture, 'a long text');

    whenParentSets('maxlength', 3, fixture);
    thenFormFieldHasError(fixture);

    whenParentSets('maxlength', undefined, fixture);
    thenFormFieldHasNoError(fixture);
}

export function testAutocomplete(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    whenParentSets('noAutoComplete', true, fixture);
    thenFieldControlHasAutoComplete(fixture, 'off');
    whenParentSets('noAutoComplete', false, fixture);
    thenFieldControlHasAutoComplete(fixture, null);
}

export function testHtmlTags(fixture: ComponentFixture<any>) {
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
}

export function testDebounce(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    whenParentSets('debounceDuration', 50, fixture);
    const spy = jest.spyOn(fixture.componentInstance, 'onDebouncedValueChange');
    whenUserInputs(fixture, 'test 50ms');
    expect(spy).not.toHaveBeenCalled();
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
}

export function testKeyup(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    const spy = jest.spyOn(fixture.componentInstance, 'onKeyup');
    whenUserKeyUp(fixture, 'test', undefined);
    expect(spy).toHaveReturnedTimes(1);
    expect(spy).toHaveBeenCalledWith('test');
}

export function testKeyupTab(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    const spy = jest.spyOn(fixture.componentInstance, 'onKeyup');
    whenUserKeyUp(fixture, 'test', Keys.tab);
    expect(spy).not.toHaveBeenCalled();
}

export function testOnEnter(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    const spyEnter = jest.spyOn(fixture.componentInstance, 'onEnter');
    whenUserKeyUp(fixture, 'test', Keys.enter);
    expect(spyEnter).toHaveReturnedTimes(1);
}

export function testOnFocus(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    const spy = jest.spyOn(fixture.componentInstance, 'onFocusing');
    whenUserFocusControl(fixture);
    expect(spy).toHaveReturnedTimes(1);
}

export function testOnBlur(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    const spy = jest.spyOn(fixture.componentInstance, 'onBlurring');
    whenUserBlurControl(fixture);
    expect(spy).toHaveReturnedTimes(1);
}
