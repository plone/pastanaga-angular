import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DeprecatedCheckboxComponent } from './deprecated-checkbox.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    template: `
        <pa-deprecated-checkbox id="control1" [(selected)]="selected"></pa-deprecated-checkbox>

        <pa-deprecated-checkbox id="control2" type="radio"></pa-deprecated-checkbox>

        <pa-deprecated-checkbox #ngModelCheckbox
                     id="ngModelCheckbox"
                     [(ngModel)]="selected"
        ></pa-deprecated-checkbox>

        <form [formGroup]="form">
            <pa-deprecated-checkbox #reactiveCheckbox
                         id="reactiveCheckbox"
                         formControlName="checked"
            ></pa-deprecated-checkbox>
        </form>
    `,
})
export class TestComponent {

    @ViewChild('ngModelCheckbox') ngModelCheckbox?: DeprecatedCheckboxComponent;
    @ViewChild('reactiveCheckbox') reactiveCheckbox?: DeprecatedCheckboxComponent;

    form = new FormGroup({
        checked: new FormControl(false)
    });
    selected = false;

}

describe('CheckboxComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [DeprecatedCheckboxComponent, TestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should set proper type', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('#control1 input')).properties.type).toEqual('checkbox');
        expect(fixture.debugElement.query(By.css('#control2 input')).properties.type).toEqual('radio');
    });

    it('should select when clicked', () => {
        fixture.detectChanges();
        fixture.debugElement.query(By.css('#control1 input')).nativeElement.click();
        fixture.detectChanges();
        expect(component.selected).toBe(true);
    });

    it('should apply model change to view', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        expect(fixture.componentInstance.selected).toEqual(false);
        fixture.componentInstance.selected = true;
        fixture.detectChanges();
        tick();

        const input = fixture.debugElement.query(By.css('#ngModelCheckbox input'));

        expect(fixture.componentInstance.ngModelCheckbox?._selected).toEqual(true);
        expect(input.properties.checked).toEqual(true);
        expect(input.attributes['aria-checked']).toEqual('true');
        expect(input.nativeElement.value).toEqual('true');

    }));

    it('should apply view change to model', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        const input = fixture.debugElement.query(By.css('#ngModelCheckbox input'));
        input.triggerEventHandler('change', {});
        fixture.detectChanges();
        tick();
        expect(fixture.componentInstance.selected).toEqual(true);
    }));

    it('should apply form change to view', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        expect(fixture.componentInstance.form.value.checked).toEqual(false);
        fixture.componentInstance.form.patchValue({checked: true});
        fixture.detectChanges();
        tick();

        const input = fixture.debugElement.query(By.css('#reactiveCheckbox input'));

        expect(fixture.componentInstance.reactiveCheckbox?._selected).toEqual(true);
        expect(input.properties.checked).toEqual(true);
        expect(input.attributes['aria-checked']).toEqual('true');
        expect(input.nativeElement.value).toEqual('true');

    }));

    it('should apply view change to form', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        const input = fixture.debugElement.query(By.css('#reactiveCheckbox input'));
        input.triggerEventHandler('change', {});
        fixture.detectChanges();
        tick();
        expect(fixture.componentInstance.form.value.checked).toEqual(true);
    }));
});
