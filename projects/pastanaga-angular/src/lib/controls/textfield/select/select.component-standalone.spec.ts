import { Component, ViewChild } from '@angular/core';
import { PaDropdownModule } from '../../../dropdown/dropdown.module';
import { PaPopupModule } from '../../../popup/popup.module';
import { PaIconModule } from '../../../icon/icon.module';
import { TextInputType, UpdateOnStrategy } from '../../form-field.model';
import { async, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { initTest } from '../../form-field-test-utils.spec';
import {
    testDescribedBy,
    testDisabled,
    testHelp,
    testId,
    testName,
    testNoErrorForPristine,
    testReadonly,
} from '../input/common-behaviors.spec';
import { SelectComponent } from './select.component';
import {
    TEST_OPTIONS,
    testNoChangeForInactive,
    testParentAssignValue,
    testSelectOption,
    testToggleDropDownWithInputClick,
} from './common-behaviors.spec';

@Component({
    template: `
        <pa-select
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
            [placeholder]="placeholder"
            [required]="required"
            [pattern]="pattern"
            [label]="label"
            [maxlength]="maxlength"
            (valueChange)="onValueChange($event)"
            (expanded)="onExpanded($event)"
        >
            <pa-option-header>Users</pa-option-header>
            <pa-option value="user1">User 1</pa-option>
            <pa-option value="user2">User 2</pa-option>
            <pa-option value="user3">User 3</pa-option>
            <pa-option-header>Groups</pa-option-header>
            <pa-option value="group1" disabled>Group 1</pa-option>
            <pa-option value="group2">Group 2</pa-option>
            <pa-option value="group3">Group 3</pa-option>
        </pa-select>
    `,
})
export class TemplateOptionsTestComponent {
    @ViewChild('paInput') paField?: SelectComponent;
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
    maxlength?: number;
    label = 'the label';

    onValueChange(event: any) {}

    onExpanded(event: any) {}
}

describe('SelectComponent standalone template options', () => {
    let nextId = 0;
    let fixture: ComponentFixture<TemplateOptionsTestComponent>;
    beforeEach(async(() => {
        nextId++;
        fixture = initTest(TemplateOptionsTestComponent, SelectComponent, [
            PaIconModule,
            PaDropdownModule,
            PaPopupModule,
        ]);
    }));

    it('should assign id', fakeAsync(() => testId(fixture, nextId, 'select')));

    it('should assign name', fakeAsync(() => testName(fixture, nextId, 'select')));

    it('should assign help', fakeAsync(() => testHelp(fixture)));

    it('should assign describedBy', fakeAsync(() => testDescribedBy(fixture, nextId, 'select')));

    it('should assign readonly', fakeAsync(() => testReadonly(fixture)));

    it('should apply disabled state', fakeAsync(() => testDisabled(fixture)));

    it('should not show errors when pristine', fakeAsync(() => testNoErrorForPristine(fixture)));

    it('should not propagate change when component is not active', fakeAsync(() => testNoChangeForInactive(fixture)));

    it('should toggle option list with input click', fakeAsync(() => testToggleDropDownWithInputClick(fixture)));

    it('should select option from template', fakeAsync(() => testSelectOption(fixture)));

    it('should have parent value selected', fakeAsync(() => testParentAssignValue(fixture)));
});

@Component({
    template: `
        <pa-select
            #paInput
            [options]="options"
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
            [placeholder]="placeholder"
            [required]="required"
            [pattern]="pattern"
            [label]="label"
            [maxlength]="maxlength"
            (valueChange)="onValueChange($event)"
            (expanded)="onExpanded($event)"
        ></pa-select>
    `,
})
export class ParameterOptionsTestComponent {
    @ViewChild('paInput') paField?: SelectComponent;
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
    maxlength?: number;
    label = 'the label';
    options = TEST_OPTIONS;
    onValueChange(event: any) {}

    onExpanded(event: any) {}
}

describe('SelectComponent standalone parameter options', () => {
    let nextId = 0;
    let fixture: ComponentFixture<ParameterOptionsTestComponent>;
    beforeEach(async(() => {
        nextId++;
        fixture = initTest(ParameterOptionsTestComponent, SelectComponent, [
            PaIconModule,
            PaDropdownModule,
            PaPopupModule,
        ]);
    }));

    it('should assign readonly', fakeAsync(() => testReadonly(fixture)));

    it('should apply disabled state', fakeAsync(() => testDisabled(fixture)));

    it('should not show errors when pristine', fakeAsync(() => testNoErrorForPristine(fixture)));

    it('should not propagate change when component is not active', fakeAsync(() => testNoChangeForInactive(fixture)));

    it('should toggle option list with input click', fakeAsync(() => testToggleDropDownWithInputClick(fixture)));

    it('should select option from template', fakeAsync(() => testSelectOption(fixture)));

    it('should have parent value selected', fakeAsync(() => testParentAssignValue(fixture)));
});