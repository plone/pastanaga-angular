import { FORM_CONTROL, FORM_CONTROL_NAME, InternalMode, NG_MODEL, STANDALONE } from './form-field-internal.model';
import { ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErrorMessages } from '../..';

export function isStandalone(internalMode: InternalMode): boolean {
    return internalMode === STANDALONE;
}
export function isNgModel(internalMode: InternalMode): boolean {
    return internalMode === NG_MODEL;
}
export function isFormControl(internalMode: InternalMode): boolean {
    return internalMode === FORM_CONTROL;
}
export function isFormControlName(internalMode: InternalMode): boolean {
    return internalMode === FORM_CONTROL_NAME;
}
export function concatAllErrorMessages(errors: ValidationErrors, errorMessages?: ErrorMessages): string {
    const messages: any = errorMessages || {};
    const displayedErrorMessage = Object.keys(errors)
        .sort()
        .reduce((agg, key) => {
            // precedence of validator's message over internal messages
            if (typeof errors[key] === 'string') {
                return [agg, errors[key]].join(', ');
            }
            if (!!messages[key]) {
                return [agg, messages[key]].join(', ');
            }
            return agg;
        }, '');
    // remove first ', '
    return displayedErrorMessage.length > 0 ? displayedErrorMessage.substr(2) : displayedErrorMessage;
}
export function findFirstErrorMessage(errors: ValidationErrors, errorMessages?: ErrorMessages): string {
    const messages: any = errorMessages || {};
    const firstMessageKey = Object.keys(errors)
        .sort()
        .find((key) => typeof errors[key] === 'string' || !!messages[key]);
    if (!firstMessageKey) {
        return '';
    }
    if (typeof errors[firstMessageKey] !== 'string') {
        return messages[firstMessageKey];
    }
    return errors[firstMessageKey];
}
export function buildAlwaysFalseValidator(message: string): ValidatorFn {
    return (): { [key: string]: any } | null => {
        return { customError: message };
    };
}
