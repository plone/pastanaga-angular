import { async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import {
    initTest,
    clearFakeAsyncZone,
    thenFieldControlHasValue,
    whenParentSets,
    whenFormControlSetValue,
} from '../../form-field-test-utils.spec';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CheckboxComponent } from './checkbox.component';

@Component({
    template: `<div>
        <pa-checkbox
            #paCheckbox
            [formControl]="formControl"
            type="checkbox"
            [id]="id"
            [name]="name"
            [value]="model"
            (ngModelChange)="onNgModelChange($event)"
            (selectedChange)="onValueChange($event)"
            >Checkbox label</pa-checkbox
        >
    </div> `,
})
export class TestComponent {
    @ViewChild('paCheckbox') paField?: CheckboxComponent;
    formControl = new FormControl();
    id?: string;
    name?: string;
    type?: string;
    help?: string;
    model?: boolean;
    selectedChange?: any;

    onValueChange(event: any) {}

    onNgModelChange(event: any) {}
}

describe('CheckboxComponent formControl', () => {
    let nextId = 0;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(async(() => {
        nextId++;
        fixture = initTest(TestComponent, CheckboxComponent);
    }));

    it('should assign an id', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('id', undefined, fixture);
        let control = getElement(fixture);
        expect(control.properties['id']).toEqual(`checkbox-${nextId}`);

        whenParentSets('id', 'testId', fixture);
        control = getElement(fixture);
        expect(control.properties['id']).toEqual(`testId-checkbox`);
    }));

    it('should assign a name', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('name', undefined, fixture);
        const control = getElement(fixture);
        expect(control.attributes['name']).toEqual(`checkbox-${nextId}`);
    }));

    it('should apply disabled state', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        fixture.componentInstance.formControl.disable();
        fixture.detectChanges();
        tick();
        let control = getElement(fixture);
        expect(control.properties['disabled']).toEqual(true);

        fixture.componentInstance.formControl.enable();
        fixture.detectChanges();
        tick();
        control = getElement(fixture);
        expect(control.properties['disabled']).toEqual(false);
    }));

    it('should assign value without emitting', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        jest.spyOn(fixture.componentInstance, 'onValueChange');
        whenFormControlSetValue(fixture, fixture.componentInstance.formControl, true);
        expect(fixture.componentInstance.paField?.model).toEqual(true);
        expect(fixture.componentInstance.paField?.control.value).toEqual(true);

        const control = getElement(fixture);
        expect(control.nativeElement.checked).toEqual(true);

        expect(fixture.componentInstance.onValueChange).not.toHaveBeenCalled();
    }));

    it('should assign type checkbox', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('type', 'checkbox', fixture);

        let control = getElement(fixture);
        expect(control.properties['type']).toEqual('checkbox');
    }));
});

@Component({
    template: `<div>
        <pa-checkbox
            #paCheckbox
            [formControl]="formControl"
            type="radio"
            [id]="id"
            [name]="name"
            [value]="model"
            (ngModelChange)="onNgModelChange($event)"
            (selectedChange)="onValueChange($event)"
            >Radio label</pa-checkbox
        >
    </div> `,
})
export class TestRadioComponent {
    @ViewChild('paCheckbox') paField?: CheckboxComponent;
    formControl = new FormControl();
    id?: string;
    name?: string;
    type?: string;
    help?: string;
    model?: boolean;
    selectedChange?: any;

    onValueChange(event: any) {}

    onNgModelChange(event: any) {}
}

describe('RadioComponent formControl', () => {
    let nextId = 0;
    let fixture: ComponentFixture<TestRadioComponent>;
    beforeEach(async(() => {
        nextId++;
        fixture = initTest(TestRadioComponent, CheckboxComponent);
    }));

    it('should assign type radio', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('type', 'radio', fixture);
        let control = getElement(fixture);
        expect(control.properties['type']).toEqual('radio');
    }));
})

function getElement(fixture: ComponentFixture<any>) {
    return fixture.debugElement.query(By.css('.pa-toggle-control'));
}
