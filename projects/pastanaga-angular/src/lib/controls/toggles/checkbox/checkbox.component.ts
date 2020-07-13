import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { BaseControl } from '../../base-control';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { detectChanges } from '../../../common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'pa-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends BaseControl implements OnInit, OnDestroy, ControlValueAccessor {
    @Input()
    get type(): 'checkbox' | 'radio' {
        return this._type;
    }
    set type(value: 'checkbox' | 'radio') {
        if (!!value) {
            this._type = value;
        }
    }
    @Input()
    get selected(): boolean {
        return this._selected;
    }
    set selected(value: boolean) {
        this._selected = coerceBooleanProperty(value);
    }

    @Output() selectedChange: EventEmitter<boolean> = new EventEmitter();

    _fieldType = 'checkbox';
    _type: 'checkbox' | 'radio' = 'checkbox';
    _selected = false;

    onChange: Function = () => {};
    onTouched: Function = () => {};

    constructor(protected cdr: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    toggleCheckbox() {
        // radio can't be unchecked by clicking on itself
        if (this._type === 'checkbox' || !this._selected) {
            this._selected = !this._selected;
        }
        this.onChange(this._selected);
        this.onTouched();
        this.selectedChange.emit(this._selected);
    }

    registerOnChange(handler: any): void {
        this.onChange = handler as Function;
    }

    registerOnTouched(handler: any): void {
        this.onTouched = handler as Function;
    }

    setDisabledState(isDisabled: boolean): void {
        this._disabled = isDisabled;
        detectChanges(this.cdr);
    }

    writeValue(obj: any) {
        this._selected = coerceBooleanProperty(obj);
        detectChanges(this.cdr);
    }
}
