import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            declarations: [InputComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display an error if required and empty', () => {
        component.required = true;
        expect(component._errors.required).toBe(false);
        component.onBlur();
        fixture.detectChanges();
        expect(component._errors.required).toBe(true);
    });

    it('should comply with number min and max', () => {
        component.type = 'number';
        component.min = 3;
        component.max = 10;
        expect(component._errors.min).toBeFalsy();
        component.value = 2;
        component.onBlur();
        fixture.detectChanges();
        expect(component._errors.min).toBe(true);
        component.value = 12;
        component.onBlur();
        fixture.detectChanges();
        expect(component._errors.min).toBe(false);
        expect(component._errors.max).toBe(true);
    });

    it('should not accept html tags unless we ask so', () => {
        component.onKeyUp({target: {value: '<a href="#">Click here, it is safe</a>'}} as unknown as KeyboardEvent);
        fixture.detectChanges();
        expect(component.value).toBe('a href=\"#\"Click here, it is safe/a');
        component.acceptHtmlTags = true;
        component.onKeyUp({target: {value: '<a href="#">Click here, it is safe</a>'}} as unknown as KeyboardEvent);
        fixture.detectChanges();
        expect(component.value).toBe('<a href="#">Click here, it is safe</a>');
    });
});
