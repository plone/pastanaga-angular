import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { concatAllErrorMessages, findFirstErrorMessage } from '../../form-field.utils';
import { IErrorMessages } from '../../form-field.model';

let nextUniqueId = 0;

@Component({
  selector: 'pa-form-field-hint',
  templateUrl: './form-field-hint.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldHintComponent implements OnChanges {
  /**
   * A hint to display, helping the user when filling a form field.
   */
  @Input() help?: string;

  /**
   * the ValidationErrors of a formControl
   */
  @Input() errors?: ValidationErrors | null;

  /**
   * Activate the display of error messages (disable for example when formControl is pristine if you don't
   * want to display errors at initial state)
   */
  @Input() showErrors = true;
  /**
   * Display all errors or only the first error encountered (errors being sorted by key)
   */
  @Input() showAllErrors = true;
  /**
   * Provides default messages to display for the possible error keys when none is present
   * in the errors object. If a message (string) is provided for a given key, it
   * will be displayed rather than the message provided in errorMessages.
   */
  @Input() errorMessages?: IErrorMessages;

  /**
   * Id for the hint message, can be used for accessibility aria-describedby attribute in parent component
   */
  @Input() set id(val: string | undefined) {
    this._id = !!val ? val : this.autoId;
  }

  get id() {
    return this._id;
  }

  readonly autoId: string;
  private _id?: string;

  hint?: string;

  constructor() {
    nextUniqueId++;
    this.autoId = `form-field-hint${nextUniqueId}`;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refreshMessage();
  }

  /**
   * Concat all error messages, either from input messages or from the value provided by validators
   */
  buildErrorMessage(errors?: ValidationErrors | null) {
    let errorMessage;
    if (!!errors && this.showErrors) {
      errorMessage = this.showAllErrors
        ? concatAllErrorMessages(errors, this.errorMessages)
        : findFirstErrorMessage(errors, this.errorMessages);
    }
    return errorMessage;
  }

  refreshMessage() {
    const errorMessage = this.buildErrorMessage(this.errors);
    this.hint = errorMessage || this.help;
  }
}
