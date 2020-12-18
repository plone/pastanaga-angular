import { ComponentFixture, tick } from '@angular/core/testing';
import {
    clearFakeAsyncZone,
    thenErrorIsDisplayed,
    thenErrorIsNotDisplayed,
    thenFormFieldHasError,
    thenFormFieldHasNoError,
    whenParentSets,
    whenUserBlurControl,
    whenUserClicksControl,
} from '../../form-field-test-utils.spec';
import { By } from '@angular/platform-browser';
import { AbstractControl } from '@angular/forms';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '../../control.model';

it('is a toolkit for select component tests', () => {
    expect(true).toEqual(true);
});

export const TEST_OPTIONS: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [
    new OptionHeaderModel({ id: 'users', label: 'Users' }),
    new OptionModel({ id: 'user1', label: 'User 1', value: 'user1', icon: 'audio' }),
    new OptionModel({ id: 'user2', label: 'User 2', value: 'user2', icon: 'audio', disabled: true }),
    new OptionModel({ id: 'user3', label: 'User 3', value: 'user3', icon: 'audio', selected: true }),
    new OptionHeaderModel({ id: 'groups', label: 'Groups' }),
    new OptionModel({ id: 'group1', label: 'Group 1', value: 'group1', icon: 'image' }),
    new OptionModel({ id: 'group2', label: 'Group 2', value: 'group2', icon: 'image' }),
    new OptionModel({ id: 'group3', label: 'Group 3', value: 'group3', icon: 'image' }),
    new OptionSeparator(),
];

/**
 * Theoretical Use Case, user cannot focus/input/blur a readonly or disabled input,
 * unless he hacks the html
 */
export function testNoChangeForInactive(fixture: ComponentFixture<any>) {
    fixture.componentInstance.suggestionMode = true;
    clearFakeAsyncZone(fixture);
    const spyOnChange = jest.spyOn(fixture.componentInstance, 'onValueChange');
    whenParentSets('readonly', true, fixture);
    whenUserClicksControl(fixture);
    whenUserClicksControl(fixture);
    expect(spyOnChange).not.toHaveBeenCalled();
    whenParentSets('readonly', false, fixture);
    whenParentSets('disabled', true, fixture);
    whenUserClicksControl(fixture);
    whenUserClicksControl(fixture);
    whenUserBlurControl(fixture);
    expect(spyOnChange).not.toHaveBeenCalled();
}

/**
 * Theoretical Use Case, user cannot focus/input/blur a readonly or disabled input,
 * unless he hacks the html
 */
export function testNoChangeForInactiveReactive(fixture: ComponentFixture<any>, control: AbstractControl) {
    fixture.componentInstance.suggestionMode = true;
    clearFakeAsyncZone(fixture);
    const spyOnChange = jest.spyOn(fixture.componentInstance, 'onValueChange');

    whenParentSets('readonly', true, fixture);
    whenUserClicksControl(fixture);
    whenUserClicksControl(fixture);
    expect(spyOnChange).not.toHaveBeenCalled();
    whenParentSets('readonly', false, fixture);
    control.disable();
    fixture.detectChanges();
    tick();

    whenUserClicksControl(fixture);
    whenUserClicksControl(fixture);
    expect(spyOnChange).not.toHaveBeenCalled();
}

export function testToggleDropDownWithInputClick(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    thenOptionPopupShouldBeHidden(fixture);
    const spy = jest.spyOn(fixture.componentInstance, 'onExpanded');
    whenUserClicksControl(fixture);
    thenOptionPopupShouldBeDisplayed(fixture);
    expect(spy).toHaveBeenCalledWith(true);
    whenUserClicksControl(fixture);
    thenOptionPopupShouldBeHidden(fixture);
    expect(spy).toHaveBeenCalledWith(false);
}

export function testSelectOption(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    const spy = jest.spyOn(fixture.componentInstance, 'onValueChange');
    whenUserClicksControl(fixture);
    whenUserClicksOption(fixture, 'user1');
    expect(spy).toHaveBeenCalledWith('user1');
}

