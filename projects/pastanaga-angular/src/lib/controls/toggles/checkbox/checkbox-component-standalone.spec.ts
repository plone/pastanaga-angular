import { async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { initTest, clearFakeAsyncZone, whenParentSets } from '../../form-field-test-utils.spec';
import { By } from '@angular/platform-browser';

import { CheckboxComponent } from './checkbox.component';

@Component({
    template: `<div>
        <pa-checkbox
            #paCheckbox
            type="checkbox"
            [id]="id"
            [name]="name"
            [disabled]="disabled"
            [value]="model"
            (selectedChange)="onValueChange($event)"
            >Checkbox label</pa-checkbox
        >
    </div> `,
})
export class TestComponent {
    @ViewChild('paCheckbox') paField?: CheckboxComponent;
    id?: string;
    name?: string;
    type?: string;
    help?: string;
    disabled = false;
    model?: boolean;
    selectedChange?: any;

    onValueChange(event: any) {}
}

describe('CheckboxComponent standalone', () => {
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
        whenParentSets('disabled', true, fixture);
        const control = getElement(fixture);
        expect(control.properties.disabled).toEqual(true);
    }));

    it('should assign value without emitting', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        jest.spyOn(fixture.componentInstance, 'onValueChange');
        whenParentSets('model', true, fixture);
        expect(fixture.componentInstance.paField?.model).toEqual(true);
        expect(fixture.componentInstance.paField?.control.value).toEqual(true);
        expect(fixture.componentInstance.onValueChange).not.toHaveBeenCalled();
    }));

    it('should assign type checkbox', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('type', 'checkbox', fixture);

        let control = getElement(fixture);
        expect(control.properties['type']).toEqual('checkbox');
    }));

    it('should change updateOn strategy', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        whenParentSets('updateOn', 'change', fixture);
        jest.spyOn(fixture.componentInstance, 'onValueChange');

        const nativeElement = getElement(fixture).nativeElement;
        nativeElement.click();
        fixture.detectChanges();
        tick();

        expect(fixture.componentInstance.paField?.model).toEqual(true);
    }));

    it('should not propagate change when component is not active', fakeAsync(() => {
        clearFakeAsyncZone(fixture);
        const spyOnChange = jest.spyOn(fixture.componentInstance, 'onValueChange');
        whenParentSets('disabled', true, fixture);

        const nativeElement = getElement(fixture).nativeElement;
        nativeElement.click();
        fixture.detectChanges();
        tick();
        expect(spyOnChange).not.toHaveBeenCalled();
    }));
});

@Component({
    template: `<div>
        <pa-checkbox
            #paCheckbox
            type="radio"
            [id]="id"
            [name]="name"
            [disabled]="disabled"
            [value]="model"
            (selectedChange)="onValueChange($event)"
            >Radio label</pa-checkbox
        >
    </div> `,
})
export class TestRadioComponent {
    @ViewChild('paCheckbox') paField?: CheckboxComponent;
    id?: string;
    name?: string;
    type?: string;
    help?: string;
    disabled = false;
    model?: boolean;
    selectedChange?: any;

    onValueChange(event: any) {}
}

describe('RadioComponent standalone', () => {
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
