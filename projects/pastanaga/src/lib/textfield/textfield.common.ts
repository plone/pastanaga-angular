import { ControlValueAccessor, FormControl, Validator } from '@angular/forms';
import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { keyCodes } from '../keycodes.constant';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

let nextId = 0;

export class TextfieldCommon implements ControlValueAccessor, OnInit, Validator {
    @Input() id?: string;
    @Input() name?: string;
    @Input() value?: string | number = '';
    @Input() errorHelp?: string;
    @Input() errorMessage?: string;
    @Input() placeholder?: string;
    @Input() help?: string;
    @Input()
    get required(): boolean { return this._required; }
    set required(value: boolean) { this._required = coerceBooleanProperty(value); }
    protected _required = false;
    @Input() pattern?: RegExp;
    @Input() min?: number;
    @Input() max?: number;
    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
    protected _disabled = false;
    @Input()
    get isReadOnly(): boolean { return this._readOnly; }
    set isReadOnly(value: boolean) { this._readOnly = coerceBooleanProperty(value); }
    protected _readOnly = false;
    @Input()
    get isLabelHidden(): boolean { return this._labelHidden; }
    set isLabelHidden(value: boolean) { this._labelHidden = coerceBooleanProperty(value); }
    protected _labelHidden = false;
    @Input()
    get isPlaceholderShown(): boolean { return this._placeholderShown; }
    set isPlaceholderShown(value: boolean) { this._placeholderShown = coerceBooleanProperty(value); }
    protected _placeholderShown = false;
    @Output() valueChange: EventEmitter<any> = new EventEmitter();
    @Output() instantValueChange: EventEmitter<any> = new EventEmitter();
    @Output() keyUp: EventEmitter<any> = new EventEmitter();
    @Output() enter: EventEmitter<{event: KeyboardEvent, value: string}> = new EventEmitter();
    @Output() blur: EventEmitter<any> = new EventEmitter();
    helpId = '';
    onChange?: Function;
    onTouched?: Function;
    hasError = false;
    errors: { required: boolean, pattern: boolean, passwordStrength?: boolean, min?: boolean, max?: boolean } = {
        required: false,
        pattern: false,
    };

    baseId = '';
    type = '';

    debouncer: Subject<string> = new Subject();

    constructor() {
        this.debouncer.pipe(debounceTime(500)).subscribe(value => this.valueChange.emit(value));
    }

    ngOnInit() {
        this.id = !!this.id ? `${this.id}-input` : `${this.baseId}-${nextId++}`;
        this.name = this.name || this.id;
        if (!!this.help) {
            this.helpId = `${this.id}-help`;
        }
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

    onKeyUp($event) {
        if ($event.keyCode !== keyCodes.tab) {
            const value = $event.target.value;
            this._validate(value);
            this.writeValue(value);
            this.keyUp.emit(value);
            if (!!this.onChange) {
                this.onChange(value);
            }
            if ($event.keyCode === keyCodes.enter) {
                this.enter.emit({event: $event, value: value});
            }
        }
    }

    onBlur() {
        this._validate(this.value);
        this.validate(<FormControl>{});
        this.blur.emit(this.value);
    }

    _validate(value) {
        if (this.required) {
            this.errors.required = !value && value !== 0;
        }
        if (!!this.pattern && typeof value === 'string') {
            this.errors.pattern = !!value && !this.pattern.test(value);
        }
        if ((!!value || typeof value === 'number') && this.type === 'number') {
            const numVal = typeof value === 'number' ? value : parseFloat(value);
            if (typeof this.min === 'number') {
                this.errors.min = numVal < this.min;
            }
            if (typeof this.max === 'number') {
                this.errors.max = numVal > this.max;
            }
        }
    }

    validate(control: FormControl) {
        if (!this.errors.required && !this.errors.pattern && !this.errors.min && !this.errors.max) {
            this.hasError = false;
            return null;
        }
        const errors: any = {};
        if (this.errors.required) {
            errors.required = {valid: false};
        }
        if (this.errors.pattern) {
            errors.pattern = {valid: false};
        }
        if (this.errors.min) {
            errors.min = {valid: false};
        }
        if (this.errors.max) {
            errors.max = {valid: false};
        }
        this.hasError = true;
        return errors;
    }

    writeValue(value: any) {
        this.value = value;
        this.instantValueChange.emit(value);
        this.debouncer.next(value);
    }

    registerOnTouched(handler: any) {
        this.onTouched = (handler as Function);
    }

    registerOnChange(handler: any) {
        this.onChange = (handler as Function);
    }

    setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }
}
