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
    NgControl,
    ValidationErrors,
    Validator,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { detectChanges, Keys, markForCheck } from '../common';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ErrorMessages, InputErrors } from '../..';

let nextId = 0;

@Component({
    selector: 'pa-poc-input',
    templateUrl: './poc-input.component.html',
    styleUrls: ['./poc-input.component.scss'],
    providers: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PocInputComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy, ControlValueAccessor, Validator {
    @Input() id?: string;
    @Input() name?: string;
    @Input() type: 'text' | 'number' | 'password' | 'email' = 'text';
    @Input()
    get placeholder(): string {
        return this._placeholder;
    }
    set placeholder(value: string) {
        this._placeholder = value || '';
    }
    @Input()
    get help(): string {
        return this._help;
    }
    set help(value: string) {
        this._help = value || '';
    }
    /**
     * CAUTION: only use when not using ngModel or formControls
     */
    @Input()
    set value(value: string | number) {
        if (!this.standalone) {
            console.warn('Do not use value property and ngModel or form control at the same time');
        }
        this._value = !!value || value === 0 ? value : '';
    }

    // Field state
    @Input()
    get readonly(): boolean {
        return this._readonly;
    }
    set readonly(value: boolean) {
        this._readonly = coerceBooleanProperty(value);
    }
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }
    @Input()
    get hasFocus(): boolean {
        return this._hasFocus;
    }
    set hasFocus(value: boolean) {
        this._hasFocus = coerceBooleanProperty(value);
        if (this._hasFocus && !!this.input) {
            this.input.nativeElement.focus();
        }
    }
    @Input()
    get noAutoComplete(): boolean {
        return this._noAutoComplete;
    }
    set noAutoComplete(value: boolean) {
        this._noAutoComplete = coerceBooleanProperty(value);
    }
    @Input() debounceDuration = 500;

    // Validation
    @Input()
    set required(value: boolean | undefined) {
        // NB: undefined must be considered as a valid value
        // so that parent's required validator won't be erased by an undefined
        this._required = value;
    }
    @Input()
    set min(value: number | undefined) {
        this._min = value;
    }
    @Input()
    set max(value: number | undefined) {
        this._max = value;
    }
    @Input()
    set maxlength(value: number | undefined) {
        this._maxLength = value;
    }
    @Input()
    set pattern(value: RegExp | undefined) {
        this._pattern = value;
    }

    @Input() errorMessages?: ErrorMessages;
    /**
     * Manual error messaging
     */
    @Input() errorMessage?: string;

    @ViewChild('input') input?: ElementRef;
    @ViewChild('label') labelElement?: ElementRef;

    @Output() debouncedValueChange: EventEmitter<string | number> = new EventEmitter();
    @Output() focusing: EventEmitter<FocusEvent> = new EventEmitter();
    @Output() keyUp: EventEmitter<any> = new EventEmitter();
    @Output() enter: EventEmitter<{ event: KeyboardEvent; value: any }> = new EventEmitter();
    // Stand alone only, use angular touched property and ngModelChange instead
    @Output() valueChange: EventEmitter<string | number> = new EventEmitter();
    @Output() blurring: EventEmitter<string | number> = new EventEmitter();

    _id = '';
    _name = '';
    _fieldType = 'input';
    _placeholder = '';
    _label = '';
    _helpId = '';
    _help = '';
    _value?: string | number = '';

    _hasFocus = false;
    _disabled = false;
    _readonly = false;
    _noAutoComplete = false;

    /**
     * autofilled is set according to browser in the afterViewInit lifeCycle
     */
    _autofilled = false;

    _required?: boolean;
    _min?: number;
    _max?: number;
    _pattern?: RegExp;
    _maxLength?: number;
    _error?: string;

    debouncer: Subject<any> = new Subject();
    terminator: Subject<void> = new Subject();

    // additional
    standalone = true;
    control: AbstractControl = new FormControl();

    /**
     *
     * @param selfControl (superClass of ngModel and formControl)
     * prevents localControl from being override by angular,
     * provides NG_VALUE_ACCESSOR and NG_VALIDATORS
     */
    constructor(
        @Optional() @Self() public selfControl: NgControl,
        protected platform: Platform,
        protected ngZone: NgZone,
        protected cdr: ChangeDetectorRef,
        private autofillMonitor: AutofillMonitor,
        public element: ElementRef
    ) {
        if (!!this.selfControl) {
            this.selfControl.valueAccessor = this;
        }
        this.debouncer
            .pipe(takeUntil(this.terminator), debounceTime(this.debounceDuration))
            .subscribe((value) => this.debouncedValueChange.emit(value));
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.required || changes.min || changes.max || changes.maxlength || changes.pattern) {
            this.updateValidators();
        }
        if (changes.errorMessages) {
            this.control.updateValueAndValidity();
        }
    }

    ngOnInit(): void {
        this.setIds();
        this.initFormControl();
    }

    ngAfterViewInit(): void {
        if (this.platform.isBrowser && !!this.input) {
            const element = this.input.nativeElement;
            this.autofillMonitor.monitor(element).subscribe((event) => {
                this._autofilled = event.isAutofilled;
                if (this._autofilled) {
                    this.writeValue(undefined);
                    //this.control.updateValueAndValidity();
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
    }

    /**
     * ONLY FOR ngModel and formControls
     * @param val
     */
    writeValue(val: any): void {
        if (!!this.input && !this.standalone) {
            this.input.nativeElement.value = val;
        }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this._disabled = isDisabled;
    }

    /**
     * NB: will be override by angular if not standalone
     * @param event
     */
    onChange(event: any) {
        console.log('onChange', event, this._value);
        if (this.control.pristine) {
            this.control.markAsDirty();
        }
        this.control.patchValue(this._value);
        this.valueChange.emit(this._value);
    }

    /**
     * NB: will be override by Angular if not standalone
     */
    onTouched() {
        this.control.markAsTouched();
        this.blurring.emit(this._value);
    }

    onKeyUp(event: any) {
        if (event.key !== Keys.tab && !!event.target) {
            this.keyUp.emit(this._value);
            if (event.key === Keys.enter) {
                this.enter.emit({ event: event, value: this._value });
            } else {
                this.debouncer.next(this._value);
            }
        }
    }

    onFocus(event: any) {
        console.log('onFocus');
        this.focusing.emit(event);
    }

    /**
     * NB: this won't be executed in standalone
     * this won't be executed with ngModel outside of form...
     *
     * ONLY FOR ngModel & formControls
     * @param c
     */
    validate(c: AbstractControl): ValidationErrors {
        // TODO check that
        console.log('doing something ?');
        // const validators: ValidatorFn[] = [];
        // if (this.required) {
        //     validators.push(Validators.required);
        // }
        // if (this.pattern) {
        //     validators.push(Validators.pattern(this.pattern));
        // }

        return [];
    }

    setIds() {
        this._id = !this.id ? `${this._fieldType}-${nextId++}` : `${this.id}-${this._fieldType}`;
        this._name = this.name || this._id;
        this._helpId = `${this._id}-help`;
    }

    initFormControl() {
        if (!!this.selfControl && !!this.selfControl.control) {
            this.control = this.selfControl.control;
            this.standalone = false;
        }
        console.log('standalone ?', this.standalone);
        this.updateValidators();
        this.trackValidation();
    }

    /**
     * Merge control's validators with current inner validation configuration
     * NB: validators from parent component should be preserved unless it is explicitly set to false
     */
    updateValidators() {
        let currentValidator: any = !!this.control.validator ? this.control.validator : {};
        const validators = [];

        // TODO: test the undefined
        if (this._required && !currentValidator.required) {
            validators.push(Validators.required);
        } else if (!this._required && currentValidator.required) {
            delete currentValidator.required;
        }

        if (this._pattern && !currentValidator.pattern) {
            validators.push(Validators.pattern(this._pattern));
        } else if (!this._pattern && currentValidator.pattern) {
            delete currentValidator.pattern;
        }

        if (this._maxLength && !currentValidator.maxLength) {
            validators.push(Validators.maxLength(this._maxLength));
        } else if (!this._maxLength && currentValidator.maxLength) {
            delete currentValidator.maxLength;
        }

        if (this._min && !currentValidator.min) {
            validators.push(Validators.min(this._min));
        } else if (!this._min && currentValidator.min) {
            delete currentValidator.min;
        }

        if (this._max && !currentValidator.max) {
            validators.push(Validators.max(this._max));
        } else if (!this._max && currentValidator.max) {
            delete currentValidator.max;
        }

        if (Object.keys(currentValidator).length > 0) {
            validators.push(currentValidator);
        }
        console.log('validator array', validators);

        // console.log('updating validators / controls_validator', this.control.validator);
        this.control.clearValidators();
        this.control.setErrors(null, { emitEvent: false });
        this.control.setValidators(validators);

        console.log('Now control is', this.control);
        if (this.control.dirty) {
            this.control.updateValueAndValidity();
        }
    }

    trackValidation() {
        this.control.statusChanges.pipe(takeUntil(this.terminator)).subscribe((status) => {
            // , this.control, this.control.value, this._value,
            console.log('status changed', status);
            if (this.control.pristine) {
                return;
            }
            if (status === 'INVALID') {
                this.buildError();
            } else {
                this._error = undefined;
            }
        });
    }
    buildError() {
        if (!!this.errorMessages && this.control.errors) {
            const messages: any = this.errorMessages;
            const errors = this.control.errors;
            this._error = Object.keys(errors).reduce((agg, key) => {
                if (!!messages[key]) {
                    return [agg, messages[key]].join(', ');
                }
                if (typeof errors[key] === 'string') {
                    return [agg, errors[key]].join(', ');
                }
                return agg;
            }, '');
        } else {
            markForCheck(this.cdr);
        }
    }
}
