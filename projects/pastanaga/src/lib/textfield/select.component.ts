import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

let nextId = 0;

@Component({
    selector: 'pa-select',
    templateUrl: 'select.component.html',
    styleUrls: ['textfield.scss', 'select.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectComponent),
        multi: true,
    }, {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => SelectComponent),
        multi: true,
    }],
})
export class SelectComponent implements ControlValueAccessor, OnInit, AfterViewInit, Validator {
    @Input() id: string;
    @Input() name: string;
    @Input() label: string;
    @Input() value: any;
    @Input() placeholder: string;
    @Input() help: string;
    @Input() errorHelp: string;
    @Input() errorMessage: string;
    @Input() disabled: boolean;
    @Input() required: boolean;
    @Input() isLabelHidden: boolean;
    @Output() onSelection: EventEmitter<any> = new EventEmitter();
    @Output() valueChange: EventEmitter<any> = new EventEmitter();
    helpId: string;
    onChange: Function;
    onTouched: Function;
    hasNoSelection: boolean;
    hasError = false;

    constructor(private element: ElementRef) {
    }

    ngOnInit() {
        this.id = !this.id ? `select-${nextId++}` : `${this.id}-select`;
        this.name = this.name || this.id;
        if (this.help) {
            this.helpId = `${this.id}-help`;
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.value) {
                this.element.nativeElement.querySelector('select').value = this.value;
            } else {
                this.hasNoSelection = this.element.nativeElement.querySelectorAll('option[selected]').length === 0;
            }
        }, 0);
    }

    writeValue(value: any) {
        this.value = value;
        if (this.element.nativeElement) {
            this.element.nativeElement.querySelector('select').value = this.value;
        }
        this.valueChange.emit(value);
    }

    registerOnTouched(handler: any) {
        this.onTouched = (handler as Function);
    }

    registerOnChange(handler: any) {
        this.onChange = (handler as Function);
    }

    change(value: any) {
        this.value = value;
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
            return {required: {valid: false}};
        }
    }
}
