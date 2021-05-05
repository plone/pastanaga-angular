import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    OnChanges,
    SimpleChanges,
    ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { markForCheck } from '../common/utils';

let nextId = 0;

@Component({
    selector: 'pa-select',
    templateUrl: 'select.component.html',
    styleUrls: ['select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => SelectComponent),
            multi: true,
        },
    ],
})
export class SelectComponent implements ControlValueAccessor, OnChanges, OnInit, AfterViewInit, Validator {
    @Input() id?: string;
    @Input() name?: string;
    @Input() label?: string;
    @Input() value: any;
    @Input() placeholder?: string;
    @Input() help?: string;
    @Input() errorHelp?: string;
    @Input() errorMessage?: string;
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }
    @Input()
    get readOnly(): boolean {
        return this._readOnly;
    }
    set readOnly(value: boolean) {
        this._readOnly = coerceBooleanProperty(value);
    }
    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
    }
    @Input()
    get labelHidden(): boolean {
        return this._labelHidden;
    }
    set labelHidden(value: boolean) {
        this._labelHidden = coerceBooleanProperty(value);
    }
    @Input()
    get lessen(): boolean {
        return this._lessen;
    }
    set lessen(value: boolean) {
        this._lessen = coerceBooleanProperty(value);
    }
    @Input()
    get isAccent(): boolean {
        return this._accent;
    }
    set isAccent(value: boolean) {
        this._accent = coerceBooleanProperty(value);
    }
    @Input()
    get selectablePlaceholder(): boolean {
        return this._selectablePlaceholder;
    }
    set selectablePlaceholder(value: boolean) {
        this._selectablePlaceholder = coerceBooleanProperty(value);
    }
    @Output() onSelection: EventEmitter<any> = new EventEmitter();
    @Output() valueChange: EventEmitter<any> = new EventEmitter();
    helpId = '';
    onChange?: Function;
    onTouched?: Function;
    hasNoSelection = true;
    isPlaceHolderSelected = false;
    hasError = false;
    _disabled = false;
    _readOnly = false;
    _required = false;
    _labelHidden = false;
    _lessen = false;
    _accent = false;
    _selectablePlaceholder = false;

    constructor(private element: ElementRef, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.id = !this.id ? `select-${nextId++}` : `${this.id}-select`;
        this.name = this.name || this.id;
        if (this.help) {
            this.helpId = `${this.id}-help`;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!!changes.value) {
            this.setProperValue(changes.value.currentValue);
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.setProperValue(this.value);
        }, 0);
    }

    setProperValue(value: string) {
        if (!!value) {
            this.element.nativeElement.querySelector('select').value = this.value;
            this.isPlaceHolderSelected = this.value === '__PLACEHOLDER__';
        } else if (!!this.placeholder) {
            this.element.nativeElement.querySelector('select').value = '__PLACEHOLDER__';
            this.isPlaceHolderSelected = true;
        } else {
            const firstOption = this.element.nativeElement.querySelector('option:first-child');
            const noOptionSelected = this.element.nativeElement.querySelectorAll('option:checked').length === 0;
            this.hasNoSelection = noOptionSelected && !!firstOption && !firstOption.innerText;
        }
        markForCheck(this.cdr);
    }

    writeValue(value: any) {
        this.value = value;
        if (this.element.nativeElement) {
            this.element.nativeElement.querySelector('select').value = this.value;
        }
        this.valueChange.emit(value);
    }

    registerOnTouched(handler: any) {
        this.onTouched = handler as Function;
    }

    registerOnChange(handler: any) {
        this.onChange = handler as Function;
    }

    change(value: any) {
        this.value = value;
        this.isPlaceHolderSelected = value === '__PLACEHOLDER__';
        this.valueChange.emit(value);
        this.onSelection.emit(value);
        if (this.onChange) {
            this.onChange(value);
        }
        if (this.onTouched) {
            this.onTouched(value);
        }
    }

    setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }

    validate(control: FormControl) {
        if (!this.required || this.value) {
            this.hasError = false;
            return null;
        } else {
            this.hasError = true;
            return { required: { valid: false } };
        }
    }
}
