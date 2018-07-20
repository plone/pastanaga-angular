import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { Selectable } from '../common/selectable.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

@Component({
    selector: 'pa-select',
    templateUrl: 'select.component.html',
    styleUrls: ['textfield.scss', 'select.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectComponent),
        multi: true,
    }],
})
export class SelectComponent implements ControlValueAccessor, OnInit {
    @Input() id: string;
    @Input() name: string;
    @Input() value: any;
    @Input() options: Selectable[];
    @Input() placeholder: string;
    @Input() help: string;
    @Input() isDisabled: boolean;
    @Input() isLabelHidden: boolean;
    @Output() selection: EventEmitter<any> = new EventEmitter();
    @Output() valueChange: EventEmitter<any> = new EventEmitter();
    helpId: string;
    onChange: any;
    onTouched: any;

    ngOnInit() {
        if (!this.id) {
            this.id = `select-${nextId++}`;
        }
        this.name = this.name || this.id;
        if (this.help) {
            this.helpId = `${this.id}-help`;
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

    change(value: any) {
        this.valueChange.emit(value);
        this.selection.emit(value);
        if (this.onChange) {
            this.onChange(value);
        }
        if (this.onTouched) {
            this.onTouched(value);
        }
    }

    setDisabledState(isDisabled: boolean) {
        this.isDisabled = isDisabled;
    }
}
