import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

@Component({
    selector: 'pa-input',
    templateUrl: 'input.component.html',
    styleUrls: ['textfield.scss', 'input.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true,
    }],
})
export class InputComponent implements ControlValueAccessor, OnInit {
    @Input() id: string;
    @Input() name: string;
    @Input() type = 'text';
    @Input() value = '';
    @Input() errorHelp: string;
    @Input() placeholder: string;
    @Input() help: string;
    @Input() isRequired: boolean;
    @Input() pattern: RegExp;
    @Input() isDisabled: boolean;
    @Input() isReadOnly: boolean;
    @Input() isLabelHidden: boolean;
    @Output() valueChange: EventEmitter<any> = new EventEmitter();
    @Output() keyUp: EventEmitter<any> = new EventEmitter();
    helpId: string;
    onChange: any;
    onTouched: any;
    errors = {
        required: false,
        pattern: false,
    };

    ngOnInit() {
        if (!this.id) {
            this.id = `input-${nextId++}`;
        }
        this.name = this.name || this.id;
        if (this.help) {
            this.helpId = `${this.id}-help`;
        }
    }

    change(value: any) {
        this.validate(value);
        this.valueChange.emit(value);
        if (this.onChange) {
            this.onChange(value);
        }
        if (this.onTouched) {
            this.onTouched(value);
        }
    }

    onKeyUp(value) {
        this.validate(value);
        this.keyUp.emit(value);
    }

    validate(value) {
        if (this.isRequired) {
            this.errors.required = !value && value !== 0;
        }
        if (this.pattern) {
            this.errors.pattern = value && !this.pattern.test(value);
        }
    }

    writeValue(value: any) {
        this.value = value;
    }

    registerOnTouched(handler: any) {
        this.onTouched = handler;
    }

    registerOnChange(handler: any) {
        this.onChange = handler;
    }

    setDisabledState(isDisabled: boolean) {
        this.isDisabled = isDisabled;
    }
}
