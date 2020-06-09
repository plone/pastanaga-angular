import { ControlValueAccessor, FormControl, ValidationErrors, Validator } from '@angular/forms';
import {
    AfterContentInit,
    ChangeDetectorRef,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { detectChanges, Keys } from '../common';

let nextId = 0;

export interface InputErrors {
    required: boolean;
    pattern: boolean;
    min?: boolean;
    max?: boolean;
    passwordStrength?: boolean;
}
export interface IErrorMessages {
    required?: string;
    pattern?: string;
    min?: string;
    max?: string;
    passwordStrength?: string;
}
export class ErrorMessages {
    required: string;
    pattern: string;
    min: string;
    max: string;
    passwordStrength: string;

    constructor(messages: IErrorMessages) {
        this.required = messages.required || '';
        this.pattern = messages.pattern || '';
        this.min = messages.min || '';
        this.max = messages.max || '';
        this.passwordStrength = messages.passwordStrength || '';
    }
}

export class BaseTextField implements AfterContentInit, ControlValueAccessor, OnInit, OnDestroy, Validator {
    @Input() id?: string;
    @Input() name?: string;
    @Input() debounceDuration = 500;
    @Input() errorMessages?: ErrorMessages;
    @Input()
    get errorMessage(): string { return this._errorMessage; }
    set errorMessage(value: string) { this._errorMessage = value; }
    @Input()
    get placeholder(): string { return this._placeholder; };
    set placeholder(value: string) { this._placeholder = value || ''; };
    @Input()
    get help(): string { return this._help; };
    set help(value: string) { this._help = value || ''; };
    @Input()
    get value(): string | number { return this._value; }
    set value(value: string | number) { this._value = !!value || value === 0 ? value : ''; }
    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
    @Input()
    get readonly(): boolean { return this._readonly; }
    set readonly(value: boolean) { this._readonly = coerceBooleanProperty(value); }
    @Input()
    get required(): boolean { return this._required; }
    set required(value: boolean) { this._required = coerceBooleanProperty(value); }

    @Output() valueChange: EventEmitter<string | number> = new EventEmitter();
    @Output() instantValueChange: EventEmitter<string | number> = new EventEmitter();
    @Output() keyUp: EventEmitter<string> = new EventEmitter();
    @Output() enter: EventEmitter<{event: KeyboardEvent, value: string}> = new EventEmitter();
    @Output() blur: EventEmitter<string | number> = new EventEmitter();
    @Output() focus: EventEmitter<FocusEvent> = new EventEmitter();

    @ViewChild('labelElement') label?: ElementRef;

    _id = '';
    _name = '';
    _value: string | number = '';
    _fieldType = 'textfield';
    _disabled = false;
    _readonly = false;
    _required = false;

    _label = '';
    _placeholder = '';
    _help = '';
    _hasError = false;
    _errors: InputErrors = {
        required: false,
        pattern: false,
    };
    _errorMessage = '';

    onChange?: Function;
    onTouched?: Function;
    onValidatorChange?: Function;

    debouncer: Subject<string> = new Subject();
    terminator: Subject<void> = new Subject();

    constructor(
        protected cdr: ChangeDetectorRef,
        ) {
        this.debouncer.pipe(
            takeUntil(this.terminator),
            debounceTime(this.debounceDuration),
        ).subscribe(value => this.valueChange.emit(value));
    }

    ngOnInit(): void {
        this._id = !this.id ? `${this._fieldType}-${nextId++}` : `${this.id}-${this._fieldType}`;
        this._name = this.name || this._id;
    }

    ngAfterContentInit() {
        setTimeout(() => {
            if (!!this.label) {
                this._label = this.label.nativeElement.textContent.trim();
                detectChanges(this.cdr);
            }
        }, 0);
    }

    ngOnDestroy(): void {
        this.terminator.next();
    }

    change(value: any) {
        this._validate(value);
        this.writeValue(value);
        if (!!this.onChange) {
            this.onChange(value);
        }
        if (!!this.onTouched) {
            this.onTouched(value);
        }
    }

    onKeyUp($event: KeyboardEvent) {
        if ($event.key !== Keys.tab && !!$event.target) {
            const value = (<HTMLInputElement>$event.target).value;
            this._validate(value);
            this.writeValue(value);
            this.keyUp.emit(value);
            if (!!this.onChange) {
                this.onChange(value);
            }
            if ($event.key === Keys.enter) {
                this.enter.emit({event: $event, value: value});
            }
        }
    }

    onBlur() {
        this._validate(this.value);
        this.validate(<FormControl>{});
        this.blur.emit(this.value);
    }

    onFocus($event: FocusEvent) {
        this.focus.emit($event);
    }

    registerOnChange(handler: any): void {
        this.onTouched = (handler as Function);
    }

    registerOnTouched(handler: any): void {
        this.onChange = (handler as Function);
    }

    registerOnValidatorChange(handler: () => void): void {
        this.onValidatorChange = (handler as Function);
    }

    setDisabledState(isDisabled: boolean): void {
        this._disabled = isDisabled;
    }

    validate(control: FormControl): ValidationErrors | null {
        if (!this._errors.required && !this._errors.pattern && !this._errors.min && !this._errors.max) {
            this._hasError = false;
            return null;
        }
        const _errors: any = {};
        if (this._errors.required) {
            _errors.required = {valid: false};
        }
        if (this._errors.pattern) {
            _errors.pattern = {valid: false};
        }
        if (this._errors.min) {
            _errors.min = {valid: false};
        }
        if (this._errors.max) {
            _errors.max = {valid: false};
        }
        this._hasError = true;
        return _errors;
    }

    _validate(value: string | number | undefined) {
        if (this._required) {
            this._errors.required = !value && value !== 0;
        }

        if (!!this.errorMessages) {
            const messages: ErrorMessages = this.errorMessages;
            this._errorMessage = Object.entries(this._errors)
                .filter(([key, isInvalid]) => isInvalid)
                .map(([key, validity]) => (messages as any)[key])
                .join(', ');
        }
    }

    writeValue(value: any): void {
        this.value = value;
        this.instantValueChange.emit(value);
        this.debouncer.next(value);
    }

}
