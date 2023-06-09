import { ToggleComponent } from './toggle.component';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent, MockModule } from 'ng-mocks';
import { FormFieldHintComponent, PaFormFieldModule } from '../../form-field';
import { fakeAsync, tick } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PaTranslateModule } from '../../../translate';

@Component({
  template: ``,
})
export class TestComponent {
  checked?: boolean;
  hasFocus?: boolean;
  form: FormGroup = new FormGroup({
    checked: new FormControl(),
  });
  otherForm: FormGroup = new FormGroup({
    checked: new FormControl(true),
  });
}

describe('ToggleComponent', () => {
  describe('from itself', () => {
    let component: ToggleComponent;
    let spectator: Spectator<ToggleComponent>;
    const createComponent = createComponentFactory({
      imports: [FormsModule, ReactiveFormsModule, MockModule(PaFormFieldModule), MockModule(PaTranslateModule)],
      component: ToggleComponent,
      detectChanges: false,
    });

    beforeEach(() => {
      spectator = createComponent();
      component = spectator.component;
    });

    describe('updateState', () => {
      beforeEach(() => {
        jest.spyOn(component, 'updateState');
      });
      it('should call updateState when clicking on the label', () => {
        spectator.detectChanges();
        spectator.click('label');
        expect(component.updateState).toHaveBeenCalled();
      });

      it('should call updateState when clicking on the toggle', () => {
        spectator.click('input');
        expect(component.updateState).toHaveBeenCalled();
      });
    });
  });

  describe('from TestComponent', () => {
    let component: ToggleComponent;
    let host: TestComponent;
    let spectator: SpectatorHost<ToggleComponent, TestComponent>;
    const createHost = createHostFactory({
      component: ToggleComponent,
      imports: [FormsModule, ReactiveFormsModule, PaFormFieldModule],
      host: TestComponent,
      mocks: [MockComponent(FormFieldHintComponent)],
      detectChanges: false,
    });

    it('should set focus', fakeAsync(() => {
      spectator = createHost(`<pa-toggle [(ngModel)]="checked" [hasFocus]="hasFocus"></pa-toggle>`);
      component = spectator.component;
      host = spectator.hostComponent;
      host.hasFocus = true;
      spectator.detectChanges();
      tick();
      expect(spectator.query<HTMLInputElement>('.pa-toggle-container.pa-focus')).toBeTruthy();
    }));

    it('should support disabling', fakeAsync(() => {
      spectator = createHost(`<pa-toggle [(ngModel)]="checked" disabled></pa-toggle>`);
      component = spectator.component;
      host = spectator.hostComponent;
      spectator.detectChanges();
      tick();
      spectator.query<HTMLInputElement>('.pa-toggle-container')?.click();
      spectator.detectChanges();
      tick();
      expect(host.checked).toEqual(null);
    }));

    it('should apply model change to view', fakeAsync(() => {
      spectator = createHost(`<pa-toggle [(ngModel)]="checked" [hasFocus]="hasFocus"></pa-toggle>`);
      component = spectator.component;
      host = spectator.hostComponent;
      host.checked = true;
      spectator.detectChanges();
      tick();
      expect(spectator.query<HTMLInputElement>('input[aria-checked="true"]')).toBeTruthy();
      expect(component.isChecked).toEqual(true);
      host.checked = false;
      spectator.detectChanges();
      tick();
      expect(spectator.query<HTMLInputElement>('input[aria-checked="false"]')).toBeTruthy();
      expect(component.isChecked).toEqual(false);
    }));

    it('should apply view change to model', fakeAsync(() => {
      spectator = createHost(`<pa-toggle [(ngModel)]="checked" [hasFocus]="hasFocus"></pa-toggle>`);
      host = spectator.hostComponent;
      spectator.detectChanges();
      tick();
      spectator.query<HTMLInputElement>('.pa-toggle-container')?.click();
      spectator.detectChanges();
      tick();
      expect(host.checked).toEqual(true);
      spectator.query<HTMLInputElement>('.pa-toggle-container')?.click();
      spectator.detectChanges();
      tick();
      expect(host.checked).toEqual(false);
    }));

    it('should apply formControl change', fakeAsync(() => {
      spectator = createHost(
        `<form id="form" [formGroup]="form"><pa-toggle formControlName="checked"></pa-toggle></form>`,
      );
      host = spectator.hostComponent;
      component = spectator.component;
      spectator.detectChanges();
      tick();

      // model -> view
      host.form.patchValue({ checked: true });
      spectator.detectChanges();
      tick();
      expect(spectator.query<HTMLInputElement>('input[aria-checked="true"]')).toBeTruthy();
      expect(component.isChecked).toEqual(true);

      // view -> model
      expect(host.form.value.checked).toEqual(true);
      spectator.query<HTMLInputElement>('.pa-toggle-container')?.click();
      spectator.detectChanges();
      tick();
      expect(host.form.value.checked).toEqual(false);
    }));

    it('should set checked state if true initially', () => {
      spectator = createHost(
        `<form id="otherForm" [formGroup]="otherForm"><pa-toggle formControlName="checked"></pa-toggle></form>`,
      );
      component = spectator.component;
      spectator.detectChanges();
      expect(component.isChecked).toBeTruthy();
    });
  });
});
