import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { DeprecatedSelectComponent } from './deprecated-select.component';
import { PaIconModule } from '../../../icon/icon.module';
import { PaDropdownModule } from '../../../dropdown/dropdown.module';
import { PaPopupModule } from '../../../popup/popup.module';
import { DeprecatedInputComponent } from '../input/deprecated-input.component';
import { TESTING_IMPORTS, TESTING_PROVIDERS } from '../../../testing';
import { ControlModel, ControlType } from '../../control.model';
import { By } from '@angular/platform-browser';

@Component({
    template: `<pa-deprecated-select [(value)]="value" #select>
        <pa-option value="abc">ABC</pa-option>
        <pa-option value="def">DEF</pa-option>
    </pa-deprecated-select>`,
})
export class TestComponent {
    value = '';
    @ViewChild('select') select?: DeprecatedSelectComponent;
}

describe('SelectComponent', () => {
    let component: DeprecatedSelectComponent;
    let fixture: ComponentFixture<DeprecatedSelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [...TESTING_IMPORTS, PaIconModule, PaDropdownModule, PaPopupModule],
            providers: [...TESTING_PROVIDERS],
            declarations: [DeprecatedSelectComponent, DeprecatedInputComponent, TestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeprecatedSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set value to selected option at init', () => {
        component.options = [
            new ControlModel({ id: 'option1', type: ControlType.option, value: '1', label: 'Option 1' }),
            new ControlModel({
                id: 'option2',
                type: ControlType.option,
                value: '2',
                label: 'Option 2',
                selected: true,
            }),
            new ControlModel({ id: 'option3', type: ControlType.option, value: '3', label: 'Option 3' }),
        ];
        fixture.detectChanges();
        expect(component.value).toEqual('2');
    });

    it('should filter options', () => {
        component.options = [
            new ControlModel({ id: 'option1', type: ControlType.option, value: '1', label: 'Batman' }),
            new ControlModel({ id: 'option2', type: ControlType.option, value: '2', label: 'Robin', selected: true }),
            new ControlModel({ id: 'option3', type: ControlType.option, value: '3', label: 'Flash' }),
        ];
        fixture.detectChanges();
        const input = fixture.debugElement.query(By.css('input'));
        input.nativeElement.value = 'fla';
        input.nativeElement.dispatchEvent(new KeyboardEvent('keyup'));
        fixture.detectChanges();
        expect((component.options[0] as ControlModel).filtered).toBe(true);
        expect((component.options[1] as ControlModel).filtered).toBe(true);
        expect((component.options[2] as ControlModel).filtered).toBe(false);
    });

    it('should support options children', () => {
        const fixtureTest = TestBed.createComponent(TestComponent);
        fixtureTest.componentInstance.value = 'def';
        fixtureTest.detectChanges();
        expect(fixtureTest.componentInstance.select?.optionComponents?.length).toEqual(2);
        expect(fixtureTest.componentInstance.select?.optionComponents?.last.selected).toBe(true);
    });
});
