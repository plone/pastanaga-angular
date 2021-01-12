import {
    ChangeDetectorRef,
    Directive,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Self,
    SimpleChanges,
} from '@angular/core';
import {
    FORM_CONTROL,
    FORM_CONTROL_NAME,
    IErrorMessages,
    InternalMode,
    NG_MODEL,
    STANDALONE,
    UpdateOnStrategy,
} from './form-field.model';
import {
    buildAlwaysFalseValidator,
    concatAllErrorMessages,
    findFirstErrorMessage,
    isFormControl,
    isFormControlName,
    isNgModel,
    isStandalone,
} from './form-field.utils';
import { merge, Subject } from 'rxjs';
import {
    AbstractControl,
    ControlValueAccessor,
    FormControl,
    FormControlDirective,
    FormControlName,
    NgControl,
    ValidatorFn,
} from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { markForCheck } from '../common';
import { takeUntil } from 'rxjs/operators';

let nextId = 0;

/**
 * Wraps a value, a ngModel or a formControl.
 * handle id/name generation when not provided.
 * apply and synchronize internal state to parentComponent NgControl's state
 * @deprecated
 * should be replaced with a paFormControl directive
 * because:
 * * it is too complicated and does too much
 * * some pa-form-fields won't need a big part of this code
 * * there's a tight coupling between this parent class and the child html element which is not advisable
 * * we should be able to provide the same functionality without dealing with a model and a formControl at the same time.
 * * creating ot exposing a single formControl should be enough to manage values and states
 */
