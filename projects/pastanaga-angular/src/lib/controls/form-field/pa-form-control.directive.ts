import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Self,
    SimpleChanges,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    FormControlDirective,
    FormControlName,
    NgControl,
    NgModel,
    ValidatorFn,
} from '@angular/forms';
import { FORM_CONTROL, FORM_CONTROL_NAME, InternalMode, NG_MODEL, STANDALONE } from '../form-field.model';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { markForCheck } from '../../common';
import { buildAlwaysFalseValidator } from '../form-field.utils';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

let nextId = 0;

@Directive({
    selector: '[paFormControl]',
})
export class PaFormControlDirective implements OnChanges, OnInit, OnDestroy, ControlValueAccessor {
    @Input() set id(value: string | undefined) {
        if (value !== this.htmlId) {
            this._id = value;
        }
    }

    get id() {
        return this._formattedId;
    }

    @Input() set name(value: string) {
        this._name = value;
    }

    get name() {
        return this._formattedName;
    }

    @Input() set value(value: any) {
        this.writeValue(value);
    }

    @Input() set readonly(value: boolean) {
        this._readonly = coerceBooleanProperty(value);
    }

    get readonly() {
        return this._readonly;
    }

    @Input() set disabled(value: boolean) {
        this.setDisabledState(coerceBooleanProperty(value));
    }

    get disabled() {
        return this.control.disabled;
    }

    /**
     * Manual error messaging: a manual 'always false' validator
     * is added to internal form control
     */
    @Input() set errorMessage(message: string | undefined) {
        if (!!message) {
            this.internalValidatorsMap.set('error-message', buildAlwaysFalseValidator(message));
        } else {
            this.internalValidatorsMap.delete('error-message');
        }
        this.validatorChanged$.next();
    }

    get isActive() {
        return !this.readonly && !this.control.disabled;
    }
    @Output() valueChange = new EventEmitter();
    @Output() statusChange = new EventEmitter();

    readonly autoId: number;
    readonly htmlId: string | undefined;
    control: FormControl = new FormControl();
    internalMode: InternalMode = STANDALONE;
    private _parentValidator?: ValidatorFn | null = null;
    private _parentAsyncValidator: any;
    private _formControlName: string | number | null = null;

    protected fieldType = 'field';
    protected internalValidatorsMap: Map<string, ValidatorFn> = new Map();
    protected validatorChanged$ = new Subject();
    protected terminator$ = new Subject();

    private _readonly = false;
    private _id?: string;
    private _formattedId?: string;
    private _name?: string;
    private _formattedName = '';

    constructor(
        protected element: ElementRef,
        @Optional() @Self() protected parentControl: NgControl,
        protected cdr: ChangeDetectorRef
    ) {
        if (!!this.parentControl) {
            this.parentControl.valueAccessor = this;
        }

        nextId++;
        this.autoId = nextId;
        this.htmlId = this.element.nativeElement.attributes.id?.value || undefined;

        // we need this debounce to clear all pending update before updating the formControl
        this.validatorChanged$
            .pipe(debounceTime(1), takeUntil(this.terminator$))
            .subscribe(() => this.updateValidators());
    }

    ngOnChanges(changes: SimpleChanges) {
        if ((changes.errorMessages || changes.showAllErrors) && this.control.dirty) {
            this.control.updateValueAndValidity();
        }
        if (changes.id || changes.name) {
            this._setupIdentifiers();
        }
    }

    ngOnInit() {
        this._initFormControl();
        this._setupIdentifiers();
        markForCheck(this.cdr);
    }

    ngOnDestroy() {
        this.terminator$.next();
        this.terminator$.complete();
        this.validatorChanged$.complete();
    }

    // implementation when parent does not handle CVA
    onChange(val: any) {
        if (!this.readonly && !this.control.disabled) {
            this.control.patchValue(val);
        }
    }

    // parents takes control of CVA
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    // implementation when parent does not handle CVA
    onTouched() {
        this.control.markAsTouched();
    }

    // parents takes control of CVA
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /**
     * because the value may be set locally
     * write value could be triggered even when the change was already applied
     * processing is skipped in this case
     */
    writeValue(value: any): void {
        if (value === undefined) {
            this.control.setValue(null, { emitEvent: false });
        }
        // standalone specific:
        else if (value !== this.control.value) {
            this.control.setValue(value);
        }
    }

    /**
     * (Re) build internal formControl validator function
     * merging internal Validators and parent NgControl's validator function.
     * Internal validators are added if present.
     * Parent's validator function is added 'as it is' to internal formControl.
     */
    updateValidators() {
        const validators = [...this.internalValidatorsMap.values()];

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
     * id received as input is used whenever possible (avoiding duplicate identifier).
     * when no id is provided, a generated id is built.
     */
    private _setupIdentifiers() {
        if (!!this._id && this._id !== this.htmlId) {
            this._formattedId = this._id;
        } else if (!!this.htmlId) {
            this._formattedId = `${this.htmlId}-${this.fieldType}`;
        } else {
            this._formattedId = `${this.fieldType}-${this.autoId}`;
        }
        if (!!this._formControlName) {
            this._formattedName = `${this._formControlName}`;
        } else {
            this._formattedName = this._name || this._formattedId;
        }
    }

    private _initFormControl() {
        if (this.parentControl instanceof FormControlDirective) {
            this.internalMode = FORM_CONTROL;
            this.control = this.parentControl.form;
            this._parentValidator = this.parentControl.form.validator;
            this._parentAsyncValidator = this.parentControl.form.asyncValidator;
        } else if (this.parentControl instanceof FormControlName) {
            this.control = this.parentControl.control;
            this._formControlName = this.parentControl.name;
            this.internalMode = FORM_CONTROL_NAME;
            this._parentValidator = this.parentControl?.control?.validator;
            this._parentAsyncValidator = this.parentControl?.control?.asyncValidator;
        } else if (this.parentControl && this.parentControl instanceof NgModel) {
            this.control = this.parentControl.control;
            this.internalMode = NG_MODEL;
            this._parentValidator = this.parentControl?.validator;
            this._parentAsyncValidator = this.parentControl?.asyncValidator;
        }

        this.control.valueChanges.pipe(takeUntil(this.terminator$)).subscribe((val) => {
            this.valueChange.emit(val);
            if (this.internalMode === NG_MODEL && this.control.value !== (this.parentControl as NgModel).model) {
                this.parentControl.viewToModelUpdate(this.control.value);
            }
            this.updateHtmlValue(val);
        });
        this.control.statusChanges
            .pipe(takeUntil(this.terminator$))
            .subscribe((status) => this.statusChange.emit(status));
    }

    private updateHtmlValue(val: any) {
        this.element.nativeElement.value = val;
    }

    setDisabledState(isDisabled: boolean) {
        if (isDisabled === this.control.disabled) {
            return;
        }
        if (isDisabled) {
            this.control.disable();
        } else {
            this.control.enable();
        }
    }
}
