export const STANDALONE = 'standalone';
export const NG_MODEL = 'model';
export const FORM_CONTROL = 'formControl';
export const FORM_CONTROL_NAME = 'formControlName';
export declare type InternalMode = 'standalone' | 'model' | 'formControl' | 'formControlName';
export declare type TextInputType =
    | 'text'
    | 'number'
    | 'password'
    | 'email'
    | 'date'
    | 'datetime-local'
    | 'month'
    | 'search'
    | 'tel'
    | 'time'
    | 'url'
    | 'week';
export declare type UpdateOnStrategy = 'change' | 'blur' | 'submit';

export interface IErrorMessages {
    required?: string;
    pattern?: string;
    min?: string;
    max?: string;
    passwordStrength?: string;
    email?: string;
    minlength?: string;
    maxlength?: string;
}
