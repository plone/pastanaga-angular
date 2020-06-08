import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, ElementRef,
    forwardRef,
    Input, NgZone,
    OnDestroy,
    OnInit, Optional, ViewChild,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormGroupDirective,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    NgForm,
    Validator
} from '@angular/forms';
import { BaseTextField } from '../base-text-field';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { takeUntil } from 'rxjs/operators';
import { detectChanges } from '../../common';

const HTML_TAG = new RegExp(/.?<.+>/g);
const REPLACE_LT_GT = new RegExp(/[<>]/g);

@Component({
    selector: 'pa-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends BaseTextField implements AfterViewInit, ControlValueAccessor, OnInit, OnDestroy, Validator {
    @Input() type: 'text' | 'number' = 'text';
    @Input() min?: number;
    @Input() max?: number;
    @Input() maxlength?: number;
    @Input()
    get acceptHtmlTags(): boolean { return this._acceptHtmlTags; }
    set acceptHtmlTags(value: boolean) { this._acceptHtmlTags = coerceBooleanProperty(value); }
    @Input()
    get hasFocus(): boolean { return this._hasFocus; }
    set hasFocus(value: boolean) { this._hasFocus = coerceBooleanProperty(value); }
    @Input()
    get noAutoComplete(): boolean { return this._noAutoComplete; }
    set noAutoComplete(value: boolean) { this._noAutoComplete = coerceBooleanProperty(value); }

    @ViewChild('inputElement', { static: true }) input?: ElementRef;

    _fieldType = 'input';
    _hasFocus = false;
    _noAutoComplete = false;
    _autofilled = false;
    _acceptHtmlTags = false;

    constructor(
        @Optional() public _parentForm: NgForm,
        @Optional() public _parentFormGroup: FormGroupDirective,
        protected platform: Platform,
        protected ngZone: NgZone,
        protected cdr: ChangeDetectorRef,
        private autofillMonitor: AutofillMonitor,
    ) {
        super(cdr);
        this.valueChange.pipe(takeUntil(this.terminator)).subscribe(() => detectChanges(this.cdr));
    }


    ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterViewInit(): void {
        if (this.platform.isBrowser && !!this.input) {
            this.autofillMonitor
                .monitor(this.input.nativeElement)
                .subscribe(event => this._autofilled = event.isAutofilled);
        }
        if (this.platform.IOS && !!this.input) {
            const input = this.input;
            this.ngZone.runOutsideAngular(() => {
                input.nativeElement.addEventListener(
                    'keyup',
                    (event: Event) => {
                        const element = event.target as HTMLInputElement;
                        if (
                            !element.value &&
                            !element.selectionStart &&
                            !element.selectionEnd
                        ) {
                            // Note: Just setting `0, 0` doesn't fix the issue. Setting
                            // `1, 1` fixes it for the first time that you type text and
                            // then hold delete. Toggling to `1, 1` and then back to
                            // `0, 0` seems to completely fix it.
                            element.setSelectionRange(1, 1);
                            element.setSelectionRange(0, 0);
                        }
                    },
                );
            });
        }
        if (this._hasFocus && !!this.input) {
            this.input.nativeElement.focus();
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.platform.isBrowser && !!this.input) {
            this.autofillMonitor.stopMonitoring(this.input.nativeElement);
        }
    }

    _validate(value: string | number) {
        super._validate(value);

        if ((!!value || typeof value === 'number') && this.type === 'number') {
            const numVal = typeof value === 'number' ? value : parseFloat(value);
            if (typeof this.min === 'number') {
                this._errors.min = numVal < this.min;
            }
            if (typeof this.max === 'number') {
                this._errors.max = numVal > this.max;
            }
        }
    }

    writeValue(value: string | number | undefined) {
        if (!!value && typeof(value) === 'string' && !this._acceptHtmlTags && value.match(HTML_TAG)) {
            value = value.replace(REPLACE_LT_GT, '');
        }

        super.writeValue(value);
    }
}
