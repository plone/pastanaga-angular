import { FormControl, ValidationErrors } from '@angular/forms';
import {
    buildAlwaysFalseValidator,
    concatAllErrorMessages,
    findFirstErrorMessage,
    sanitizeStringValue,
} from './form-field.utils';
import { IErrorMessages } from './form-field.model';

describe('formFieldUtils', () => {
    it('should concatAllErrorMessages when no errorMessage provided', () => {
        const errors: ValidationErrors = {
            error3: 'Error3 message.',
            error1: 'Error1 message.',
            error2: { notDisplayed: 'because not a string' },
        };
        expect(concatAllErrorMessages(errors)).toEqual('Error1 message. Error3 message.');
    });
    it('should concatAllErrorMessages when errorMessage provided', () => {
        const errors: ValidationErrors = {
            error1: 'Error1 message.',
            required: true,
        };
        const messages: IErrorMessages = {
            required: 'The field is required.',
        };
        expect(concatAllErrorMessages(errors, messages)).toEqual('Error1 message. The field is required.');
    });
    it('should findFirstErrorMessage when no errorMessage provided and first error is not a string', () => {
        const errors: ValidationErrors = {
            a: { error: true },
            required: true,
        };
        expect(findFirstErrorMessage(errors)).toEqual('');
    });
    it('should findFirstErrorMessage when no errorMessage provided and first error is a string', () => {
        const errors: ValidationErrors = {
            error1: 'Error message.',
            required: true,
        };
        expect(findFirstErrorMessage(errors)).toEqual('Error message.');
    });
    it('should findFirstErrorMessage when errorMessage provided but not for the first error', () => {
        const errors: ValidationErrors = {
            a: { error: true },
            required: true,
        };
        const messages: IErrorMessages = {
            pattern: 'Not the right pattern.',
        };
        expect(findFirstErrorMessage(errors, messages)).toEqual('');
    });
    it('should findFirstErrorMessage when errorMessage provided for the first error', () => {
        const errors: ValidationErrors = {
            a: { error: true },
            required: true,
            pattern: { invalid: true },
        };
        const messages: IErrorMessages = {
            pattern: 'Not the right pattern.',
        };
        expect(findFirstErrorMessage(errors, messages)).toEqual('Not the right pattern.');
    });
    it('should buildAlwaysFalseValidator', () => {
        const validator = buildAlwaysFalseValidator('always false');
        expect(validator(new FormControl('this should be ok'))).toEqual({
            customError: 'always false',
        });
    });
    it('should sanitize string value', () => {
        expect(sanitizeStringValue('<p>')).toEqual('p');
    });
});