export function testParentAssignValue(fixture: ComponentFixture<any>) {
    clearFakeAsyncZone(fixture);
    fixture.componentInstance.value = 'user1';
    fixture.detectChanges();
    tick();
    thenSelectHasValue(fixture, 'user1', 'User 1');
    whenUserClicksControl(fixture);
    thenVisibleOptionCountIs(fixture, 6);
    thenSelectedOptionIs(fixture, 'user1');
}

export function testParentAssignValueReactive(fixture: ComponentFixture<any>, control: AbstractControl) {
    clearFakeAsyncZone(fixture);
    control.setValue('user1');
    fixture.detectChanges();
    tick();
    thenSelectHasValue(fixture, 'user1', 'User 1');
    whenUserClicksControl(fixture);
    thenVisibleOptionCountIs(fixture, 6);
    thenSelectedOptionIs(fixture, 'user1');
}

export function testShowAllErrorsForSelect(fixture: ComponentFixture<any>) {
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
    fixture.componentInstance.paField.control.patchValue('no match for all validators');
    whenUserClicksControl(fixture); // open
    whenUserClicksControl(fixture); // close
    thenErrorIsDisplayed(fixture, 'wrong length, wrong pattern');

    whenParentSets('showAllErrors', false, fixture);
    thenErrorIsDisplayed(fixture, 'wrong length');
}

export function testRequiredForSelect(fixture: ComponentFixture<any>) {
    fixture.componentInstance.suggestionMode = true;
    clearFakeAsyncZone(fixture);
    whenParentSets('required', true, fixture);
    whenUserClicksControl(fixture); // open
    whenUserClicksControl(fixture); // close

    expect(fixture.componentInstance.paField.control.valid).toEqual(false);

    whenParentSets('required', false, fixture);
    thenFormFieldHasNoError(fixture);
}

export function testErrorMessagesForSelect(fixture: ComponentFixture<any>) {
    fixture.componentInstance.suggestionMode = true;
    clearFakeAsyncZone(fixture);

    whenParentSets('showAllErrors', true, fixture);
    whenParentSets('pattern', 'test', fixture);
    whenParentSets('maxlength', 2, fixture);
    fixture.componentInstance.paField.control.patchValue('no match for all validators');
    whenUserClicksControl(fixture);
    whenUserClicksControl(fixture);
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

export function thenOptionPopupShouldBeHidden(fixture: ComponentFixture<any>) {
    const popup = fixture.debugElement.query(By.css('.pa-popup'));
    expect(popup.properties.hidden).toEqual(true);
}

export function thenOptionPopupShouldBeDisplayed(fixture: ComponentFixture<any>) {
    const popup = fixture.debugElement.query(By.css('.pa-popup'));
    expect(popup.properties.hidden).toEqual(false);
    const options = fixture.debugElement.queryAll(By.css('.pa-option'));
    expect(options).toBeTruthy();
}

export function whenUserClicksOption(fixture: ComponentFixture<any>, value: string) {
    const option = fixture.debugElement
        .queryAll(By.css('pa-option'))
        .find((opt) => opt.componentInstance.value === value);
    expect(option).toBeTruthy();
    if (!!option) {
        option.componentInstance.onSelect(new MouseEvent('click'));
        fixture.detectChanges();
        tick();
    }
}

export function thenVisibleOptionCountIs(fixture: ComponentFixture<any>, count: number) {
    const option = fixture.debugElement
        .queryAll(By.css('pa-option'))
        .filter((opt) => opt.componentInstance._hidden === false);
    expect(option.length).toEqual(count);
}

export function thenSelectedOptionIs(fixture: ComponentFixture<any>, value: string) {
    const option = fixture.debugElement
        .queryAll(By.css('pa-option'))
        .filter((opt) => opt.componentInstance.selected === true);
    expect(option.length).toEqual(1);
    expect(option[0].componentInstance.value).toEqual(value);
}

export function thenNoOptionSelected(fixture: ComponentFixture<any>) {
    const option = fixture.debugElement
        .queryAll(By.css('pa-option'))
        .filter((opt) => opt.componentInstance.selected === true);
    expect(option.length).toEqual(0);
}

export function thenSelectHasValue(fixture: ComponentFixture<any>, value: string, label: string) {
    expect(fixture.componentInstance.paField.model).toEqual(value);
    expect(fixture.componentInstance.paField.control.value).toEqual(value);
}
