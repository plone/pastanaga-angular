import { FormControl, ValidationErrors } from '@angular/forms';
import {
    AfterContentInit,
    ChangeDetectorRef,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    Directive,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { detectChanges, Keys } from '../../common';
import { BaseControl } from '../base-control';

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

@Directive()
export class BaseTextField extends BaseControl implements AfterContentInit, OnInit, OnDestroy {
    @Input() debounceDuration = 500;
    @Input() errorMessages?: ErrorMessages;
    @Input() pattern?: RegExp;
    @Input()
    get errorMessage(): string {
        return this._errorMessage;
    }
    set errorMessage(value: string) {
        this._errorMessage = value;
    }
    @Input()
    get placeholder(): string {
        return this._placeholder;
    }
    set placeholder(value: string) {
        this._placeholder = value || '';
    }
    @Input()
    get value(): string | number {
        return this._value;
    }
    set value(value: string | number) {
        this._value = !!value || value === 0 ? value : '';
    }
    @Input()
    get readonly(): boolean {
        return this._readonly;
    }
    set readonly(value: boolean) {
        this._readonly = coerceBooleanProperty(value);
    }
    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
    }

    @Output() valueChange: EventEmitter<string | number> = new EventEmitter();
    @Output() instantValueChange: EventEmitter<string | number> = new EventEmitter();
    @Output() keyUp: EventEmitter<string> = new EventEmitter();
    @Output() enter: EventEmitter<{ event: KeyboardEvent; value: string }> = new EventEmitter();
    @Output() blurring: EventEmitter<string | number> = new EventEmitter();
    @Output() focusing: EventEmitter<FocusEvent> = new EventEmitter();

    @ViewChild('labelElement') labelElement?: ElementRef;

    HTML_TAG = new RegExp(/.?<.+>/g);
    REPLACE_LT_GT = new RegExp(/[<>]/g);

    _value: string | number = '';
    _fieldType = 'textfield';
    _readonly = false;
    _required = false;
    _autofilled = false;

    _placeholder = '';
    _hasError = false;
    _errors: InputErrors = {
        required: false,
        pattern: false,
    };
    _errorMessage = '';

    // tslint:disable:ban-types
    onChange?: Function;
    onTouched?: Function;
    onValidatorChange?: Function;
    // tslint:enable:ban-types

    debouncer: Subject<string> = new Subject();

    constructor(protected cdr: ChangeDetectorRef, public element?: ElementRef) {
        super();
        this.debouncer
            .pipe(takeUntil(this.terminator), debounceTime(this.debounceDuration))
            .subscribe((value) => this.valueChange.emit(value));
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterContentInit() {
        setTimeout(() => {
            if (!!this.labelElement) {
                this._label = this.labelElement.nativeElement.textContent.trim();
                detectChanges(this.cdr);
            }
        }, 0);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    change(value: any) {
        if (!!this.onChange) {
            this.onChange(value);
        }
        if (!!this.onTouched) {
            this.onTouched(value);
        }
    }

    onKeyUp($event: KeyboardEvent) {
        if ($event.key !== Keys.tab && !!$event.target) {
            const value = ($event.target as HTMLInputElement).value;
            this._validate(value);
            this.writeValue(value);
            this.keyUp.emit(value);
            if (!!this.onChange) {
                this.onChange(value);
            }
            if ($event.key === Keys.enter) {
                this.enter.emit({ event: $event, value });
            }
        }
    }

    onBlur() {
        this._validate(this.value);
        this.validate({} as FormControl);
        this.blurring.emit(this.value);
    }

    onFocus($event: FocusEvent) {
        this.focusing.emit($event);
    }

    // tslint:disable:ban-types
    registerOnChange(handler: any): void {
        this.onTouched = handler as Function;
    }

    registerOnTouched(handler: any): void {
        this.onChange = handler as Function;
    }

    registerOnValidatorChange(handler: () => void): void {
        this.onValidatorChange = handler as Function;
    }
    // tslint:enable:ban-types

    setDisabledState(isDisabled: boolean): void {
        this._disabled = isDisabled;
    }

    validate(control: FormControl): ValidationErrors | null {
        if (!control.touched) {
            return null;
        }
        if (!this._errors.required && !this._errors.pattern && !this._errors.min && !this._errors.max) {
            this._hasError = false;
            return null;
        }
        const _errors: any = {};
        if (this._errors.required) {
            _errors.required = { valid: false };
        }
        if (this._errors.pattern) {
            _errors.pattern = { valid: false };
        }
        if (this._errors.min) {
            _errors.min = { valid: false };
        }
        if (this._errors.max) {
            _errors.max = { valid: false };
        }
        this._hasError = true;
        return _errors;
    }

    _validate(value: string | number | undefined) {
        if (this.isUntouched()) {
            return;
        }

        if (this._required) {
            this._errors.required = !this._autofilled && !value && value !== 0;
        }

        if (!!this.pattern && typeof value === 'string') {
            this._errors.pattern = !!value && !this.pattern.test(value);
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
        this.cdr.markForCheck();
        this.debouncer.next(value);
    }

    protected isUntouched() {
        return (
            !this._autofilled &&
            !!this.element &&
            !!this.element.nativeElement &&
            !!this.element.nativeElement.classList &&
            this.element.nativeElement.classList.contains('ng-untouched')
        );
    }
}
