import { PaFormControlDirective } from './pa-form-control.directive';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';

@Component({ template: '', standalone: false })
class TestNoIdComponent {}

@Component({ template: '', standalone: false })
class TestIdComponent {
  usedId?: string;
}

@Component({ template: '', standalone: false })
class TestNameStandaloneComponent {
  name = 'name';
}

@Component({ template: '', standalone: false })
class TestNameReactiveComponent {
  form = new FormGroup({
    first: new FormControl(),
  });
}

@Component({ template: '', standalone: false })
class TestReadonlyDisabledComponent {
  readonly?: boolean;
  disabled?: boolean;
  model?: string;
  control = new FormControl();
}

@Component({ template: '', standalone: false })
class TestComponent {
  @ViewChild('ref', { read: ElementRef }) reference?: ElementRef;
  status?: any;
  value?: any;
  receivedValue?: any;
  errorMessage?: string;
  model?: string;
  control = new FormControl('', Validators.minLength(3));
  form = new FormGroup({
    first: new FormControl('', [Validators.minLength(3)]),
  });
}

describe('PaFormControlDirective', () => {
  describe('id attribute', () => {
    describe('no id provided', () => {
      const createDirective = createDirectiveFactory({
        directive: PaFormControlDirective,
        host: TestNoIdComponent,
        mocks: [ElementRef],
      });
      let spectator: SpectatorDirective<PaFormControlDirective, TestNoIdComponent>;

      it('should assign a default id', () => {
        spectator = createDirective(`<div paFormControl></div>`);
        expect(spectator.directive.id).toEqual('field-1');
      });
    });

    describe('id provided', () => {
      const createDirective = createDirectiveFactory({
        directive: PaFormControlDirective,
        host: TestIdComponent,
        mocks: [ElementRef],
      });
      let spectator: SpectatorDirective<PaFormControlDirective, TestIdComponent>;

      it('should assign a generated id', () => {
        spectator = createDirective(`<div id="parentId" [id]="usedId" paFormControl></div>`);
        expect(spectator.directive.id).toEqual('parentId-field');
      });
      it('should assign a the given id', () => {
        spectator = createDirective(`<div id="parentId" [id]="usedId" paFormControl></div>`);
        spectator.hostComponent.usedId = 'expected';
        spectator.detectChanges();
        expect(spectator.directive.id).toEqual('expected');
      });
    });
  });

  describe('name attribute', () => {
    describe('standalone', () => {
      const createDirective = createDirectiveFactory({
        directive: PaFormControlDirective,
        host: TestNameStandaloneComponent,
        mocks: [ElementRef],
      });
      let spectator: SpectatorDirective<PaFormControlDirective, TestNameStandaloneComponent>;

      it('should assign a name based on id', () => {
        spectator = createDirective(`<div id="parentId" paFormControl></div>`);
        expect(spectator.directive.name).toEqual('parentId-field');
      });
      it('should assign a the given name', () => {
        spectator = createDirective(`<div id="parentId" [name]="name" paFormControl></div>`);
        expect(spectator.directive.name).toEqual('name');
      });
    });
    describe('reactive form', () => {
      const createDirective = createDirectiveFactory({
        directive: PaFormControlDirective,
        host: TestNameReactiveComponent,
        mocks: [ElementRef],
        imports: [ReactiveFormsModule],
      });
      let spectator: SpectatorDirective<PaFormControlDirective, TestNameReactiveComponent>;

      it('should assign the name of the formControl', () => {
        spectator = createDirective(`<form [formGroup]="form"><input formControlName="first" paFormControl></form>`);
        spectator.detectChanges();
        expect(spectator.directive.name).toEqual('first');
      });
      it('should ignore the given name', () => {
        spectator = createDirective(
          `<form [formGroup]="form"><input paFormControl name='ignored' formControlName="first"></form>`,
        );
        spectator.detectChanges();
        expect(spectator.directive.name).toEqual('first');
      });
    });
  });

  describe('readonly and disabled', () => {
    const createDirective = createDirectiveFactory({
      directive: PaFormControlDirective,
      host: TestReadonlyDisabledComponent,
      mocks: [ElementRef],
      imports: [FormsModule, ReactiveFormsModule],
    });
    let spectator: SpectatorDirective<PaFormControlDirective, TestReadonlyDisabledComponent>;

    it('should be applied in standalone mode', () => {
      spectator = createDirective(`<div paFormControl [disabled]="disabled" [readonly]="readonly"></div>`);
      spectator.detectChanges();
      expect(spectator.directive.readonly).toEqual(false);
      expect(spectator.directive.disabled).toEqual(false);
      expect(spectator.directive.control.disabled).toEqual(false);
      spectator.hostComponent.disabled = true;
      spectator.hostComponent.readonly = true;
      spectator.detectChanges();
      expect(spectator.directive.readonly).toEqual(true);
      expect(spectator.directive.disabled).toEqual(true);
      expect(spectator.directive.control.disabled).toEqual(true);
    });

    it('should be applied with ngModel ', fakeAsync(() => {
      spectator = createDirective(
        `<div [(ngModel)]="model" paFormControl [disabled]="disabled" [readonly]="readonly"></div>`,
      );
      spectator.detectChanges();
      tick();
      expect(spectator.directive.readonly).toEqual(false);
      expect(spectator.directive.disabled).toEqual(false);
      expect(spectator.directive.control.disabled).toEqual(false);
      spectator.hostComponent.disabled = true;
      spectator.hostComponent.readonly = true;
      spectator.detectChanges();
      expect(spectator.directive.readonly).toEqual(true);
      expect(spectator.directive.disabled).toEqual(true);
      expect(spectator.directive.control.disabled).toEqual(true);
    }));

    it('should be applied with formControl ', () => {
      spectator = createDirective(`<input [formControl]="control" paFormControl [readonly]="readonly">`);
      spectator.detectChanges();
      expect(spectator.directive.readonly).toEqual(false);
      expect(spectator.directive.disabled).toEqual(false);
      expect(spectator.directive.control.disabled).toEqual(false);
      spectator.hostComponent.control.disable();
      spectator.hostComponent.readonly = true;
      spectator.detectChanges();
      expect(spectator.directive.readonly).toEqual(true);
      expect(spectator.directive.disabled).toEqual(true);
      expect(spectator.directive.control.disabled).toEqual(true);
    });
  });

  describe('validation', () => {
    const thenControlValid = () => {
      expect(spectator.directive.control.valid).toEqual(true);
    };

    const thenControlPristineAndInvalid = () => {
      expect(spectator.directive.control.pristine).toEqual(true);
      expect(spectator.directive.control.valid).toEqual(false);
    };

    const thenControlPristineAndValid = () => {
      expect(spectator.directive.control.pristine).toEqual(true);
      expect(spectator.directive.control.valid).toEqual(true);
    };

    const thenControlInvalidWithError = (error: any) => {
      expect(spectator.directive.control.valid).toEqual(false);
      expect(spectator.directive.control.errors).toEqual(error);
    };

    const createDirective = createDirectiveFactory({
      directive: PaFormControlDirective,
      host: TestComponent,
      mocks: [ElementRef],
      imports: [FormsModule, ReactiveFormsModule],
      detectChanges: false,
    });

    let spectator: SpectatorDirective<PaFormControlDirective, TestComponent>;

    it('should apply error message in standalone ', () => {
      spectator = createDirective(
        `<div paFormControl [errorMessage]="errorMessage" (statusChange)="status = $event"></div>`,
      );
      spectator.detectChanges();
      thenControlValid();
      spectator.hostComponent.errorMessage = 'error';
      spectator.detectChanges();
      thenControlPristineAndInvalid();
      thenControlInvalidWithError({ customError: 'error' });
      expect(spectator.hostComponent.status).toEqual('INVALID');
      spectator.hostComponent.errorMessage = undefined;
      spectator.detectChanges();
      thenControlPristineAndValid();
      expect(spectator.hostComponent.status).toEqual('VALID');
    });

    it('should expose ngModel validation', () => {
      spectator = createDirective(
        `<div paFormControl [(ngModel)]="model" email (statusChange)="status = $event"></div>`,
      );
      spectator.detectChanges();
      thenControlValid();
      spectator.directive.control.setValue('invalid email');
      spectator.detectChanges();
      thenControlInvalidWithError({ email: true });
      expect(spectator.hostComponent.status).toEqual('INVALID');
      spectator.directive.control.setValue('email@test.test');
      expect(spectator.directive.control.valid).toEqual(true);
      expect(spectator.hostComponent.status).toEqual('VALID');
    });

    it('should apply validation on ngModel', () => {
      spectator = createDirective(
        `<div paFormControl [(ngModel)]="model" [errorMessage]="errorMessage" (statusChange)="status = $event"></div>`,
      );
      spectator.detectChanges();
      thenControlValid();

      spectator.hostComponent.errorMessage = 'error';
      spectator.detectChanges();
      thenControlPristineAndInvalid();
      expect(spectator.hostComponent.status).toEqual('INVALID');
      spectator.hostComponent.errorMessage = undefined;

      spectator.detectChanges();
      thenControlValid();
      expect(spectator.hostComponent.status).toEqual('VALID');
    });

    it('should replace errorMessage by external validators error for ngModel', () => {
      spectator = createDirective(
        `<div paFormControl [(ngModel)]="model" email [errorMessage]="errorMessage" (statusChange)="status = $event"></div>`,
      );
      spectator.detectChanges();
      thenControlValid();
      spectator.hostComponent.errorMessage = 'error';
      spectator.detectChanges();
      thenControlPristineAndInvalid();
      expect(spectator.hostComponent.status).toEqual('INVALID');

      spectator.directive.control.setValue('invalid email');
      spectator.detectChanges();
      thenControlInvalidWithError({ email: true });
      expect(spectator.hostComponent.status).toEqual('INVALID');

      // still invalid after errorMessage is reset
      spectator.hostComponent.errorMessage = undefined;
      spectator.detectChanges();
      thenControlInvalidWithError({ email: true });
      expect(spectator.hostComponent.status).toEqual('INVALID');

      spectator.directive.control.setValue('email@test.test');
      spectator.detectChanges();
      expect(spectator.directive.control.valid).toEqual(true);
      expect(spectator.hostComponent.status).toEqual('VALID');
    });

    it('should use formControl validation', () => {
      spectator = createDirective(`<input paFormControl [formControl]="control" (statusChange)="status = $event">`);
      spectator.detectChanges();
      thenControlValid();
      spectator.directive.control.setValue('12');
      spectator.detectChanges();
      thenControlInvalidWithError({ minlength: { actualLength: 2, requiredLength: 3 } });
      expect(spectator.hostComponent.status).toEqual('INVALID');
      spectator.directive.control.setValue('123');
      expect(spectator.directive.control.valid).toEqual(true);
      expect(spectator.hostComponent.status).toEqual('VALID');
    });

    it('should apply errorMessage and formControl validation', () => {
      spectator = createDirective(
        `<input paFormControl [formControl]="control" [errorMessage]="errorMessage" (statusChange)="status = $event">`,
      );
      spectator.detectChanges();
      thenControlValid();
      spectator.hostComponent.errorMessage = 'error';
      spectator.detectChanges();
      thenControlInvalidWithError({ customError: 'error' });

      spectator.directive.control.setValue('12');
      spectator.detectChanges();
      thenControlInvalidWithError({ minlength: { actualLength: 2, requiredLength: 3 } });
      expect(spectator.hostComponent.status).toEqual('INVALID');

      // still invalid after errorMessage reset
      spectator.hostComponent.errorMessage = undefined;
      spectator.detectChanges();
      thenControlInvalidWithError({ minlength: { actualLength: 2, requiredLength: 3 } });

      spectator.directive.control.setValue('123');
      expect(spectator.directive.control.valid).toEqual(true);
      expect(spectator.hostComponent.status).toEqual('VALID');
    });

    it('should apply errorMessage and validation on formGroup', () => {
      spectator = createDirective(
        `<form [formGroup]="form"><input paFormControl formControlName="first" [errorMessage]="errorMessage" (statusChange)="status = $event"></form> `,
      );
      spectator.detectChanges();
      thenControlValid();
      spectator.hostComponent.errorMessage = 'error';
      spectator.detectChanges();
      spectator.detectChanges();
      thenControlInvalidWithError({ customError: 'error' });
      expect(spectator.hostComponent.status).toEqual('INVALID');
      expect(spectator.hostComponent.form.valid).toEqual(false);

      spectator.directive.control.setValue('12');
      spectator.detectChanges();
      thenControlInvalidWithError({ minlength: { actualLength: 2, requiredLength: 3 } });
      expect(spectator.hostComponent.status).toEqual('INVALID');
      expect(spectator.hostComponent.form.valid).toEqual(false);

      // still invalid after errorMessage reset
      spectator.hostComponent.errorMessage = undefined;
      spectator.detectChanges();
      thenControlInvalidWithError({ minlength: { actualLength: 2, requiredLength: 3 } });
      expect(spectator.hostComponent.status).toEqual('INVALID');
      expect(spectator.hostComponent.form.valid).toEqual(false);

      spectator.directive.control.setValue('123');
      expect(spectator.directive.control.valid).toEqual(true);
      expect(spectator.hostComponent.status).toEqual('VALID');
      expect(spectator.hostComponent.form.valid).toEqual(true);
    });
  });

  describe('value binding', () => {
    const createDirective = createDirectiveFactory({
      directive: PaFormControlDirective,
      host: TestComponent,
      mocks: [ElementRef],
      imports: [FormsModule, ReactiveFormsModule],
      detectChanges: false,
    });

    let spectator: SpectatorDirective<PaFormControlDirective, TestComponent>;

    it('should bind standalone element', () => {
      spectator = createDirective(
        `<div #ref paFormControl [value]="value" (valueChange)="receivedValue = $event"></div>`,
      );
      spectator.detectChanges();
      expect(spectator.directive.control.value).toEqual(null);
      spectator.hostComponent.value = 'value';
      spectator.detectChanges();
      expect(spectator.directive.control.value).toEqual('value');

      spectator.directive.control.setValue('internal');
      expect(spectator.hostComponent.receivedValue).toEqual('internal');
      expect(spectator.hostComponent.reference?.nativeElement.value).toEqual('internal');
    });

    it('should bind ngModel element', fakeAsync(() => {
      spectator = createDirective(
        `<div #ref paFormControl [(ngModel)]="model" (valueChange)="receivedValue = $event"></div>`,
      );
      spectator.detectChanges();
      expect(spectator.directive.control.value).toEqual(null);
      spectator.hostComponent.model = 'value';
      spectator.detectChanges();
      // a tick is needed to apply the writeValue with ngModel
      tick();
      expect(spectator.directive.control.value).toEqual('value');
      expect(spectator.hostComponent.receivedValue).toEqual('value');

      spectator.directive.control.setValue('internal');
      expect(spectator.hostComponent.receivedValue).toEqual('internal');
      expect(spectator.hostComponent.model).toEqual('internal');
      expect(spectator.hostComponent.reference?.nativeElement.value).toEqual('internal');
    }));

    it('should bind reactive element', fakeAsync(() => {
      spectator = createDirective(
        `<form [formGroup]="form"><input #ref paFormControl formControlName="first" (valueChange)="receivedValue = $event"></form>`,
      );
      spectator.detectChanges();
      spectator.hostComponent.form.patchValue({ first: 'abc' });
      spectator.detectChanges();
      expect(spectator.directive.control.value).toEqual('abc');
      expect(spectator.hostComponent.receivedValue).toEqual('abc');

      spectator.directive.control.setValue('internal');
      expect(spectator.hostComponent.receivedValue).toEqual('internal');
      expect(spectator.hostComponent.form.value).toEqual({ first: 'internal' });
      expect(spectator.hostComponent.reference?.nativeElement.value).toEqual('internal');
    }));
  });
});
