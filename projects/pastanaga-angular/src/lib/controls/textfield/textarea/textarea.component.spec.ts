import { fakeAsync, tick } from '@angular/core/testing';
import { MockComponent, MockDirective, MockModule, MockPipe, ngMocks } from 'ng-mocks';
import { InputFormatterDirective } from '../input-formatter.directive';
import { Keys } from '../../../common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { FormFieldHintComponent, PaFormControlDirective } from '../../form-field';
import { TextareaComponent } from './textarea.component';
import { PaTextareaAutoHeightDirective } from './pa-textarea-auto-height.directive';
import { PaTranslateModule, TranslatePipe } from '../../../translate';

@Component({ template: '' })
class TestComponent {
    value: any;
    formControl = new FormControl();
    formGroup = new FormGroup({
        control: new FormControl(),
    });
    placeholder: any;
    noAutocomplete: any;
    acceptHtmlTags: any;
    disabled: any;
    readonly: any;
    hasFocus: any;
    help: any;
    errorMessage: any;
    errorMessages: any;
    showAllErrors: any;
    required: any;
    maxlength: any;

    resizable: any;
    rows: any;
    autoHeight: any;
    maxRows: any;
    maxHeight: any;
}

describe('TextareaComponent', () => {
    let component: TextareaComponent;
    let host: TestComponent;
    let spectator: SpectatorHost<TextareaComponent, TestComponent>;
    const createHost = createHostFactory({
        component: TextareaComponent,
        imports: [FormsModule, ReactiveFormsModule, MockModule(PaTranslateModule)],
        host: TestComponent,
        detectChanges: false,
        declarations: [
            PaFormControlDirective,
            InputFormatterDirective,
            MockComponent(FormFieldHintComponent),
            MockDirective(PaTextareaAutoHeightDirective),
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

    const initWithTemplate = (template: string) => {
        spectator = createHost(template);
        component = spectator.component;
        host = spectator.hostComponent;
        spectator.detectChanges();
    };
    Object.defineProperty(window, 'getComputedStyle', {
        value: () => ({
            lineHeight: '12px',
            paddingTop: '6px',
            paddingBottom: '3px',
        }),
    });
    it('should have an id, a name and a label', () => {
        initWithTemplate(`<pa-textarea [(ngModel)]="model">Label</pa-textarea>`);
        thenInputHasAttribute('id', 'textarea-1');
        thenInputHasAttribute('name', 'textarea-1');

        const label = spectator.query('.pa-field-label');
        expect(label?.innerHTML).toEqual('Label');
    });
    it('should manage standalone value', () => {
        initWithTemplate(`<pa-textarea [value]="value">Label</pa-textarea>`);
        expect(component.control.value).toEqual(null);
        host.value = 'a parent value';
        spectator.detectChanges();
        expect(component.control.value).toEqual('a parent value');
        thenInputHasProperty('value', 'a parent value');
    });
    it('should manage ngModel value', fakeAsync(() => {
        initWithTemplate(`<pa-textarea [(ngModel)]="value">Label</pa-textarea>`);
        expect(component.control.value).toEqual(null);
        host.value = 'a parent value';
        spectator.detectChanges();
        tick(100);
        expect(component.control.value).toEqual('a parent value');
        thenInputHasProperty('value', 'a parent value');
    }));
    it('should manage formControl value', () => {
        initWithTemplate(`<pa-textarea [formControl]="formControl">Label</pa-textarea>`);
        expect(component.control.value).toEqual(null);
        host.formControl.patchValue('a parent value');
        spectator.detectChanges();
        expect(component.control.value).toEqual('a parent value');
        thenInputHasProperty('value', 'a parent value');
    });
    it('should manage formControlName value', () => {
        initWithTemplate(
            `<form [formGroup]="formGroup"><pa-textarea formControlName="control">Label</pa-textarea></form>`,
        );
        expect(component.control.value).toEqual(null);
        host.formGroup.patchValue({ control: 'a parent value' });
        spectator.detectChanges();
        expect(component.control.value).toEqual('a parent value');
        thenInputHasProperty('value', 'a parent value');
    });
    it('should display placeholder', () => {
        initWithTemplate(`<pa-textarea [placeholder]="placeholder">Label</pa-textarea>`);
        thenInputHasProperty('placeholder', '');
        host = spectator.hostComponent;
        host.placeholder = 'A placeholder';
        spectator.detectChanges();
        thenInputHasProperty('placeholder', 'A placeholder');
    });
    it('should apply autocomplete', () => {
        initWithTemplate(`<pa-textarea [noAutoComplete]="noAutocomplete">Label</pa-textarea>`);
        thenInputHasAttribute('autocomplete', undefined);
        host = spectator.hostComponent;
        host.noAutocomplete = true;
        spectator.detectChanges();
        thenInputHasAttribute('autocomplete', 'off');
    });

    it('should toggle acceptHtmlTags', () => {
        spectator = createHost(`<pa-textarea [acceptHtmlTags]="acceptHtmlTags">Label</pa-textarea>`);
        spectator.detectChanges();
        expect(spectator.component.sanitizeHtmlTags('<span>content</span>')).toBe('spancontent/span');

        host = spectator.hostComponent;
        host.acceptHtmlTags = true;
        spectator.detectChanges();
        expect(spectator.component.sanitizeHtmlTags('<span>content</span>')).toBe('<span>content</span>');

        host.acceptHtmlTags = false;
        spectator.detectChanges();
        expect(spectator.component.sanitizeHtmlTags('<span>content</span>')).toBe('spancontent/span');
    });

    it('should apply disabled in standalone', () => {
        initWithTemplate(`<pa-textarea [disabled]="disabled">Label</pa-textarea>`);
        thenInputHasProperty('disabled', false);
        host = spectator.hostComponent;
        host.disabled = true;
        spectator.detectChanges();
        expect(component.control.disabled).toEqual(true);
        thenInputHasProperty('disabled', true);
    });
    it('should apply disabled in formGroup', () => {
        initWithTemplate(
            `<form [formGroup]="formGroup"><pa-textarea formControlName="control">Label</pa-textarea></form>`,
        );
        thenInputHasProperty('disabled', false);
        host.formGroup.disable();
        spectator.detectChanges();
        expect(component.control.disabled).toEqual(true);
        thenInputHasProperty('disabled', true);
    });
    it('should apply readonly', () => {
        initWithTemplate(`<pa-textarea [readonly]="readonly">Label</pa-textarea>`);
        thenInputHasProperty('readOnly', false);
        host = spectator.hostComponent;
        host.readonly = true;
        spectator.detectChanges();
        thenInputHasProperty('readOnly', true);
    });
    it('should focus input', () => {
        initWithTemplate(`<pa-textarea [hasFocus]="hasFocus">Label</pa-textarea>`);
        const inputFocused = jest.spyOn(component.htmlInputRef?.nativeElement, 'focus');
        host.hasFocus = true;
        spectator.detectChanges();
        expect(inputFocused).toHaveBeenCalled();
    });
    it('should display help', () => {
        initWithTemplate(`<pa-textarea [help]="help">Label</pa-textarea>`);
        host.help = 'a hint message';
        spectator.detectChanges();
        const hint = ngMocks.find(spectator.debugElement, FormFieldHintComponent);
        expect(hint.componentInstance.help).toEqual('a hint message');
    });
    it('should apply required', () => {
        initWithTemplate(`<pa-textarea [(ngModel)]="model" [required]="required">Label</pa-textarea>`);
        thenInputHasProperty('required', false);

        component.control.markAsDirty();
        component.control.updateValueAndValidity();
        expect(component.control.valid).toEqual(true);

        host.required = true;
        spectator.detectChanges();
        expect(component.control.valid).toEqual(false);
    });
    it('should apply maxlength', fakeAsync(() => {
        initWithTemplate(`<pa-textarea [maxlength]="maxlength">Label</pa-textarea>`);
        component.control.patchValue('abcd');
        component.control.markAsDirty();
        component.control.updateValueAndValidity();
        expect(component.control.valid).toEqual(true);

        host.maxlength = 3;
        spectator.detectChanges();
        tick(100);
        spectator.detectChanges();
        thenInputHasProperty('maxLength', 3);
        thenInputHasAttribute('maxlength', '3');
    }));
    it('should display errorMessages', fakeAsync(() => {
        initWithTemplate(
            `<pa-textarea [(ngModel)]="model" [required]="required" [errorMessages]="errorMessages">Label</pa-textarea>`,
        );
        host.required = true;
        tick(100);
        spectator.detectChanges();

        component.control.markAsDirty();
        component.control.updateValueAndValidity();
        expect(component.control.valid).toEqual(false);
        const hint = ngMocks.find(spectator.debugElement, FormFieldHintComponent);
        expect(hint.componentInstance.errorMessages).toEqual(undefined);

        host.errorMessages = { required: 'field required' };
        spectator.detectChanges();
        expect(hint.componentInstance.errorMessages).toEqual({ required: 'field required' });
    }));
    it('should toggle showAllErrors', fakeAsync(() => {
        initWithTemplate(
            `<pa-textarea [(ngModel)]="model" [required]="required" [showAllErrors]="showAllErrors">Label</pa-textarea>`,
        );
        host.required = true;
        tick(100);
        spectator.detectChanges();

        component.control.markAsDirty();
        component.control.updateValueAndValidity();
        expect(component.control.valid).toEqual(false);
        const hint = ngMocks.find(spectator.debugElement, FormFieldHintComponent);
        expect(hint.componentInstance.showAllErrors).toEqual(undefined);

        host.showAllErrors = true;
        spectator.detectChanges();
        expect(hint.componentInstance.showAllErrors).toEqual(true);
    }));
    it('should notify keyup and enter when not tab', () => {
        initWithTemplate(`<pa-textarea [value]="value">Label</pa-textarea>`);
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
        initWithTemplate(`<pa-textarea [value]="value">Label</pa-textarea>`);
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
        initWithTemplate(`<pa-textarea [value]="value">Label</pa-textarea>`);
        component.control.patchValue('test');
        const blurring = jest.spyOn(component.blurring, 'emit');
        component.onBlur();
        expect(blurring).toHaveBeenCalledWith('test');
    });
    // specifics
    it('should toggle resizable', () => {
        initWithTemplate(`<pa-textarea [resizable]="resizable">Label</pa-textarea>`);
        expect(spectator.query('.pa-text-area-resizable')).toEqual(null);
        host.resizable = true;
        spectator.detectChanges();
        expect(spectator.query('.pa-text-area-resizable')).toBeTruthy();
        host.resizable = false;
        spectator.detectChanges();
        expect(spectator.query('.pa-text-area-resizable')).toEqual(null);
    });
    it('should set rows', () => {
        initWithTemplate(`<pa-textarea [rows]="rows">Label</pa-textarea>`);
        host.rows = 4;
        spectator.detectChanges();
        thenInputHasAttribute('rows', '4');
    });
    it('should compute maxHeight depending on maxRows', () => {
        initWithTemplate(`<pa-textarea [maxRows]="maxRows">Label</pa-textarea>`);
        expect(component.autoMaxHeight).toEqual(null);
        host.maxRows = 4;
        spectator.detectChanges();
        expect(component.autoMaxHeight).toEqual(12 * 4 + 9);
        host.maxRows = undefined;
        spectator.detectChanges();
        expect(component.autoMaxHeight).toEqual(null);
    });
    it('should not change maxHeight when provided', () => {
        initWithTemplate(`<pa-textarea [maxRows]="maxRows" [maxHeight]="maxHeight">Label</pa-textarea>`);
        host.maxHeight = 30;
        spectator.detectChanges();
        expect(component.autoMaxHeight).toEqual(30);
        host.maxRows = 10;
        spectator.detectChanges();
        expect(component.autoMaxHeight).toEqual(30);
        host.maxHeight = undefined;
        spectator.detectChanges();
        expect(component.autoMaxHeight).toEqual(12 * 10 + 9);
    });
});
