import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Optional,
    Output,
    Renderer2,
    Self,
    ViewChild,
} from '@angular/core';
import { PaFormControlDirective } from '../form-field/pa-form-control.directive';
import { NgControl, ValidatorFn, Validators } from '@angular/forms';
import { TextFieldUtilityService } from './text-field-utility.service';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { isVisibleInViewport, Keys, markForCheck } from '../../common';
import { IErrorMessages } from '../form-field.model';
import { sanitizeStringValue } from '../form-field.utils';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[paNativeTextField]',
})
export class NativeTextFieldDirective extends PaFormControlDirective implements AfterViewInit, OnDestroy {
    @Input() set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
        this._toggleValidator('required', this._required ? Validators.required : undefined);
    }

    get required() {
        return this._required || false;
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

    @Input() help?: string;
    @Input() errorMessages?: IErrorMessages;
    @Input() showAllErrors = true;
    @Input() placeholder?: string;

    @Input() set hasFocus(value: boolean) {
        this._hasFocus = coerceBooleanProperty(value);
        this._focusInput();
    }
    @Input() set acceptHtmlTags(value: boolean) {
        const accept = coerceBooleanProperty(value);
        if (!!this.sanitizeHtmlTags && accept) {
            this.sanitizeHtmlTags = undefined;
        } else if (!this.sanitizeHtmlTags && !accept) {
            this.sanitizeHtmlTags = sanitizeStringValue;
        }
    }

    @ViewChild('htmlInput') htmlInputRef?: ElementRef;

    @Output() keyUp: EventEmitter<any> = new EventEmitter();
    @Output() enter: EventEmitter<{ event: KeyboardEvent; value: any }> = new EventEmitter();
    @Output() focusing: EventEmitter<FocusEvent> = new EventEmitter();
    @Output() blurring: EventEmitter<string | number> = new EventEmitter();

    isFilled = false;
    describedById?: string;
    sanitizeHtmlTags?: (val: any) => any = sanitizeStringValue;

    private _required?: boolean;
    private _maxlength?: number;
    private _noAutoComplete = false;
    private _stopAutoCompleteMonitor = new Subject();
    private _hasFocus = false;

    constructor(
        protected element: ElementRef,
        @Optional() @Self() protected parentControl: NgControl,
        protected cdr: ChangeDetectorRef,
        protected textFieldUtility: TextFieldUtilityService,
        protected renderer: Renderer2
    ) {
        super(element, parentControl, cdr);
    }

    ngAfterViewInit() {
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
        super.ngOnDestroy();
    }

    onFocus(event: any) {
        this.onTouched();

        if (this.isActive) {
            this.focusing.emit(event);
        }
    }

    onBlur() {
        this.blurring.emit(this.control.value);
        this._checkIsFilled();
    }

    onKeyUp(event: any) {
        if (this.isActive && event.key !== Keys.tab && !!event.target) {
            this.keyUp.emit(this.control.value);

            if (event.key === Keys.enter) {
                this.enter.emit({ event, value: this.control.value });
            }
        }
    }

    protected _toggleValidator(key: string, validator?: ValidatorFn) {
        if (validator) {
            this.internalValidatorsMap.set(key, validator);
        } else {
            this.internalValidatorsMap.delete(key);
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

    protected _checkIsFilled() {
        // NB: depending on updateOn formHook, the input can be filled but the formControlValue not updated yet
        this.isFilled = this.htmlInputRef?.nativeElement.value === 0 || this.htmlInputRef?.nativeElement.value.length;
    }

    protected _checkDescribedBy() {
        if ((!this.describedById && this.help) || this.control.errors) {
            this.describedById = `${this.id}-hint`;
        } else if (!this.help && this.control.errors === null) {
            this.describedById = undefined;
            markForCheck(this.cdr);
        }
    }

    private _focusInput() {
        if (this._hasFocus && !!this.htmlInputRef && this.isActive) {
            this.htmlInputRef.nativeElement.focus();
            if (!isVisibleInViewport(this.htmlInputRef.nativeElement)) {
                this.htmlInputRef.nativeElement.scrollIntoView();
            }
        }
    }
}
