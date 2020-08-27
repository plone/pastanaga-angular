import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    ElementRef,
    Self,
    Optional,
    AfterViewInit,
    NgZone,
    ChangeDetectorRef,
    Output,
    EventEmitter,
    OnDestroy,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    FormControl,
    FormControlName,
    NgControl,
    ValidationErrors,
    Validator,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { Keys, markForCheck } from '../common';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ErrorMessages } from '../..';

let nextId = 0;

/**
 * Due to standalone usage specifications, the local state of the component
 * is split into two synchronized references:
 * - the model (ngModel) responsible of the value hold by the component and used in the template
 * - the control (formControl) responsible for validation and state management
 * both references must be kept in sync
 */
@Component({
    selector: 'pa-poc-input',
    templateUrl: './poc-input.component.html',
    styleUrls: ['./poc-input.component.scss'],
    providers: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PocInputComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy, ControlValueAccessor, Validator {
    /**** from BaseControl ****/
    @Input() id?: string;
    @Input() name?: string;
    @Input() help: string = '';

    @Input() set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    /**** from BaseTextField ****/
    @Input() set value(value: string | number) {
        if (!this.isStandalone) {
            console.warn('Do not use value property and ngModel or form control at the same time');
        }
        this.internalPatchValue(value);
    }

    @Input() set debounceDuration(value: number | undefined) {
        this._debouncedTime = value || 500;
        this.debounceTimeChanged.next();
        this.initDebounce();
    }

    @Input() placeholder: string = '';

    @Input() set readonly(value: boolean) {
        this._readonly = coerceBooleanProperty(value);
    }

    get readonly(): boolean {
        return this._readonly;
    }

    @Input() errorMessages?: ErrorMessages;
    /**
     * Manual error messaging: a manual 'always false' validator
     * is added to internal form control
     */
    @Input() errorMessage?: string;
    @Input() required?: boolean;
    @Input() pattern?: RegExp | string;

    /**** from InputComponent ****/
    @Input() type: 'text' | 'number' | 'password' | 'email' = 'text';

    @Input() set noAutoComplete(value: boolean) {
        this._noAutoComplete = coerceBooleanProperty(value);
    }

    get noAutoComplete(): boolean {
        return this._noAutoComplete;
    }

    @Input() set hasFocus(value: boolean) {
        this._hasFocus = coerceBooleanProperty(value);
        if (this._hasFocus && !!this.input && this.isActive()) {
            this.input.nativeElement.focus();
        }
    }

    get hasFocus(): boolean {
        return this._hasFocus;
    }

    @Input() min?: number;
    @Input() max?: number;
    @Input() maxlength?: number;
    @Input() updateValidatorEvent?: boolean;

    /*** ***/

    @ViewChild('input') input?: ElementRef;
    @ViewChild('label') labelElement?: ElementRef;

    @Output() debouncedValueChange: EventEmitter<string | number> = new EventEmitter();
    @Output() focusing: EventEmitter<FocusEvent> = new EventEmitter();
    @Output() keyUp: EventEmitter<any> = new EventEmitter();
    @Output() enter: EventEmitter<{ event: KeyboardEvent; value: any }> = new EventEmitter();
    // Stand alone only
    @Output() valueChange: EventEmitter<string | number> = new EventEmitter();
    @Output() blurring: EventEmitter<string | number> = new EventEmitter();

    /*** localHtmlState ***/
    _id = '';
    _name = '';
    _fieldType = 'input';
    _helpId = '';
    _label = '';
    _hasFocus = false;
    _readonly = false;
    _noAutoComplete = false;
    _autofilled = false;
    _disabled = false;

    /*** internal state ***/
    internalModel?: string | number = '';
    internalControl: AbstractControl = new FormControl();
    isStandalone = true;
    isFormControl = false;

    _debouncedTime = 500;
    debounceTimeChanged: Subject<void> = new Subject();
    debouncedChange: Observable<any> = new Subject();
    terminator: Subject<void> = new Subject();

    /**** Local form Validation ****/
    _errorHelp?: string;
    parentValidator?: ValidatorFn | null = null;
    parentAsyncValidator: any;
    forceErrorValidator?: ValidatorFn;
    requiredValidator?: ValidatorFn;
    patternValidator?: ValidatorFn;
    minValidator?: ValidatorFn;
    maxValidator?: ValidatorFn;
    maxlengthValidator?: ValidatorFn;

    /**
     * NgControl is a superClass of ngModel and formControl
     * and prevents local form control from being override by angular,
     */
    constructor(
        @Optional() @Self() public parentControl: NgControl,
        private platform: Platform,
        private ngZone: NgZone,
        private cdr: ChangeDetectorRef,
        private autofillMonitor: AutofillMonitor
    ) {
        if (!!this.parentControl) {
            this.parentControl.valueAccessor = this;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.updateValidatorEvent) {
            this.refreshParentValidator();
            this.updateValidation();
        }
        if (this.isAnInternalValidatorChange(changes)) {
            this.refreshInternalValidators();
            this.updateValidation();
        }
        if (changes.errorMessages && this.internalControl.dirty) {
            this.internalControl.updateValueAndValidity();
        }
    }

    ngOnInit(): void {
        this.setIds();
        this.setupInternalFormControl();
    }

    ngAfterViewInit(): void {
        if (this.platform.isBrowser && !!this.input) {
            const element = this.input.nativeElement;
            this.autofillMonitor.monitor(element).subscribe((event) => {
                this._autofilled = event.isAutofilled;
                if (this._autofilled) {
                    this.writeValue(null);
                    this.internalControl.updateValueAndValidity();
                }
            });
        }
        if (this.platform.IOS && !!this.input) {
            const input = this.input;
            this.ngZone.runOutsideAngular(() => {
                input.nativeElement.addEventListener('keyup', (event: Event) => {
                    const element = event.target as HTMLInputElement;
                    if (!element.value && !element.selectionStart && !element.selectionEnd) {
                        // Note: Just setting `0, 0` doesn't fix the issue. Setting
                        // `1, 1` fixes it for the first time that you type text and
                        // then hold delete. Toggling to `1, 1` and then back to
                        // `0, 0` seems to completely fix it.
                        element.setSelectionRange(1, 1);
                        element.setSelectionRange(0, 0);
                    }
                });
            });
        }

        if (!!this.labelElement) {
            this._label = this.labelElement.nativeElement.textContent.trim();
        }

        if (this._hasFocus && !!this.input) {
            this.input.nativeElement.focus();
        }
    }

    ngOnDestroy() {
        this.terminator.next();
        this.terminator.complete();
        this.debounceTimeChanged.complete();
    }

    /**
     * ONLY FOR ngModel and formControls
     * write value is updating local formControl
     * so we need to maintain local model and repaint the component
     * @param val
     */
    writeValue(val: any): void {
        if (!!this.input && !this.isStandalone) {
            // prevent debouncedValueChange from being triggered as change comes from parent
            this.debounceTimeChanged.next();
            this.internalModel = val;
            markForCheck(this.cdr);
            this.initDebounce();
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this._disabled = isDisabled;
        if (this.isStandalone) {
            if (isDisabled) {
                this.internalControl.disable();
            } else {
                this.internalControl.enable();
            }
        }
        markForCheck(this.cdr);
    }

    /**
     * NB: will be override by Control Value Accessor
     * the the content of this method is only processed
     * when the component is standalone
     */
    onChange(event: any) {
        if (this.internalControl.pristine) {
            this.internalControl.markAsDirty();
        }
        this.internalControl.patchValue(this.internalModel);
        this.valueChange.emit(this.internalModel);
    }

    /**
     * NB: will be override by Control Value Accessor
     * the the content of this method is only processed
     * when the component is standalone
     */
    onTouched() {
        this.internalControl.markAsTouched();
        this.internalControl.updateValueAndValidity();
    }

    onBlur() {
        if (this.isStandalone) {
            this.onTouched();
        }
        this.blurring.emit(this.internalModel);
    }

    onKeyUp(event: any) {
        if (this.isActive() && event.key !== Keys.tab && !!event.target) {
            this.keyUp.emit(this.internalModel);
            if (event.key === Keys.enter) {
                this.enter.emit({ event: event, value: this.internalModel });
            }
        }
    }

    onFocus(event: any) {
        if (this.isActive()) {
            this.focusing.emit(event);
        }
    }

    /**
     * NB: this won't be executed in standalone
     * this won't be executed with ngModel outside of form...
     *
     * ONLY FOR ngModel & formControls
     * @param c
     * TODO: try to remove this
     */
    validate(c: AbstractControl): ValidationErrors {
        return [];
    }

    setIds() {
        this._id = !this.id ? `${this._fieldType}-${nextId++}` : `${this.id}-${this._fieldType}`;
        this._name = this.name || this._id;
        this._helpId = `${this._id}-help`;
    }

    setupInternalFormControl() {
        // ngModels will have a formControl attached by angular
        this.isStandalone = !this.parentControl || !this.parentControl.control;
        this.isFormControl = !!this.parentControl && this.parentControl instanceof FormControlName;

        if (!this.isStandalone && this.parentControl.control) {
            this.internalControl = this.parentControl.control;
        }
        this.refreshParentValidator();
        this.updateValidation();
        this.trackValidation();
        this.initDebounce();
    }

    initDebounce() {
        // wait for inner state to be stable before subscribing to changes
        setTimeout(() => {
            this.internalControl.valueChanges
                .pipe(
                    debounceTime(this._debouncedTime),
                    distinctUntilChanged(),
                    takeUntil(merge(this.debounceTimeChanged, this.terminator))
                )
                .subscribe((value) => this.debouncedValueChange.emit(value));
        });
    }

    internalPatchValue(value: string | number) {
        // prevent debouncedValueChange from being triggered when changes come from parent
        this.debounceTimeChanged.next();
        this.internalModel = !!value || value === 0 ? value : '';
        const shouldUpdateValidation = this.internalControl.dirty;
        this.internalControl.patchValue(this.internalModel, { emitEvent: shouldUpdateValidation });
        this.initDebounce();
    }

    isActive(): boolean {
        const inactive = this.disabled || this.readonly || this.internalControl.disabled;
        return !inactive;
    }

    refreshParentValidator() {
        if (!this.isStandalone) {
            if (this.isFormControl) {
                this.parentValidator = this.parentControl?.control?.validator;
                this.parentAsyncValidator = this.parentControl?.control?.asyncValidator;
            } else {
                this.parentValidator = this.parentControl?.validator;
                this.parentAsyncValidator = this.parentControl?.asyncValidator;
            }
        }
    }

    refreshInternalValidators() {
        this.forceErrorValidator = !!this.errorMessage ? this.buildForceErrorValidator(this.errorMessage) : undefined;
        this.requiredValidator = !!this.required ? Validators.required : undefined;
        this.patternValidator = !!this.pattern ? Validators.pattern(this.pattern) : undefined;
        this.minValidator = !!this.min ? Validators.min(this.min) : undefined;
        this.maxValidator = !!this.max ? Validators.max(this.max) : undefined;
        this.maxlengthValidator = !!this.maxlength ? Validators.maxLength(this.maxlength) : undefined;
    }
    /**
     * Merge control's validators with current inner validation configuration
     * NB: validators from parent component should be preserved unless it is explicitly set to false
     *
     */
    updateValidation() {
        // DO NOT OVERRIDE Validators before onInit TODO: checkThat
        if (this.parentControl && this.internalControl !== this.parentControl.control) {
            return;
        }
        const validators = [];

        if (!!this.forceErrorValidator) {
            validators.push(this.forceErrorValidator);
        }
        if (!!this.requiredValidator) {
            validators.push(this.requiredValidator);
        }
        if (!!this.patternValidator) {
            validators.push(this.patternValidator);
        }
        if (!!this.minValidator) {
            validators.push(this.minValidator);
        }
        if (!!this.maxValidator) {
            validators.push(this.maxValidator);
        }
        if (!!this.maxlengthValidator) {
            validators.push(this.maxlengthValidator);
        }

        if (!!this.parentValidator) {
            validators.push(this.parentValidator);
        }

        this.internalControl.clearValidators();
        this.internalControl.setErrors(null, { emitEvent: false });
        this.internalControl.setValidators(validators);
        if (this.parentAsyncValidator) {
            this.internalControl.setAsyncValidators(this.parentAsyncValidator);
        }
        if (this.internalControl.dirty) {
            this.internalControl.updateValueAndValidity();
        }
    }

    trackValidation() {
        this.internalControl.statusChanges.pipe(takeUntil(this.terminator)).subscribe((status) => {
            this._errorHelp = this.internalControl.dirty && status === 'INVALID' ? this.buildErrorMessage() : undefined;
            markForCheck(this.cdr);
        });
    }
    /**
     * Concat all error messages, either from input messages or from the value provided by validators
     */
    buildErrorMessage(): string {
        let errorHelp = '';
        if (this.internalControl.errors) {
            const messages: any = this.errorMessages || {};
            const errors = this.internalControl.errors;
            const displayedErrorMessage = Object.keys(errors).reduce((agg, key) => {
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
            errorHelp = displayedErrorMessage.length > 0 ? displayedErrorMessage.substr(2) : displayedErrorMessage;
        }
        return errorHelp;
    }

    buildForceErrorValidator(message: string): ValidatorFn {
        return (): { [key: string]: any } | null => {
            return { customError: message };
        };
    }

    private isAnInternalValidatorChange(changes: SimpleChanges) {
        return (
            changes.required ||
            changes.min ||
            changes.max ||
            changes.maxlength ||
            changes.pattern ||
            changes.errorMessage
        );
    }
}
