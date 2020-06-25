import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CheckboxComponent } from './checkbox.component';

@Component({
    template: `
<pa-checkbox id="control1" [(selected)]="selected"></pa-checkbox>
<pa-checkbox id="control2" type="radio"></pa-checkbox>`,
})
export class TestComponent {
    selected = false;
}

describe('CheckboxComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            declarations: [CheckboxComponent, TestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set proper type', () => {
        expect(fixture.debugElement.query(By.css('#control1 input')).properties.type).toEqual('checkbox');
        expect(fixture.debugElement.query(By.css('#control2 input')).properties.type).toEqual('radio');
    });

    it('should select when clicked', () => {
        fixture.debugElement.query(By.css('#control1 input')).nativeElement.click();
        fixture.detectChanges();
        expect(component.selected).toBe(true);
    });
});
