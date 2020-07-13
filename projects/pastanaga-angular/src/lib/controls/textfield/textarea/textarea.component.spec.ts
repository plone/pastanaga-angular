import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TextareaComponent } from './textarea.component';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessages } from '../base-text-field';
import { TESTING_IMPORTS, TESTING_PROVIDERS } from '../../../testing';

describe('TextareaComponent', () => {
    let component: TextareaComponent;
    let fixture: ComponentFixture<TextareaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [TextareaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextareaComponent);
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

    it('should not accept html tags unless we ask so', () => {
        component.onKeyUp(({
            target: { value: '<a href="#">Click here, it is safe</a>' },
        } as unknown) as KeyboardEvent);
        fixture.detectChanges();
        expect(component.value).toBe('a href="#"Click here, it is safe/a');
        component.acceptHtmlTags = true;
        component.onKeyUp(({
            target: { value: '<a href="#">Click here, it is safe</a>' },
        } as unknown) as KeyboardEvent);
        fixture.detectChanges();
        expect(component.value).toBe('<a href="#">Click here, it is safe</a>');
    });

    it('should resize automatically', () => {
        expect(component._rows).toEqual(1);
        component.autoHeight = true;
        const textarea = fixture.debugElement.query(By.css('textarea'));
        textarea.nativeElement.getBoundingClientRect = () => ({ width: 300 });
        textarea.nativeElement.value =
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nMaecenas aliquam bibendum metus ac sollicitudin.\nPellentesque fermentum semper dui.\nAliquam mollis nisi id commodo scelerisque.\nSuspendisse potenti.\nSed pellentesque enim porttitor, tempor urna sed, gravida lacus.\nInteger facilisis diam in orci dapibus bibendum.\nPellentesque finibus dui vitae urna sollicitudin, sed dictum elit dictum.';
        textarea.nativeElement.dispatchEvent(new KeyboardEvent('keyup'));
        fixture.detectChanges();
        expect(component._rows).toEqual(8);
    });
});

@Component({
    template: `
        <pa-textarea #ngModelTextArea
                     class="ngModelTextArea"
                     [(ngModel)]="value"
                     [disabled]="disabledState"
                     [readonly]="readOnlyState"
                     [errorMessages]="errorMessages"
                     [errorMessage]="errorMessage"
        >Label</pa-textarea>

        <form id="form" [formGroup]="form">
            <pa-textarea #reactiveFormTextArea
                         formControlName="text"
                         [readonly]="readOnlyState"
            >Label
            </pa-textarea>
        </form>
    `,
})
export class TestComponent {
    value?: string;
    disabledState = false;
    readOnlyState = false;
    errorMessages?: ErrorMessages;
    errorMessage?: string;
    @ViewChild('ngModelTextArea') ngModelTextArea?: TextareaComponent;
    @ViewChild('reactiveFormTextArea') reactiveFormTextArea?: TextareaComponent;

    form: FormGroup = new FormGroup({
        text: new FormControl()
    });
}
describe('TextareaComponentValueAccessor', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ...TESTING_IMPORTS,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [
                ...TESTING_PROVIDERS,
            ],
            declarations: [TextareaComponent, TestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    });

    it('should apply modelChange to view', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        const initialText = 'initialText';
        fixture.componentInstance.value = initialText;
        fixture.detectChanges();
        tick(fixture.componentInstance.ngModelTextArea?.debounceDuration);
        const input = fixture.debugElement.query(By.css('.ngModelTextArea textarea'));
        expect(input.nativeElement.value).toEqual(initialText)
        expect(fixture.componentInstance.ngModelTextArea?._value).toEqual(initialText);
        expect(fixture.componentInstance.value).toEqual(initialText);
    }));

    it('should apply view change to model', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        const input = fixture.debugElement.query(By.css('.ngModelTextArea textarea'));
        const updatedText = 'updated text';
        input.nativeElement.value = updatedText;
        input.triggerEventHandler('change', {target: {value: updatedText}});
        fixture.detectChanges();
        tick(fixture.componentInstance.ngModelTextArea?.debounceDuration);
        expect(fixture.componentInstance.ngModelTextArea?._value).toEqual(updatedText);
        expect(fixture.componentInstance.value).toEqual(updatedText);
    }));

});
