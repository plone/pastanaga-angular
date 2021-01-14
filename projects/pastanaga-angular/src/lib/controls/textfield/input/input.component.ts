import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Renderer2,
    Self,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { NgControl, ValidatorFn, Validators } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Keys, markForCheck } from '../../../common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IErrorMessages, TextInputType } from '../../form-field.model';
import { sanitizeStringValue } from '../../form-field.utils';
import { PaFormControlDirective } from '../../form-field/pa-form-control.directive';
import { TextFieldUtilityService } from '../text-field-utility.service';

@Component({
    selector: 'pa-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends PaFormControlDirective implements OnChanges, OnInit, AfterViewInit, OnDestroy {
    @Input() set type(value: TextInputType) {
        this._type = value || 'text';
        this._updateInputType();
    }

    get type() {
        return this._type;
    }

    @Input() set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
        this._toggleValidator('required', this._required ? Validators.required : undefined);
    }

    get required() {
        return this._required || false;
    }

    @Input() set pattern(value: RegExp | string | undefined) {
        this._toggleValidator('pattern', value ? Validators.pattern(value) : undefined);
    }

    @Input() set min(value: number | undefined) {
        this._toggleValidator('min', value || value === 0 ? Validators.min(value) : undefined);
    }

    @Input() set max(value: number | undefined) {
        this._toggleValidator('max', value || value === 0 ? Validators.max(value) : undefined);
    }

    @Input() set maxlength(value: number | undefined) {
        this._maxlength = value;
        this._toggleValidator('maxlength', value ? Validators.maxLength(value) : undefined);
    }

    get maxlength() {
        return this._maxlength;
    }

    @Input() set noAutoComplete(value: boolean) {
        const preventAutoComplete = coerceBooleanProperty(value);
        if (preventAutoComplete !== this._noAutoComplete) {
            this._noAutoComplete = preventAutoComplete;
            this._updateAutoComplete();
        }
    }

    get noAutoComplete(): boolean {
        return this._noAutoComplete;
    }

    @Input() set acceptHtmlTags(value: boolean) {
        const accept = coerceBooleanProperty(value);
        if (!!this.sanitizeHtmlTags && accept) {
            this.sanitizeHtmlTags = undefined;
        } else if (!this.sanitizeHtmlTags && !accept) {
            this.sanitizeHtmlTags = sanitizeStringValue;
        }
    }

    @Input() set hasFocus(value: boolean) {
        this._hasFocus = coerceBooleanProperty(value);
        this._focusInput();
    }

    @Input() help?: string;
    @Input() errorMessages?: IErrorMessages;
    @Input() showAllErrors = true;
    @Input() autocapitalize?: string;
    @Input() placeholder?: string;

    @ViewChild('htmlInput') htmlInputRef?: ElementRef;

    @Output() keyUp: EventEmitter<any> = new EventEmitter();
    @Output() enter: EventEmitter<{ event: KeyboardEvent; value: any }> = new EventEmitter();
    @Output() focusing: EventEmitter<FocusEvent> = new EventEmitter();
    @Output() blurring: EventEmitter<string | number> = new EventEmitter();

    sanitizeHtmlTags?: (val: any) => any = sanitizeStringValue;
    describedById?: string;
    fieldType = 'input';
    isFilled = false;

    private _type: TextInputType = 'text';
    private _noAutoComplete = false;
    private _required?: boolean;
    private _stopAutoCompleteMonitor = new Subject();
    private _hasFocus = false;
    private _maxlength?: number;
    private _wasNumber = false;

    constructor(
        protected element: ElementRef,
        @Optional() @Self() protected parentControl: NgControl,
        protected cdr: ChangeDetectorRef,
        private textFieldUtility: TextFieldUtilityService,
        private renderer: Renderer2
    ) {
        super(element, parentControl, cdr);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (
            !!changes.required ||
            !!changes.min ||
            !!changes.max ||
            !!changes.maxlength ||
            !!changes.pattern ||
            !!changes.errorMessage
        ) {
            this.validatorChanged$.next();
        }
        super.ngOnChanges(changes);
        this._checkIsFilled();
        this._checkDescribedBy();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterViewInit(): void {
        this._updateInputType();
        if (!!this.htmlInputRef) {
            this._updateAutoComplete();
            this.textFieldUtility.handleIosCaretPosition(this.htmlInputRef.nativeElement);
            this._checkIsFilled();
        }

        this.control.valueChanges.pipe(takeUntil(this.terminator$)).subscribe(() => {
            this._checkIsFilled();
            markForCheck(this.cdr);
        });
        this.control.statusChanges.pipe(takeUntil(this.terminator$)).subscribe(() => {
            this._checkDescribedBy();
            markForCheck(this.cdr);
        });
        this.setDisabledState(this.control.disabled);
        this._focusInput();
    }

    ngOnDestroy() {
        this._stopAutoCompleteMonitor.next();
        this._stopAutoCompleteMonitor.complete();
        this._unTrackNumberInputClick();
        super.ngOnDestroy();
    }

    onFocus(event: any) {
        this.onTouched();

        if (this.isActive) {
            this.focusing.emit(event);
        }
    }

    onKeyUp(event: any) {
        if (this.isActive && event.key !== Keys.tab && !!event.target) {
            this.keyUp.emit(this.control.value);

            if (event.key === Keys.enter) {
                this.enter.emit({ event, value: this.control.value });
            }
        }
    }

    onBlur() {
        this.blurring.emit(this.control.value);
        this._checkIsFilled();
    }

    setDisabledState(isDisabled: boolean): void {
        super.setDisabledState(isDisabled);
        if (this.htmlInputRef) {
            this.renderer.setProperty(this.htmlInputRef?.nativeElement, 'disabled', isDisabled);
        }
    }

    private _toggleValidator(key: string, validator?: ValidatorFn) {
        if (validator) {
            this.internalValidatorsMap.set(key, validator);
        } else {
            this.internalValidatorsMap.delete(key);
        }
    }

    private _checkIsFilled() {
        // NB: depending on updateOn formHook, the input can be filled but the formControlValue not updated yet
        this.isFilled = this.htmlInputRef?.nativeElement.value === 0 || this.htmlInputRef?.nativeElement.value.length;
    }

    private _checkDescribedBy() {
        if ((!this.describedById && this.help) || this.control.errors) {
            this.describedById = `${this.id}-hint`;
            // markForCheck(this.cdr);
        } else if (!this.help && this.control.errors === null) {
            this.describedById = undefined;
            markForCheck(this.cdr);
        }
    }

    private _updateAutoComplete() {
        if (!this._noAutoComplete) {
            this.textFieldUtility.handleBrowserAutoFill(
                this.htmlInputRef?.nativeElement,
                this.control,
                this._stopAutoCompleteMonitor
            );
        } else {
            this._stopAutoCompleteMonitor.next();
        }
    }

    private _focusInput() {
        if (this._hasFocus && !!this.htmlInputRef && this.isActive) {
            this.htmlInputRef.nativeElement.focus();
        }
    }

    private _updateInputType() {
        // When using Angular inputs, developers are no longer able to set the properties on the native
        // input element. To ensure that bindings for `type` work, we need to sync the setter
        // with the native property.
        if (!!this.htmlInputRef) {
            this.htmlInputRef.nativeElement.type = this._type;
        }
        this._checkNumberInputEvent();
    }

    private _checkNumberInputEvent() {
        if (!!this.htmlInputRef && this._type === 'number') {
            this._wasNumber = true;
            this.htmlInputRef.nativeElement.addEventListener('mouseup', this._numberInputClicked);
        } else {
            this._unTrackNumberInputClick();
        }
    }

    private _numberInputClicked = () => {
        if (this.control.untouched) {
            this.control.markAsTouched();
        }
        if (this.control.pristine) {
            this.control.markAsDirty();
        }
        if (this.htmlInputRef?.nativeElement.value !== this.control.value) {
            const val = Number(this.htmlInputRef?.nativeElement.value);
            this.control.patchValue(isNaN(val) ? null : val);
        }
    };

    private _unTrackNumberInputClick() {
        if (!!this.htmlInputRef && this._wasNumber) {
            this.htmlInputRef.nativeElement.removeEventListener('mouseup', this._numberInputClicked);
        }
    }
}
