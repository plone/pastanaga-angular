import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { DeprecatedBaseControl } from '../../deprecated-base-control.directive';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { detectChanges, markForCheck } from '../../../common';

@Component({
    selector: 'pa-deprecated-toggle',
    templateUrl: './deprecated-toggle.component.html',
    styleUrls: ['./deprecated-toggle.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DeprecatedToggleComponent),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeprecatedToggleComponent extends DeprecatedBaseControl
    implements OnChanges, OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
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

    onChange: (change?: any) => void = () => {};
    onTouched: () => void = () => {};

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
        if (changes.help && !this._hasLabel) {
            this.updateLabelDisplay();
        }
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterViewInit() {
        if (this._hasFocus && !!this.input) {
            this.input.nativeElement.focus();
        }
        if (!!this.label) {
            this._label = this.label.nativeElement.textContent.trim();
            // avoid expressionChanged after it was checked since _hasLabel is true by default
            setTimeout(() => {
                this.updateLabelDisplay();
            });
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    updateLabelDisplay() {
        this._hasLabel = this._label.length > 0 || this._help.length > 0;
        markForCheck(this.cdr);
    }

    updateState(event: any) {
        if (!this._disabled && event !== this._checked ) {
            this._checked= !this._checked;
            this.onChange(this._checked);
            this.onTouched();
        }
    }

    onFocus() {
        this.hasFocus = true;
    }

    onBlur() {
        this._hasFocus = false;
    }

    registerOnChange(handler: any): void {
        this.onChange = handler;
    }

    registerOnTouched(handler: any): void {
        this.onTouched = handler;
    }

    setDisabledState(isDisabled: boolean): void {
        this._disabled = isDisabled;
        detectChanges(this.cdr);
    }

    writeValue(obj: any) {
        this._checked = coerceBooleanProperty(obj);
        detectChanges(this.cdr);
    }
}
