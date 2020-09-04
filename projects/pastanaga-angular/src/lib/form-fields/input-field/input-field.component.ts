import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    ElementRef,
    Self,
    Optional,
    AfterViewInit,
    NgZone,
    ChangeDetectorRef,
    Output,
    EventEmitter,
    OnDestroy,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { NgControl, ValidatorFn, Validators } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { detectChanges, Keys, markForCheck } from '../../common';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FormFieldBase } from '../form-field-base';

const HTML_TAG = new RegExp(/.?<.+>/g);
const REPLACE_LT_GT = new RegExp(/[<>]/g);

/**
 * Due to standalone usage specifications, the local state of the component
 * is split into two synchronized references:
 * - the model (ngModel) responsible of the value hold by the component and used in the template
 * - the control (formControl) responsible for validation and state management
 * both references must be kept in sync
 */
@Component({
    selector: 'pa-input-field',
    templateUrl: './input-field.component.html',
    styleUrls: ['./input-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent extends FormFieldBase implements OnChanges, OnInit, AfterViewInit, OnDestroy {
    @Input() set type(value: 'text' | 'number' | 'password' | 'email') {
        this._fieldType = value;
        // When using Angular inputs, developers are no longer able to set the properties on the native
        // input element. To ensure that bindings for `type` work, we need to sync the setter
        // with the native property.
        if (!!this.htmlElement) {
            this.htmlElement.type = value;
        }
    }

    get type() {
        return this._fieldType;
    }

    @Input() placeholder = '';
    @Input() required?: boolean;
    @Input() pattern?: RegExp | string;
    @Input() min?: number;
    @Input() max?: number;
    @Input() maxlength?: number;

    @Input() set noAutoComplete(value: boolean) {
        this._noAutoComplete = coerceBooleanProperty(value);
    }

    get noAutoComplete(): boolean {
        return this._noAutoComplete;
    }

    @Input()
    get acceptHtmlTags(): boolean {
        return this._acceptHtmlTags;
    }

    set acceptHtmlTags(value: boolean) {
        this._acceptHtmlTags = coerceBooleanProperty(value);
    }

    @Input() set debounceDuration(value: number | undefined) {
        if (value !== this._debouncedTime) {
            this._debouncedTime = value !== undefined ? value : 500;
            this.debounceTimeChanged.next();
            this.initDebounce();
        }
    }

    @ViewChild('htmlInput') htmlInputRef?: ElementRef;
    @ViewChild('label') labelRef?: ElementRef;

    @Output() valueChange: EventEmitter<string | number> = new EventEmitter();
    @Output() debouncedValueChange: EventEmitter<string | number> = new EventEmitter();
    @Output() keyUp: EventEmitter<any> = new EventEmitter();
    @Output() enter: EventEmitter<{ event: KeyboardEvent; value: any }> = new EventEmitter();
    @Output() focusing: EventEmitter<FocusEvent> = new EventEmitter();
    @Output() blurring: EventEmitter<string | number> = new EventEmitter();

    _label = '';
    _fieldType: 'text' | 'number' | 'password' | 'email' = 'text';
    _noAutoComplete = false;
    _autofilled = false;
    _acceptHtmlTags = false;
    _debouncedTime = 500;
    debounceTimeChanged: Subject<void> = new Subject();
    debouncedChange: Observable<any> = new Subject();
    _hasDebounce = false;

    requiredValidator?: ValidatorFn;
    patternValidator?: ValidatorFn;
    minValidator?: ValidatorFn;
    maxValidator?: ValidatorFn;
    maxlengthValidator?: ValidatorFn;

    constructor(
        @Optional() @Self() public parentControl: NgControl,
        private platform: Platform,
        private ngZone: NgZone,
        public cdr: ChangeDetectorRef,
        private autofillMonitor: AutofillMonitor
    ) {
        super(parentControl, cdr);
        this._fieldKind = 'input';
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.shouldUpdateValidators(changes)) {
            this.refreshInternalValidators();
        }
        super.ngOnChanges(changes);
    }

    ngOnInit(): void {
        super.ngOnInit();
        if (!this._hasDebounce) {
            this.initDebounce();
        }
    }

    ngAfterViewInit(): void {
        if (!!this.htmlInputRef) {
            this.htmlElement = this.htmlInputRef.nativeElement;
        }

        this.handleBrowserAutoFill();
        this.handleIosCaretPosition();

        if (!!this.labelRef) {
            this._label = this.labelRef.nativeElement.textContent.trim();
        }

        this.focus();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.debounceTimeChanged.complete();
    }

    onFocus(event: any) {
        if (this.isActive()) {
            this.focusing.emit(event);
        }
    }

    onBlur() {
        super.onBlur();
        this.blurring.emit(this.model);
    }

    onKeyUp(event: any) {
        if (this.isActive() && event.key !== Keys.tab && !!event.target) {
            this.keyUp.emit(this.model);
            if (event.key === Keys.enter) {
                if (this._updateOn === 'submit') {
                    this.onValueChange(this.htmlElement.value);
                }
                this.enter.emit({ event, value: this.model });
            }
        }
    }

    preValueChange = (value?: any) => {
        return this.sanitizeStringValue(value);
    };

    postValueChange = () => {
        this.valueChange.emit(this.model);
        // depending on updateOn value, internal FormControl's valueChange may not be triggered
        // internally, therefore, debouncedValueChange must be triggered manually.
        if (this._updateOn !== 'change') {
            this.notifyDebouncedChange(this.model);
        }
    };

    // prevent debouncedValueChange from being triggered when changes come from parent
    preWriteValue = (value?: any) => {
        this.debounceTimeChanged.next();
        return this.sanitizeStringValue(value);
    };

    postWriteValue = () => {
        if (this._hasDebounce) {
            this.initDebounce();
        }
        detectChanges(this.cdr);
    };

    listInternalValidators = (): ValidatorFn[] => {
        const validators = [];

        if (!!this.requiredValidator) {
            validators.push(this.requiredValidator);
        }
        if (!!this.patternValidator) {
            validators.push(this.patternValidator);
        }
        if (!!this.minValidator) {
            validators.push(this.minValidator);
        }
        if (!!this.maxValidator) {
            validators.push(this.maxValidator);
        }
        if (!!this.maxlengthValidator) {
            validators.push(this.maxlengthValidator);
        }

        if (!!this._parentValidator) {
            validators.push(this._parentValidator);
        }
        return validators;
    };

    refreshInternalValidators() {
        this.requiredValidator = !!this.required ? Validators.required : undefined;
        this.patternValidator = !!this.pattern ? Validators.pattern(this.pattern) : undefined;
        this.minValidator = !!this.min ? Validators.min(this.min) : undefined;
        this.maxValidator = !!this.max ? Validators.max(this.max) : undefined;
        this.maxlengthValidator = !!this.maxlength ? Validators.maxLength(this.maxlength) : undefined;
    }

    registerOnValueChange = (value: any) => {
        this.model = this.sanitizeStringValue(value);
        if (this.control.value !== this.model) {
            this.control.setValue(this.model);
        }
        markForCheck(this.cdr);
    };

    registerOnStatusChanges = (status: any) => {
        markForCheck(this.cdr);
    };

    shouldUpdateValidators = (changes: SimpleChanges): boolean => {
        return (
            !!changes.required ||
            !!changes.min ||
            !!changes.max ||
            !!changes.maxlength ||
            !!changes.pattern ||
            !!changes.errorMessage
        );
    };

    initDebounce() {
        // initDebounce is called 'while' control's value is changing
        // wait for inner state to be stable before subscribing to changes
        setTimeout(() => {
            this.control.valueChanges
                .pipe(
                    debounceTime(this._debouncedTime),
                    distinctUntilChanged(),
                    takeUntil(merge(this.debounceTimeChanged, this.terminator))
                )
                .subscribe((value) => {
                    this.debouncedValueChange.emit(value);
                });
        });
        this._hasDebounce = true;
    }

    private notifyDebouncedChange(val: any) {
        setTimeout(() => {
            this.debouncedValueChange.emit(val);
        }, this._debouncedTime);
    }

    private sanitizeStringValue(value: any) {
        if (!!value && typeof value === 'string' && !this._acceptHtmlTags && value.match(HTML_TAG)) {
            return value.replace(REPLACE_LT_GT, '');
        }
        return value;
    }

    private handleBrowserAutoFill() {
        if (this.platform.isBrowser && !!this.htmlElement) {
            this.autofillMonitor.monitor(this.htmlElement).subscribe((event) => {
                this._autofilled = event.isAutofilled;
                // get html value and apply valueChange
                const val = this.htmlElement.value;
                if (val && this._autofilled && !this._noAutoComplete) {
                    this.control.markAsDirty();
                    this.onValueChange(val);
                }
            });
        }
    }

    private handleIosCaretPosition() {
        if (this.platform.IOS && !!this.htmlInputRef) {
            const input = this.htmlInputRef;
            this.ngZone.runOutsideAngular(() => {
                input.nativeElement.addEventListener('keyup', (event: Event) => {
                    const element = event.target as HTMLInputElement;
                    if (!element.value && !element.selectionStart && !element.selectionEnd) {
                        // Note: Just setting `0, 0` doesn't fix the issue. Setting
                        // `1, 1` fixes it for the first time that you type text and
                        // then hold delete. Toggling to `1, 1` and then back to
                        // `0, 0` seems to completely fix it.
                        element.setSelectionRange(1, 1);
                        element.setSelectionRange(0, 0);
                    }
                });
            });
        }
    }
}
