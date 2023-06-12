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

/**
 * name attributes for input, select and text-area form-fields
 * triggering an autofill suggestion from browsers and password managers
 * when the field is part of a form and has an id
 */
export enum AutoFilledInputNames {
  name = 'name',
  honorificPrefix = 'honorific-prefix',
  givenName = 'given-name',
  additionalName = 'additional-name',
  familyName = 'family-name',
  honorificSuffix = 'honorific-suffix',
  nickname = 'nickname',
  email = 'email',
  username = 'username',
  newPassword = 'new-password',
  currentPassword = 'current-password',
  oneTimeCode = 'one-time-code',
  organizationTitle = 'organization-title',
  organization = 'organization',
  streetAddress = 'street-address',
  addressLine1 = 'address-line1',
  addressLine2 = 'address-line2',
  addressLine3 = 'address-line3',
  addressLevel4 = 'address-level4',
  addressLevel3 = 'address-level3',
  addressLevel2 = 'address-level2',
  addressLevel1 = 'address-level1',
  country = 'country',
  countryName = 'country-name',
  postalCode = 'postal-code',
  ccName = 'cc-name',
  ccGivenName = 'cc-given-name',
  ccAdditionalName = 'cc-additional-name',
  ccFamilyName = 'cc-family-name',
  ccNumber = 'cc-number',
  ccExp = 'cc-exp',
  ccExpMonth = 'cc-exp-month',
  ccExpYear = 'cc-exp-year',
  ccCsc = 'cc-csc',
  ccType = 'cc-type',
  transactionCurrency = 'transaction-currency',
  transactionAmount = 'transaction-amount',
  language = 'language',
  bday = 'bday',
  bdayDay = 'bday-day',
  bdayMonth = 'bday-month',
  bdayYear = 'bday-year',
  sex = 'sex',
  tel = 'tel',
  telCountryCode = 'tel-country-code',
  telNational = 'tel-national',
  telAreaCode = 'tel-area-code',
  telLocal = 'tel-local',
  telExtension = 'tel-extension',
  impp = 'impp',
  url = 'url',
  photo = 'photo',
}

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
