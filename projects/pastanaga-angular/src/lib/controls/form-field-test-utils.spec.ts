import { Type } from '@angular/core';
import { ComponentFixture, flush, TestBed, tick } from '@angular/core/testing';
import { TESTING_IMPORTS, TESTING_PROVIDERS } from '../testing';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './textfield/input/input.component';
import { By } from '@angular/platform-browser';

it('is a toolkit for form fields tests', () => {
    expect(true).toEqual(true);
});

export function initTest<T>(component: Type<T>, testedComponent: any, otherModules?: any): ComponentFixture<T> {
    const additionalModules = !!otherModules ? otherModules : [];
    TestBed.configureTestingModule({
        imports: [...TESTING_IMPORTS, FormsModule, ReactiveFormsModule, ...additionalModules],
        providers: [...TESTING_PROVIDERS],
        declarations: [testedComponent, component],
    }).compileComponents();
    return TestBed.createComponent(component);
}

/**
 * Helps having a stable situation for the timers in the fakeAsync zone
 */
export function clearFakeAsyncZone(fixture: ComponentFixture<any>) {
    fixture.detectChanges();
    flush();
}

export function whenParentSets(property: string, value: any, fixture: ComponentFixture<any>) {
    fixture.componentInstance[property] = value;
    fixture.detectChanges();
    tick();
}

export function trackFieldControlFocusEvent(fixture: ComponentFixture<any>): any {
    const control = fixture.debugElement.query(By.css('.pa-field-control'));
    control.nativeElement.addEventListener = jest.fn(() => {});
    return jest.spyOn(control.nativeElement, 'focus');
}

export function whenUserInputs(fixture: ComponentFixture<any>, value: any) {
    const nativeElement = fixture.debugElement.query(By.css('.pa-field-control')).nativeElement;
    nativeElement.value = value;
    nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
}

export function whenUserKeyUp(fixture: ComponentFixture<any>, value: any, key: any) {
    const nativeElement = fixture.debugElement.query(By.css('.pa-field-control')).nativeElement;
    nativeElement.value = value;
    nativeElement.dispatchEvent(new Event('input'));
    nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key }));
    fixture.detectChanges();
    tick();
}

export function whenUserFocusControl(fixture: ComponentFixture<any>) {
    const nativeElement = fixture.debugElement.query(By.css('.pa-field-control')).nativeElement;
    nativeElement.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    tick();
}

export function whenUserClicksControl(fixture: ComponentFixture<any>) {
    const nativeElement = fixture.debugElement.query(By.css('.pa-field-control')).nativeElement;
    nativeElement.click();
    fixture.detectChanges();
    tick();
}

export function whenUserBlurControl(fixture: ComponentFixture<any>) {
    const nativeElement = fixture.debugElement.query(By.css('.pa-field-control')).nativeElement;
    nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    tick();
}

export function whenFormControlSetValue(
    fixture: ComponentFixture<any>,
    formControl: AbstractControl | null,
    value: any
) {
    formControl?.setValue(value);
    fixture.detectChanges();
    tick();
}

export function thenFieldControlHasId(fixture: ComponentFixture<any>, id: string) {
    const control = fixture.debugElement.query(By.css('.pa-field-control'));
    expect(control.properties.id).toEqual(id);
}

export function thenFieldControlByCssHasId(fixture: ComponentFixture<any>, selector: string, id: string) {
    const control = fixture.debugElement.query(By.css(`${selector} .pa-field-control`));
    expect(control.properties.id).toEqual(id);
}

export function thenFieldControlHasName(fixture: ComponentFixture<any>, name?: string | null) {
    const control = fixture.debugElement.query(By.css('.pa-field-control'));
    expect(control.attributes.name).toEqual(name);
}

export function thenFormFieldHasHelp(fixture: ComponentFixture<any>, helpText?: string) {
    const help = fixture.debugElement.query(By.css('.pa-field-help'));
    if (!!helpText) {
        expect(help).toBeTruthy();
        expect(help.properties.innerHTML).toEqual(helpText);
    } else {
        expect(help).toEqual(null);
    }
}