@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class BaseControl implements OnChanges, OnInit, OnDestroy, ControlValueAccessor {
    terminator: Subject<void> = new Subject();

    /**
     * When id of formFieldBase is provided
     * htmlElement will have a concatenation of this id and fieldKind
     * otherwise, html element will have a generated id
     */
    @Input() set id(value: string | undefined) {
        this._id = value || '';
    }

    @Input() set name(value: string) {
        this._name = value;
    }
    @Input() set help(value: string | undefined) {
        this._help = value;
        this.updateDescribedBy();
    }
    @Input() set describedBy(value: string) {
        this._defaultDescribedBy = value;
        this.updateDescribedBy();
    }

    @Input() set readonly(value: boolean) {
        this._readonly = coerceBooleanProperty(value);
    }

    @Input() set hasFocus(value: boolean) {
        this._hasFocus = coerceBooleanProperty(value);
        this.focus();
    }

    @Input() set disabled(value: boolean) {
        if (coerceBooleanProperty(value)) {
            this.control.disable();
        } else {
            this.control.enable();
        }
    }

    @Input() showAllErrors = true;
    @Input() errorMessages?: IErrorMessages;
    /**
     * Manual error messaging: a manual 'always false' validator
     * is added to internal form control
     */
    @Input() set errorMessage(message: string | undefined) {
        this.alwaysFalseValidator = !!message ? buildAlwaysFalseValidator(message) : undefined;
    }

    /**
     * An event to notify the component when parent's validators have changed.
     * This avoids tracking parents validator changes on the doCheck lifeCycle
     * and therefore is a huge performance gain.
     * The stream is initialized 'once for good' and won't be used if not provided in the onInit lifeCycle.
     */
    @Input() updateValidator?: Subject<any>;

    @Input() set value(value: any) {
        if (!isStandalone(this._internalMode)) {
            console.warn('Do not use value property in combination with ngModel or form control.');
        }
        this.onWriteValue(value);
    }
    get value() {
        return this.model;
    }

    @Input() set updateOn(value: UpdateOnStrategy) {
        // changing the 'updateOn' strategy is accomplished by changing the reference of the internal formControl
        // if the internal formControl is provided by the parent component. This cannot be processed.
        // CAUTION: if parent's form control's reference is broken, form field will be out of sync with it's parent.
        if (!isStandalone(this._internalMode)) {
            console.warn('Dynamic changes of updateOn FormHook is not supported for ngModel nor formControl.');
        } else {
            this._formControlChanged.next();
            this._updateOn = value;
            const pristineState = this.control.pristine;
            this.control = new FormControl(this.model, { updateOn: this._updateOn });
            if (!pristineState) {
                this.control.markAsDirty();
            }
            this.manageInternalState();
        }
    }

    htmlElement?: any;
    model: any;
    control: AbstractControl = new FormControl();

    _id = '';
    _autoId = 0;
    _name = '';
    _elementId = '';
    _fieldKind = 'field';
    _helpId = '';
    _defaultDescribedBy?: string;
    _describedBy = '';
    _help?: string;
    _errorHelp?: string;
    _readonly = false;
    _hasFocus = false;

    _internalMode: InternalMode = STANDALONE;
    _updateOn: UpdateOnStrategy = 'change';
    _parentValidator?: ValidatorFn | null = null;
    _parentAsyncValidator: any;
    _formControlChanged: Subject<void> = new Subject();
    alwaysFalseValidator?: ValidatorFn;

    /**
     * Define what should be processed before the value change is triggered by the parent component.
     * For example: sanitizing or coerce value...
     */
    abstract preWriteValue: (value: any) => any;
    /**
     * Define what should be processed after the value change is triggered by the parent component.
     * For example: emit an event, add a class...
     */
    abstract postValueChange: () => void;
    /**
     * Define what should be processed when the internal value change.
     * For example: sanitizing or coerce value...
     */
    abstract preValueChange: (value: any) => any;
    /**
     * Define what should be processed after the internal value change.
     * For example: emit an event, add a class...
     */
    abstract postWriteValue: () => void;
    /**
     * Provide the list of internal validators to apply
     */
    abstract listInternalValidators: () => ValidatorFn[];
    /**
     * register actions to be processed when internal formControl's value change is triggered
     */
    abstract registerOnValueChange: (value: any) => void;
    /**
     * register actions to be processed when internal formControl's status change is triggered
     */
    abstract registerOnStatusChanges: (status: any) => void;
    /**
     * Evaluate whether validators should be updated or not in the NgOnChange hook
     */
    abstract shouldUpdateValidators: (changes: SimpleChanges) => boolean;

    /**
     * NgControl is a superClass of ngModel and formControl
     * and prevents local form control from being overridden by angular,
     */
    protected constructor(@Optional() @Self() public parentControl: NgControl, protected cdr: ChangeDetectorRef) {
        nextId++;
        this._autoId = nextId;
        if (!!this.parentControl) {
            this.parentControl.valueAccessor = this;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.shouldUpdateValidators(changes)) {
            this.mergeValidators();
        }
        if ((changes.errorMessages || changes.showAllErrors) && this.control.dirty) {
            this.control.updateValueAndValidity();
        }
        if (changes.id || changes.name) {
            this.setupIdentifiers();
        }
    }

    ngOnInit(): void {
        this.setupIdentifiers();
        this.setupFormControl();
        this.initParentValidators();
        this.manageInternalState();
        if (!!this.updateValidator) {
            this.updateValidator.pipe(takeUntil(this.terminator)).subscribe(() => {
                this.initParentValidators();
                this.mergeValidators();
            });
        }
    }

    ngOnDestroy() {
        this.terminator.next();
        this.terminator.complete();
        this._formControlChanged.complete();
    }

    /**
     * ONLY FOR ngModel and formControls
     * write value is updating local formControl
     * so we need to maintain local model and repaint the component
     */
    writeValue(val: any): void {
        this.onWriteValue(val);
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /**
     * Is overridden by Control Value Accessor.
     * This method only applies when no Control Value Accessor
     * is provided by parent component (standalone mode).
     */
    onTouched() {
        this.control.markAsTouched();
        this.control.updateValueAndValidity();
    }

    /**
     * Is overridden by Control Value Accessor.
     * This method only applies when no Control Value Accessor
     * is provided by parent component (standalone mode).
     */
    onChange(event: any) {
        if (this._updateOn !== 'change' || !this.isActive()) {
            return;
        }
        this.onValueChange(event);
    }

    onBlur() {
        if (isStandalone(this._internalMode)) {
            this.onTouched();
        }
        if (this._updateOn === 'blur') {
            this.onValueChange(this.htmlElement?.value);
        }
    }

    isActive(): boolean {
        return !this._readonly && !!this.control && !this.control.disabled;
    }

    focus() {
        if (this._hasFocus && !!this.htmlElement && this.isActive()) {
            this.htmlElement.focus();
        }
    }

    onValueChange(value: any) {
        this.model = this.preValueChange(value);
        this.control.markAsDirty();
        this.control.setValue(this.model);
        this.postValueChange();
    }

    onWriteValue(value: any) {
        const val = this.preWriteValue(value);
        if (this.model !== val) {
            this.model = val;
        }
        if (this.control.value !== this.model) {
            // only emit event when formControl is dirty
            this.control.patchValue(this.model, { emitEvent: this.control.dirty });
        }
        this.postWriteValue();
    }

    setupFormControl() {
        this.setupInternalMode();

        if (!isStandalone(this._internalMode) && this.parentControl.control) {
            this.control = this.parentControl.control;
        }
        if (isFormControl(this._internalMode)) {
            this.control = (this.parentControl as FormControlDirective).form;
        }
        this._updateOn = this.control.updateOn;
    }

    setupInternalMode() {
        if (!this.parentControl || !this.parentControl.control) {
            this._internalMode = STANDALONE;
        } else if (!!this.parentControl && this.parentControl instanceof FormControlName) {
            this._internalMode = FORM_CONTROL_NAME;
        } else if (!!this.parentControl && this.parentControl instanceof FormControlDirective) {
            this._internalMode = FORM_CONTROL;
        } else {
            this._internalMode = NG_MODEL;
        }
    }

    initParentValidators() {
        if (isFormControlName(this._internalMode)) {
            this._parentValidator = this.parentControl?.control?.validator;
            this._parentAsyncValidator = this.parentControl?.control?.asyncValidator;
        } else if (isFormControl(this._internalMode)) {
            this._parentValidator = (this.parentControl as FormControlDirective).form.validator;
            this._parentAsyncValidator = (this.parentControl as FormControlDirective).form.asyncValidator;
        } else if (isNgModel(this._internalMode)) {
            this._parentValidator = this.parentControl?.validator;
            this._parentAsyncValidator = this.parentControl?.asyncValidator;
        }
    }

    manageInternalState() {
        this.mergeValidators();
        this.control.valueChanges
            .pipe(takeUntil(merge(this._formControlChanged, this.terminator)))
            .subscribe((value) => {
                this.registerOnValueChange(value);
            });
        this.control.statusChanges
            .pipe(takeUntil(merge(this._formControlChanged, this.terminator)))
            .subscribe((status) => {
                this.registerOnStatusChanges(status);
                this._errorHelp = this.control.dirty && status === 'INVALID' ? this.buildErrorMessage() : undefined;
                this.updateDescribedBy();
                markForCheck(this.cdr);
            });
    }

    /**
     * (Re) build internal formControl validator function
     * merging internal Validators and parent NgControl's validator function.
     * Internal validators are added if present.
     * Parent's validator function is added 'as it is' to internal formControl.
     */
    mergeValidators() {
        const validators = this.listInternalValidators();

        if (!!this.alwaysFalseValidator) {
            validators.push(this.alwaysFalseValidator);
        }
        if (!!this._parentValidator) {
            validators.push(this._parentValidator);
        }
        this.control.clearValidators();
        this.control.setErrors(null, { emitEvent: false });
        this.control.setValidators(validators);
        if (this._parentAsyncValidator) {
            this.control.setAsyncValidators(this._parentAsyncValidator);
        }

        if (this.control.dirty) {
            this.control.updateValueAndValidity();
        }
    }

    /**
     * Concat all error messages, either from input messages or from the value provided by validators
     */
    buildErrorMessage(): string {
        if (this.control.errors) {
            return this.showAllErrors
                ? concatAllErrorMessages(this.control.errors, this.errorMessages)
                : findFirstErrorMessage(this.control.errors, this.errorMessages);
        }
        return '';
    }

    private updateDescribedBy() {
        if (!!this._errorHelp || !!this._help) {
            this._describedBy = this._helpId;
        } else if (!!this._defaultDescribedBy) {
            this._describedBy = this._defaultDescribedBy;
        } else {
            this._describedBy = '';
        }
    }

    setupIdentifiers() {
        this._elementId = this._id ? `${this._id}-${this._fieldKind}` : `${this._fieldKind}-${this._autoId}`;
        if (!this._name) {
            this._name = this._elementId;
        }
        this._helpId = `${this._elementId}-help`;
        this.updateDescribedBy();
        markForCheck(this.cdr);
    }
}
