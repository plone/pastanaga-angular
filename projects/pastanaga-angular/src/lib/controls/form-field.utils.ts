import {
  FORM_CONTROL,
  FORM_CONTROL_NAME,
  IErrorMessages,
  InternalMode,
  NG_MODEL,
  STANDALONE,
} from './form-field.model';
import { ValidationErrors, ValidatorFn } from '@angular/forms';

const HTML_TAG = new RegExp(/.?<.+>/g);
const REPLACE_LT_GT = new RegExp(/[<>]/g);

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

export function concatAllErrorMessages(errors: ValidationErrors, errorMessages?: IErrorMessages): string {
  const messages: any = errorMessages || {};
  const displayedErrorMessage = Object.keys(errors)
    .sort()
    .reduce((agg: string[], key) => {
      // precedence of validator's message over internal messages
      if (typeof errors[key] === 'string') {
        agg.push(errors[key]);
      } else if (!!messages[key]) {
        agg.push(messages[key]);
      }
      return agg;
    }, []);
  return displayedErrorMessage.length > 0 ? displayedErrorMessage.join(' ') : '';
}

export function findFirstErrorMessage(errors: ValidationErrors, errorMessages?: IErrorMessages): string {
  const messages: any = errorMessages || {};
  const firstMessageKey = Object.keys(errors)
    .sort()
    .find((key) => typeof errors[key] === 'string' || !!messages[key]);
  if (!firstMessageKey) {
    return '';
  }
  return typeof errors[firstMessageKey] !== 'string' ? messages[firstMessageKey] : errors[firstMessageKey];
}

export function buildAlwaysFalseValidator(message: string): ValidatorFn {
  return (): { [key: string]: any } | null => {
    return { customError: message };
  };
}

export function sanitizeStringValue(value: any) {
  if (!!value && typeof value === 'string' && !!value.match(HTML_TAG)) {
    return value.replace(REPLACE_LT_GT, '');
  }
  return value;
}

export function sanitizeNumberValue(value: any) {
  if (!!value && typeof value === 'string') {
    const val = Number(value);
    return isNaN(val) ? null : val;
  }
  return value;
}