export function thenFieldControlHasDescribedBy(fixture: ComponentFixture<any>, describedBy: string) {
    const control = fixture.debugElement.query(By.css('.pa-field-control'));
    expect(control.attributes['aria-describedby']).toEqual(describedBy);
}

export function thenFieldControlIsReadonly(fixture: ComponentFixture<any>, readonly: boolean) {
    const control = fixture.debugElement.query(By.css('.pa-field-control'));
    expect(control.properties.readOnly).toEqual(readonly);
}

export function thenFieldControlIsDisabled(fixture: ComponentFixture<any>, disabled: boolean) {
    const control = fixture.debugElement.query(By.css('.pa-field-control'));
    expect(control.attributes['ng-reflect-is-disabled']).toEqual('' + disabled);
}

export function thenErrorIsDisplayed(fixture: ComponentFixture<any>, errorMessage?: string) {
    const help = fixture.debugElement.query(By.css('.pa-field-help'));
    expect(help).toBeTruthy();
    expect(help.properties.innerHTML).toEqual(errorMessage);
}
export function thenFormFieldHasError(fixture: ComponentFixture<any>) {
    expect(fixture.componentInstance.paField.control.errors).toBeTruthy();
    const formFieldWithErrorClass = fixture.debugElement.query(By.css('.pa-field-error'));
    expect(formFieldWithErrorClass).toBeTruthy();
}
export function thenFormFieldHasNoError(fixture: ComponentFixture<any>) {
    expect(fixture.componentInstance.paField.control.errors).toEqual(null);
    const formFieldWithErrorClass = fixture.debugElement.query(By.css('.pa-field-error'));
    expect(formFieldWithErrorClass).toEqual(null);
}
export function thenErrorIsNotDisplayed(fixture: ComponentFixture<any>) {
    const help = fixture.debugElement.query(By.css('.pa-field-help'));
    expect(help).toEqual(null);
}
export function thenFieldControlHasValue(fixture: ComponentFixture<any>, value: any) {
    expect(fixture.componentInstance.paField.model).toEqual(value);
    expect(fixture.componentInstance.paField.control.value).toEqual(value);

    const control = fixture.debugElement.query(By.css('.pa-field-control'));
    expect(control.nativeElement.value).toEqual(value);
}
export function thenFieldControlHasNoValue(fixture: ComponentFixture<any>) {
    expect(fixture.componentInstance.paField.model).toBeFalsy();
    expect(fixture.componentInstance.paField.control.value).toBeFalsy();

    const control = fixture.debugElement.query(By.css('.pa-field-control'));
    expect(control.nativeElement.value).toBeFalsy();
}
export function thenFieldControlHasType(fixture: ComponentFixture<any>, type: string) {
    const control = fixture.debugElement.query(By.css('.pa-field-control'));
    expect(control.properties.type).toEqual(type);
}
export function thenFieldControlHasPlaceholder(fixture: ComponentFixture<any>, placeholder: string) {
    const control = fixture.debugElement.query(By.css('.pa-field-control'));
    expect(control.attributes.placeholder).toEqual(placeholder);
}
export function thenFieldControlIsRequired(fixture: ComponentFixture<any>, required: boolean) {
    const control = fixture.debugElement.query(By.css('.pa-field-control'));
    expect(control.attributes['ng-reflect-required']).toEqual('' + required);
    if (required) {
        expect(control.nativeElement.required).toBeTruthy();
    } else {
        expect(control.nativeElement.required).toBeFalsy();
    }
}
export function thenFieldControlHasAutoComplete(fixture: ComponentFixture<any>, autocomplete: string | null) {
    const control = fixture.debugElement.query(By.css('.pa-field-control'));
    expect(control.attributes.autocomplete).toEqual(autocomplete);
}
