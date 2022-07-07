import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { FormFieldHintComponent } from './form-field-hint.component';
import { MockModule, MockPipe } from 'ng-mocks';

describe('FormFieldHintComponent', () => {
    let spectator: Spectator<FormFieldHintComponent>;
    let component: FormFieldHintComponent;
    const createComponent = createComponentFactory({
        component: FormFieldHintComponent,
        detectChanges: false,
    });
    const detectChanges = () => {
        component.ngOnChanges({} as any);
        spectator.detectChanges();
    };
    beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
    });

    it('should display nothing', () => {
        detectChanges();
        expect(spectator.query('.pa-field-help')).toEqual(null);
    });

    it('should display help message', () => {
        component.help = 'help message';
        detectChanges();
        expect(spectator.query('.pa-field-help')?.innerHTML).toEqual('help message');
    });
    it('should display message from error', () => {
        component.errors = { error: 'a provided error message' };
        detectChanges();
        expect(spectator.query('.pa-field-help')?.innerHTML).toEqual('a provided error message');
    });
    it('should not show help when error is present', () => {
        component.help = 'help message';
        component.errors = { error: 'a provided error message' };
        detectChanges();
        expect(spectator.query('.pa-field-help')?.innerHTML).toEqual('a provided error message');
    });
    it('should show help when error is present but show error is false', () => {
        component.help = 'help message';
        component.showErrors = false;
        component.errors = { error: 'a provided error message' };
        detectChanges();
        expect(spectator.query('.pa-field-help')?.innerHTML).toEqual('help message');
    });
    it('should show all error messages', () => {
        component.errors = { zError: 'second error', error: 'first error' };
        detectChanges();
        expect(spectator.query('.pa-field-help')?.innerHTML).toEqual('first error second error');
    });
    it('should show only one error message when showAllErrors is false', () => {
        component.showAllErrors = false;
        component.errors = { zError: 'an error not displayed', error: 'a provided error message' };
        detectChanges();
        expect(spectator.query('.pa-field-help')?.innerHTML).toEqual('a provided error message');
    });
    it('should not have error class when error is present and showError is false', () => {
        component.help = 'help message';
        component.showErrors = false;
        component.errors = { error: 'a provided error message' };
        detectChanges();
        expect(spectator.query('.pa-field-help-error')).toEqual(null);
    });
    it('should have error class only when error is present and showError is true', () => {
        component.help = 'help message';
        component.showErrors = true;
        component.errors = { error: 'a provided error message' };
        detectChanges();
        expect(spectator.query('.pa-field-help-error')).toBeTruthy();
    });
    it('should not have error only when error is not present', () => {
        component.help = 'help message';
        component.showErrors = true;
        detectChanges();
        expect(spectator.query('.pa-field-help-error')).toEqual(null);
    });
    it('should use errorMessages to format error message', () => {
        component.errors = { max: { max: 3 }, min: { min: 1 } };
        component.errorMessages = {
            max: 'message for error max',
            min: 'message for error min',
        };
        detectChanges();
        expect(spectator.query('.pa-field-help')?.innerHTML).toEqual('message for error max message for error min');
    });
});
