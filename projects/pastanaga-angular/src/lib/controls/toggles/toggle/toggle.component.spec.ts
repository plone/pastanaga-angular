import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ToggleComponent } from './toggle.component';
import { Component, ViewChild } from '@angular/core';
import { TESTING_IMPORTS, TESTING_PROVIDERS } from '../../../testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';


@Component({
    template: `<pa-toggle #toggle
                          id="toggle1"
                          name="toggle1"
                          [(ngModel)]="checked"
                          [hasFocus]="hasFocus"
                >The label</pa-toggle>
        <form id="form" [formGroup]="form">
            <pa-toggle #toggleForm
                       formControlName="checked"
            >The label</pa-toggle>
        </form>
    `,
})
export class TestComponent {
    checked?: boolean;
    hasFocus?: boolean;
    @ViewChild('toggle') toggle?: ToggleComponent;
    @ViewChild('toggleForm') toggleForm?: ToggleComponent;

    form: FormGroup = new FormGroup({
        checked: new FormControl()
    });
}

describe('ToggleComponent', () => {
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
            declarations: [ToggleComponent, TestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set focus', () => {
        fixture.detectChanges();
        component.hasFocus = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('#toggle1 .pa-toggle-container')).classes.focused).toBeTruthy();
    });


    it('should apply modelChange', fakeAsync(() => {
        fixture.componentInstance.checked = true;
        fixture.detectChanges();
        tick();

        // model -> view
        const input = fixture.debugElement.query(By.css('#toggle1 input'));
        expect(input.nativeElement.value).toEqual("true")
        expect(fixture.componentInstance.toggle?._checked).toEqual(true);
        expect(fixture.componentInstance.checked).toEqual(true);

        fixture.debugElement.query(By.css('#toggle1 .pa-toggle-container')).nativeElement.click();
        fixture.detectChanges();

        // view -> model
        expect(input.nativeElement.value).toEqual("false");
        expect(fixture.componentInstance.toggle?._checked).toEqual(false);
        expect(fixture.componentInstance.checked).toEqual(false);
    }));

    it('should apply formControl change', fakeAsync(() => {
        fixture.componentInstance.form.patchValue({checked: true});
        fixture.detectChanges();
        tick();

        // model -> view
        const input = fixture.debugElement.query(By.css('#form input'));
        expect(input.nativeElement.value).toEqual("true")
        expect(fixture.componentInstance.toggleForm?._checked).toEqual(true);
        expect(fixture.componentInstance.form.value.checked).toEqual(true);
        expect(fixture.componentInstance.form.pristine).toEqual(true);

        fixture.debugElement.query(By.css('#form .pa-toggle-container')).nativeElement.click();
        fixture.detectChanges();

        // view -> model
        expect(input.nativeElement.value).toEqual("false");
        expect(fixture.componentInstance.toggleForm?._checked).toEqual(false);
        expect(fixture.componentInstance.form.value.checked).toEqual(false);
        expect(fixture.componentInstance.form.pristine).toEqual(false);
    }));
});
