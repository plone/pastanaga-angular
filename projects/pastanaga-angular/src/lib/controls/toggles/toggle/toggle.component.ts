import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Input, OnChanges,
    OnDestroy,
    OnInit, SimpleChanges,
    ViewChild
} from '@angular/core';
import { BaseControl } from '../../base-control';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { detectChanges, markForCheck } from '../../../common';

@Component({
    selector: 'pa-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ToggleComponent),
            multi: true,
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent extends BaseControl implements OnChanges, OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {

    @Input()
    get hasFocus(): boolean {
        return this._hasFocus;
    }

    set hasFocus(value: boolean) {
        this._hasFocus = coerceBooleanProperty(value);
    }

    @ViewChild('inputElement') input?: ElementRef;
    @ViewChild('label') label?: ElementRef;

    _checked = true;
    _hasFocus = false;
    // wait until <ng-content> rendering to set this to false
    _hasLabel = true;

    onChange: Function = () => {};
    onTouched: Function = () => {};

    constructor(private cdr: ChangeDetectorRef) {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasFocus && !!this.input) {
            if (changes.hasFocus.currentValue) {
                this.input.nativeElement.focus();
            } else {
                this.input.nativeElement.blur();
            }
        }
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterViewInit() {
        if(this._hasFocus && !!this.input) {
            this.input.nativeElement.focus();
        }
        if (!!this.label) {
            const textLabel = this.label.nativeElement.textContent.trim();
            this._hasLabel = textLabel.length;
            this._label = this.label.nativeElement.textContent.trim();
            markForCheck(this.cdr);
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    updateState() {
        if (!this._disabled) {
            const nextState = !this._checked;
            this.onChange(nextState);
            this.onTouched(nextState);
            this.writeValue(nextState);
        }
    }

    onFocus() {
        this.hasFocus = true;
    }

    onBlur() {
        this._hasFocus = false;
    }

    registerOnChange(handler: any): void {
        this.onChange = (handler as Function);
    }

    registerOnTouched(handler: any): void {
        this.onTouched = (handler as Function);
    }

    setDisabledState(isDisabled: boolean): void {
        this._disabled = isDisabled;
        detectChanges(this.cdr);
    }

    writeValue(obj: any) {
        this._checked = coerceBooleanProperty(obj);
    }

}
