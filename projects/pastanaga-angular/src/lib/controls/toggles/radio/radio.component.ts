import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { markForCheck } from '../../../common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

let nextId = 0;

@Component({
    selector: 'pa-radio',
    templateUrl: './radio.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent implements AfterContentInit {
    private _uniqueId = `pa-radio-${nextId++}`;
    private _disabled = false;
    private _name = '';
    private _value = '';

    @ViewChild('label', { read: ElementRef, static: true }) label?: ElementRef;

    @Input() id: string = this._uniqueId;

    @Input()
    set name(value: string) {
        this._name = value;
    }
    get name() {
        return this._name;
    }

    @Input()
    set value(value: string) {
        this._value = value;
    }
    get value() {
        return this._value;
    }

    @Input()
    set disabled(value: any) {
        this._disabled = coerceBooleanProperty(value);
    }
    get disabled() {
        return this._disabled;
    }

    @Input() ariaLabel?: string;

    @Output() change: EventEmitter<{ value: string }> = new EventEmitter();

    checked = false;
    hasLabel = false;
    _ariaLabel = '';

    constructor(private element: ElementRef, private cdr: ChangeDetectorRef) {}

    ngAfterContentInit() {
        this.hasLabel = this.label?.nativeElement.innerHTML.length > 0;
        this._ariaLabel = this.hasLabel ? this.label?.nativeElement.innerHTML : this.ariaLabel || this.value;
    }

    /**
     * Marks the radio button as needing checking for change detection.
     * This method is exposed because the parent radio group will directly
     * update bound properties of the radio button.
     */
    _markForCheck() {
        markForCheck(this.cdr);
    }

    _onInputChange() {
        if (!this.disabled) {
            if (!this.checked) {
                this.checked = true;
            }
            this.change.emit({ value: this.value });
        }
    }

    /**
     * Select this radio from the radio-group, allowing to set the value coming from a form.
     */
    select() {
        this.element.nativeElement.querySelector('.pa-toggle-control').checked = true;
        this._onInputChange();
    }
}