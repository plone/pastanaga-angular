import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { initTest, clearFakeAsyncZone, thenFieldControlHasId, whenParentSets, whenFormControlSetValue } from '../../form-field-test-utils.spec';
import { By } from '@angular/platform-browser';

import { CheckboxComponent } from './checkbox.component';

@Component({
    template: `<form [formGroup]="form">
        <pa-checkbox
            #paCheckbox
            formControlName="cb"
            type="checkbox"
            [id]="id"
            [name]="name"
            [value]="model"
            (selectedChange)="onValueChange($event)"
            (ngModelChange)="onNgModelChange($event)"
            >Checkbox label</pa-checkbox
        >
    </form> `,
})
export class TestComponent {
    @ViewChild('paCheckbox') paField?: CheckboxComponent;
    form = new FormGroup({
        cb: new FormControl(),
    });
    get formControl() {
        return this.form.get('cb') || new FormControl();
    }
    id?: string;
    name?: string;
    type?: string;
    help?: string;
    model?: boolean;
    selectedChange?: any;

    onValueChange(event: any) {}

    onNgModelChange(event: any) {}
}

describe('CheckboxComponent formControlName', () => {
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
        const control = fixture.debugElement.query(By.css('.pa-toggle-control'));
        expect(control.attributes['name']).toEqual(`checkbox-${nextId}`);
    }));

    it('should apply disabled state', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        disableForm(fixture, 'form');
        enableForm(fixture, 'form');

        clearFakeAsyncZone(fixture);
        disableForm(fixture, 'formControl');
        enableForm(fixture, 'formControl');
    }));

    it('assign value without emitting', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        jest.spyOn(fixture.componentInstance, 'onValueChange');
        whenFormControlSetValue(fixture, fixture.componentInstance.form, { cb: true });
        checkValueEmitted(fixture, true);

        expect(fixture.componentInstance.formControl).toBeTruthy();
        whenFormControlSetValue(fixture, fixture.componentInstance.formControl, false);
        checkValueEmitted(fixture, false);
    }));

    it('should assign type checkbox', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('type', 'checkbox', fixture);

        const control = getElement(fixture);
        expect(control.properties['type']).toEqual('checkbox');
    }));
});

@Component({
    template: `<form [formGroup]="form">
        <pa-checkbox
            #paCheckbox
            formControlName="radio"
            type="radio"
            [id]="id"
            [name]="name"
            [value]="model"
            (selectedChange)="onValueChange($event)"
            (ngModelChange)="onNgModelChange($event)"
            >Radio label</pa-checkbox
        >
    </form> `,
})
export class TestRadioComponent {
    @ViewChild('paCheckbox') paField?: CheckboxComponent;
    form = new FormGroup({
        radio: new FormControl(),
    });
    get formControl() {
        return this.form.get('radio') || new FormControl();
    }
    id?: string;
    name?: string;
    type?: string;
    help?: string;
    model?: boolean;
    selectedChange?: any;

    onValueChange(event: any) {}

    onNgModelChange(event: any) {}
}
describe('RadioComponent formControlName', () => {
    let nextId = 0;
    let fixture: ComponentFixture<TestRadioComponent>;
    beforeEach(async(() => {
        nextId++;
        fixture = initTest(TestRadioComponent, CheckboxComponent);
    }));

    it('should assign type radio', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('type', 'radio', fixture);

        const control = getElement(fixture);
        expect(control.properties['type']).toEqual('radio');
    }));

})

function getElement(fixture: ComponentFixture<any>) {
    return fixture.debugElement.query(By.css('.pa-toggle-control'));
}

function enableForm(fixture: ComponentFixture<any>, type: string) {
    const fixtureInstance = type === 'form'? fixture.componentInstance.form : fixture.componentInstance.formControl;
    fixtureInstance.enable();
    fixture.detectChanges();
    tick();
    const control = getElement(fixture);
    expect(control.properties['disabled']).toEqual(false);
}

function disableForm(fixture: ComponentFixture<any>, type: string) {
    const fixtureInstance = type === 'form'? fixture.componentInstance.form : fixture.componentInstance.formControl;
    fixtureInstance.disable();
    fixture.detectChanges();
    tick();
    const control = getElement(fixture);
    expect(control.properties['disabled']).toEqual(true);
}

function checkValueEmitted(fixture: ComponentFixture<any>, value: boolean) {
    expect(fixture.componentInstance.paField?.model).toEqual(value);
    expect(fixture.componentInstance.paField?.control.value).toEqual(value);
    expect(fixture.componentInstance.onValueChange).not.toHaveBeenCalled();
}

