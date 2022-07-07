import { Component } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { MockComponent, MockModule, MockPipe, ngMocks } from 'ng-mocks';
import { CheckboxComponent } from './checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldHintComponent, PaFormControlDirective } from '../../form-field';
import { fakeAsync, tick } from '@angular/core/testing';

@Component({ template: '' })
class TestComponent {
    model: any;
    required = false;
    disabled = false;
    errorMessages = { required: 'This field is required' };
    id = 'parentId';
}

describe('CheckboxComponent', () => {
    let component: CheckboxComponent;
    let host: TestComponent;
    let spectator: SpectatorHost<CheckboxComponent, TestComponent>;
    const createHost = createHostFactory({
        component: CheckboxComponent,
        imports: [FormsModule, ReactiveFormsModule],
        host: TestComponent,
        detectChanges: false,
        declarations: [
            PaFormControlDirective,
            MockComponent(FormFieldHintComponent),
        ]
    });
    const thenInputHasAttribute = (attribute: string, value: any) => {
        expect(spectator.query('.pa-toggle-control')?.attributes.getNamedItem(attribute)?.value).toEqual(value);
    };
    const thenInputHasProperty = (property: string, value: any) => {
        expect((spectator.query<HTMLInputElement>('.pa-toggle-control') as any)[property]).toEqual(value);
    };

    it('should have an id, a name and a label', () => {
        spectator = createHost(`<pa-checkbox [(ngModel)]="model">Label</pa-checkbox>`);
        component = spectator.component;
        spectator.detectChanges();
        thenInputHasAttribute('id', 'checkbox-1');
        thenInputHasAttribute('name', 'checkbox-1');

        const label = spectator.query('.pa-toggle-label');
        expect(label?.innerHTML).toEqual('Label');
    });
    it('should reflect isChecked', fakeAsync(() => {
        spectator = createHost(`<pa-checkbox [(ngModel)]="model">Label</pa-checkbox>`);
        component = spectator.component;
        host = spectator.hostComponent;
        spectator.detectChanges();
        // host component has undefined model
        thenInputHasAttribute('aria-checked', 'false');
        thenInputHasProperty('checked', false);
        expect(component.control.value).toEqual(null);

        component.control.patchValue(true);
        spectator.detectChanges();
        thenInputHasAttribute('aria-checked', 'true');
        thenInputHasProperty('checked', true);
        expect(host.model).toEqual(true);

        // spectator will apply child update after a tick
        host.model = false;
        spectator.detectChanges();
        tick();
        thenInputHasAttribute('aria-checked', 'false');
        thenInputHasProperty('checked', false);
        expect(component.control.value).toEqual(false);
    }));

    it('should apply required validation', fakeAsync(() => {
        spectator = createHost(`<pa-checkbox [(ngModel)]="model" [required]="required">Label</pa-checkbox>`);
        component = spectator.component;
        host = spectator.hostComponent;
        host.required = true;
        spectator.detectChanges();
        // when field pristine, error is not applied
        expect(spectator.query('.pa-field-error')).toEqual(null);

        component.control.markAsDirty();
        component.control.updateValueAndValidity();
        spectator.detectChanges();
        expect(spectator.query('.pa-field-error')).toBeTruthy();

        component.control.patchValue(true);
        expect(spectator.query('.pa-field-error')).toEqual(null);

        // remove validation
        host.required = false;
        component.control.patchValue(false);
        spectator.detectChanges();
        tick(1); // validation debounce
        expect(spectator.query('.pa-field-error')).toEqual(null);
    }));

    it('should apply disabled to input', fakeAsync(() => {
        spectator = createHost(`<pa-checkbox [(ngModel)]="model" [disabled]="disabled">Label</pa-checkbox>`);
        component = spectator.component;
        host = spectator.hostComponent;
        // spectator will apply child update after a tick
        host.disabled = true;
        spectator.detectChanges();
        tick();

        expect(component.control.disabled).toEqual(true);
        thenInputHasProperty('disabled', true);

        host.disabled = false;
        spectator.detectChanges();
        tick();

        expect(component.control.disabled).toEqual(false);
        thenInputHasProperty('disabled', false);
    }));

    it('should display error message when invalid and messages provided', () => {
        spectator = createHost(`<pa-checkbox [(ngModel)]="model"
                                                        [id]="id"
                                                        [required]="required"
                                                        [errorMessages]="errorMessages">Label</pa-checkbox>`);
        component = spectator.component;
        host = spectator.hostComponent;
        host.required = true;
        spectator.detectChanges();
        // when field pristine, error is not displayed but hint-component is present
        const hint = ngMocks.find(spectator.debugElement, FormFieldHintComponent);
        expect(hint.componentInstance.errorMessages).toEqual(host.errorMessages);
        expect(hint.componentInstance.showErrors).toEqual(false);

        component.control.markAsDirty();
        component.control.updateValueAndValidity();
        expect(hint.componentInstance.showErrors).toEqual(true);
        thenInputHasAttribute('aria-describedby', 'parentId-hint');
    });
});
