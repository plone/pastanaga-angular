import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { FormFieldHintComponent, PaFormControlDirective } from '../../form-field';
import { MockComponent, MockModule, MockPipe, ngMocks } from 'ng-mocks';
import { InputFormatterDirective } from '../input-formatter.directive';
import { fakeAsync, tick } from '@angular/core/testing';
import { Keys } from '../../../common';
import { PaTranslateModule, TranslatePipe } from '../../../translate';
import { PaIconModule } from '../../../icon';

@Component({ template: '' })
class TestComponent {
    value: any;
    formControl = new FormControl();
    formGroup = new FormGroup({
        control: new FormControl(),
    });
    formGroupNumber = new FormGroup({
        control: new FormControl<number>(0),
    });
    type: any;
    placeholder: any;
    noAutocomplete: any;
    acceptHtmlTags: any;
    autoCapitalize: any;
    disabled: any;
    readonly: any;
    hasFocus: any;
    help: any;
    errorMessage: any;
    errorMessages: any;
    showAllErrors: any;
    required: any;
    pattern: any;
    min: any;
    max: any;
    maxlength: any;
}

describe('InputComponent', () => {
    let component: InputComponent;
    let host: TestComponent;
    let spectator: SpectatorHost<InputComponent, TestComponent>;

    const createHost = createHostFactory({
        component: InputComponent,
        imports: [FormsModule, ReactiveFormsModule, MockModule(PaIconModule), MockModule(PaTranslateModule)],
        host: TestComponent,
        detectChanges: false,
        declarations: [
            PaFormControlDirective,
            InputFormatterDirective,
            MockComponent(FormFieldHintComponent),
            MockPipe(
                TranslatePipe,
                jest.fn((key: string) => key),
            ),
        ],
    });

    const thenInputHasAttribute = (attribute: string, value: any) => {
        expect(spectator.query('.pa-field-control')?.attributes.getNamedItem(attribute)?.value).toEqual(value);
    };

    const thenInputHasProperty = (property: string, value: any) => {
        expect((spectator.query<HTMLInputElement>('.pa-field-control') as any)[property]).toEqual(value);
    };

    it('should have an id, a name and a label', () => {
        spectator = createHost(`<pa-input [(ngModel)]="model">Label</pa-input>`);
        component = spectator.component;
        spectator.detectChanges();
        thenInputHasAttribute('id', 'input-1');
        thenInputHasAttribute('name', 'input-1');

        const label = spectator.query('.pa-field-label');
        expect(label?.innerHTML).toEqual('Label');
    });

    it('should manage standalone value', () => {
        spectator = createHost(`<pa-input [value]="value">Label</pa-input>`);
        component = spectator.component;
        host = spectator.hostComponent;
        spectator.detectChanges();
        expect(component.control.value).toEqual(null);
        host.value = 'a parent value';
        spectator.detectChanges();
        expect(component.control.value).toEqual('a parent value');
        thenInputHasProperty('value', 'a parent value');
    });

    it('should manage ngModel value', fakeAsync(() => {
        spectator = createHost(`<pa-input [(ngModel)]="value">Label</pa-input>`);
        component = spectator.component;
        host = spectator.hostComponent;
        spectator.detectChanges();
        expect(component.control.value).toEqual(null);
        host.value = 'a parent value';
        spectator.detectChanges();
        tick(300);
        expect(component.control.value).toEqual('a parent value');
        thenInputHasProperty('value', 'a parent value');
    }));

    it('should manage formControl value', () => {
        spectator = createHost(`<pa-input [formControl]="formControl">Label</pa-input>`);
        component = spectator.component;
        host = spectator.hostComponent;
        spectator.detectChanges();
        expect(component.control.value).toEqual(null);
        host.formControl.patchValue('a parent value');
        spectator.detectChanges();
        expect(component.control.value).toEqual('a parent value');
        thenInputHasProperty('value', 'a parent value');
    });

    it('should manage formControlName value', () => {
        spectator = createHost(
            `<form [formGroup]="formGroup"><pa-input formControlName="control">Label</pa-input></form>`,
        );
        component = spectator.component;
        host = spectator.hostComponent;
        spectator.detectChanges();
        expect(component.control.value).toEqual(null);
        host.formGroup.patchValue({ control: 'a parent value' });
        spectator.detectChanges();
        expect(component.control.value).toEqual('a parent value');
        thenInputHasProperty('value', 'a parent value');
    });

    it('should manage formControlName with type number', () => {
        spectator = createHost(
            `<form [formGroup]="formGroupNumber"><pa-input type="number" formControlName="control">Label</pa-input></form>`,
        );
        component = spectator.component;
        host = spectator.hostComponent;
        spectator.detectChanges();
        expect(component.control.value).toEqual(0);

        // update input when from group changes
        host.formGroupNumber.patchValue({ control: 100 });
        spectator.detectChanges();
        expect(component.control.value).toEqual(100);
        thenInputHasProperty('value', '100');

        // return properly typed rawValue after typing in the input
        spectator.typeInElement('200', 'input');
        spectator.detectChanges();
        expect(host.formGroupNumber.getRawValue()).toEqual({ control: 200 });
    });

    it('should apply input type text', () => {
        spectator = createHost(`<pa-input [type]="type">Label</pa-input>`);
        component = spectator.component;
        host = spectator.hostComponent;
        host.type = 'password';
        spectator.detectChanges();
        thenInputHasProperty('type', 'password');
        host.type = 'email';
        spectator.detectChanges();
        thenInputHasProperty('type', 'email');
        host.type = undefined;
        spectator.detectChanges();
        thenInputHasProperty('type', 'text');
    });

    it('should apply input type number and click bound', () => {
        spectator = createHost(`<pa-input [type]="type">Label</pa-input>`);
        component = spectator.component;
        host = spectator.hostComponent;
        host.type = 'number';
        spectator.detectChanges();
        thenInputHasProperty('type', 'number');
        if (component.htmlInputRef) {
            component.htmlInputRef.nativeElement.value = 5;
        }
        spectator.dispatchMouseEvent('.pa-field-control', 'mouseup');
        spectator.detectChanges();
        expect(component.control.value).toEqual(5);
    });

    it('should display placeholder', () => {
        spectator = createHost(`<pa-input [placeholder]="placeholder">Label</pa-input>`);
        component = spectator.component;
        spectator.detectChanges();
        thenInputHasProperty('placeholder', '');
        host = spectator.hostComponent;
        host.placeholder = 'A placeholder';
        spectator.detectChanges();
        thenInputHasProperty('placeholder', 'A placeholder');
    });

    it('should toggle autocapitalize', () => {
        spectator = createHost(`<pa-input [autocapitalize]="autoCapitalize">Label</pa-input>`);
        component = spectator.component;
        spectator.detectChanges();
        thenInputHasAttribute('autocapitalize', undefined);
        host = spectator.hostComponent;
        host.autoCapitalize = 'off';
        spectator.detectChanges();
        thenInputHasAttribute('autocapitalize', 'off');
    });

    it('should apply autocomplete', () => {
        spectator = createHost(`<pa-input [noAutoComplete]="noAutocomplete">Label</pa-input>`);
        component = spectator.component;
        spectator.detectChanges();
        thenInputHasAttribute('autocomplete', undefined);
        host = spectator.hostComponent;
        host.noAutocomplete = true;
        spectator.detectChanges();
        thenInputHasAttribute('autocomplete', 'off');
    });

    it('should toggle acceptHtmlTags', () => {
        spectator = createHost(`<pa-input [acceptHtmlTags]="acceptHtmlTags">Label</pa-input>`);
        spectator.detectChanges();
        expect(spectator.component.sanitizeHtmlTags('<p>content</p>')).toBe('pcontent/p');

        host = spectator.hostComponent;
        host.acceptHtmlTags = true;
        spectator.detectChanges();
        expect(spectator.component.sanitizeHtmlTags('<p>content</p>')).toBe('<p>content</p>');

        host.acceptHtmlTags = false;
        spectator.detectChanges();
        expect(spectator.component.sanitizeHtmlTags('<p>content</p>')).toBe('pcontent/p');
    });

    it('should apply disabled in standalone', () => {
        spectator = createHost(`<pa-input [disabled]="disabled">Label</pa-input>`);
        component = spectator.component;
        spectator.detectChanges();
        thenInputHasProperty('disabled', false);
        host = spectator.hostComponent;
        host.disabled = true;
        spectator.detectChanges();
        expect(component.control.disabled).toEqual(true);
        thenInputHasProperty('disabled', true);
    });

    it('should apply disabled in formGroup', () => {
        spectator = createHost(
            `<form [formGroup]="formGroup"><pa-input formControlName="control">Label</pa-input></form>`,
        );
        component = spectator.component;
        host = spectator.hostComponent;
        spectator.detectChanges();
        thenInputHasProperty('disabled', false);
        host.formGroup.disable();
        spectator.detectChanges();
        expect(component.control.disabled).toEqual(true);
        thenInputHasProperty('disabled', true);
    });

    it('should apply readonly', () => {
        spectator = createHost(`<pa-input [readonly]="readonly">Label</pa-input>`);
        component = spectator.component;
        spectator.detectChanges();
        thenInputHasProperty('readOnly', false);
        host = spectator.hostComponent;
        host.readonly = true;
        spectator.detectChanges();
        thenInputHasProperty('readOnly', true);
    });

    it('should focus input', () => {
        spectator = createHost(`<pa-input [hasFocus]="hasFocus">Label</pa-input>`);
        component = spectator.component;
        host = spectator.hostComponent;
        spectator.detectChanges();
        const inputFocused = jest.spyOn(component.htmlInputRef?.nativeElement, 'focus');
        host.hasFocus = true;
        spectator.detectChanges();
        expect(inputFocused).toHaveBeenCalled();
    });

    it('should display help', () => {
        spectator = createHost(`<pa-input [help]="help">Label</pa-input>`);
        component = spectator.component;
        host = spectator.hostComponent;
        spectator.detectChanges();
        host.help = 'a hint message';
        spectator.detectChanges();
        const hint = ngMocks.find(spectator.debugElement, FormFieldHintComponent);
        expect(hint.componentInstance.help).toEqual('a hint message');
    });

    it('should apply maxlength', () => {
        spectator = createHost(`<pa-input [maxlength]="maxlength">Label</pa-input>`);
        component = spectator.component;
        host = spectator.hostComponent;
        host.maxlength = 3;
        spectator.detectChanges();
        thenInputHasProperty('maxLength', 3);
        thenInputHasAttribute('maxlength', '3');
    });

    it('should display errorMessages', () => {
        spectator = createHost(
            `<pa-input [(ngModel)]="model" [required]="required" [errorMessages]="errorMessages">Label</pa-input>`,
        );
        component = spectator.component;
        host = spectator.hostComponent;
        host.required = true;
        spectator.detectChanges();

        component.control.markAsDirty();
        component.control.updateValueAndValidity();
        expect(component.control.valid).toEqual(false);
        const hint = ngMocks.find(spectator.debugElement, FormFieldHintComponent);
        expect(hint.componentInstance.errorMessages).toEqual(undefined);

        host.errorMessages = { required: 'field required' };
        spectator.detectChanges();
        expect(hint.componentInstance.errorMessages).toEqual({ required: 'field required' });
    });

    it('should toggle showAllErrors', () => {
        spectator = createHost(
            `<pa-input [(ngModel)]="model" [required]="required" [showAllErrors]="showAllErrors">Label</pa-input>`,
        );
        component = spectator.component;
        host = spectator.hostComponent;
        host.required = true;
        spectator.detectChanges();

        component.control.markAsDirty();
        component.control.updateValueAndValidity();
        expect(component.control.valid).toEqual(false);
        const hint = ngMocks.find(spectator.debugElement, FormFieldHintComponent);
        expect(hint.componentInstance.showAllErrors).toEqual(undefined);

        host.showAllErrors = true;
        spectator.detectChanges();
        expect(hint.componentInstance.showAllErrors).toEqual(true);
    });

    it('should notify keyup and enter when not tab', () => {
        spectator = createHost(`<pa-input [value]="value">Label</pa-input>`);
        component = spectator.component;
        host = spectator.hostComponent;
        spectator.detectChanges();
        const keyup = jest.spyOn(component.keyUp, 'emit');
        const enter = jest.spyOn(component.enter, 'emit');
        component.control.patchValue('test');
        component.onKeyUp({ key: 'a', target: true });
        expect(keyup).toHaveBeenCalledWith('test');
        component.control.patchValue('test2');
        component.onKeyUp({ key: Keys.tab, target: true });
        expect(keyup).not.toHaveBeenCalledWith('test2');
        expect(enter).not.toHaveBeenCalled();
        component.onKeyUp({ key: Keys.enter, target: true });
        expect(keyup).toHaveBeenCalledWith('test2');
        expect(enter).toHaveBeenCalledWith({ event: { key: 'Enter', target: true }, value: 'test2' });
    });

    it('should notify focusing only when active', () => {
        spectator = createHost(`<pa-input [value]="value">Label</pa-input>`);
        component = spectator.component;
        host = spectator.hostComponent;
        spectator.detectChanges();
        const focusing = jest.spyOn(component.focusing, 'emit');
        component.control.disable();
        component.onFocus({ focus: true, target: true });
        expect(focusing).not.toHaveBeenCalled();
        component.control.enable();
        component.control.patchValue('test');
        component.onFocus({ focus: true, target: true });
        expect(focusing).toHaveBeenCalledWith({ focus: true, target: true });
    });

    it('should notify blurring', () => {
        spectator = createHost(`<pa-input [value]="value">Label</pa-input>`);
        component = spectator.component;
        host = spectator.hostComponent;
        spectator.detectChanges();
        component.control.patchValue('test');
        const blurring = jest.spyOn(component.blurring, 'emit');
        component.onBlur();
        expect(blurring).toHaveBeenCalledWith('test');
    });
});
