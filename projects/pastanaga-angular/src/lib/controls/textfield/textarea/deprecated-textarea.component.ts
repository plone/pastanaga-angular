import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormGroupDirective,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    NgForm,
    Validator,
} from '@angular/forms';
import { DeprecatedBaseTextField } from '../deprecated-base-text-field.directive';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { takeUntil } from 'rxjs/operators';
import { detectChanges } from '../../../common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';

@Component({
    selector: 'pa-deprecated-textarea',
    templateUrl: './deprecated-textarea.component.html',
    styleUrls: ['./deprecated-textarea.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DeprecatedTextareaComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DeprecatedTextareaComponent),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeprecatedTextareaComponent extends DeprecatedBaseTextField
    implements AfterViewInit, ControlValueAccessor, OnInit, OnDestroy, Validator {
    @Input() maxlength?: number;

    @Input()
    get acceptHtmlTags(): boolean {
        return this._acceptHtmlTags;
    }

    set acceptHtmlTags(value: boolean) {
        this._acceptHtmlTags = coerceBooleanProperty(value);
    }

    @Input()
    get autoHeight(): boolean {
        return this._autoHeight;
    }

    set autoHeight(value: boolean) {
        this._autoHeight = coerceBooleanProperty(value);
        if (this._autoHeight) {
            this.setupAutoResizing();
        } else {
            this.terminateAutoResizing();
        }
    }

    @Input()
    get hasFocus(): boolean {
        return this._hasFocus;
    }

    set hasFocus(value: boolean) {
        this._hasFocus = coerceBooleanProperty(value);
        if (this._hasFocus) {
            this.handleFocus();
        }
    }

    @Input()
    get noAutoComplete(): boolean {
        return this._noAutoComplete;
    }

    set noAutoComplete(value: boolean) {
        this._noAutoComplete = coerceBooleanProperty(value);
    }

    @Input()
    get resizable(): boolean {
        return this._resizable;
    }

    set resizable(value: boolean) {
        this._resizable = coerceBooleanProperty(value);
    }

    @Input()
    set rows(value: number) {
        this._rows = value;
        this._defaultRows = value;
    }

    @ViewChild('textareaElement', { static: true }) textarea?: ElementRef;

    _acceptHtmlTags = false;
    _autofilled = false;
    _autoHeight = false;
    _charWidth = 0;
    _hasFocus = false;
    _noAutoComplete = false;
    _resizable = true;
    _rows = 1;
    _defaultRows = 1;

    resizeTrigger: Subject<string | number> | undefined;

    constructor(
        @Optional() public _parentForm: NgForm,
        @Optional() public _parentFormGroup: FormGroupDirective,
        protected platform: Platform,
        protected ngZone: NgZone,
        protected cdr: ChangeDetectorRef,
        private autofillMonitor: AutofillMonitor,
        public element: ElementRef
    ) {
        super(cdr, element);
        this.valueChange.pipe(takeUntil(this.terminator)).subscribe(() => detectChanges(this.cdr));
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterViewInit(): void {
        if (this.platform.isBrowser && !!this.textarea) {
            this.autofillMonitor
                .monitor(this.textarea.nativeElement)
                .subscribe((event) => (this._autofilled = event.isAutofilled));
        }
        if (this.platform.IOS && !!this.textarea) {
            const input = this.textarea;
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
        this.handleFocus();
        this.initTextSizing();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.platform.isBrowser && !!this.textarea) {
            this.autofillMonitor.stopMonitoring(this.textarea.nativeElement);
        }
    }

    _validate(value: string | number) {
        super._validate(value);
    }

    writeValue(value: string | number | undefined) {
        if (!!value && typeof value === 'string' && !this._acceptHtmlTags && value.match(this.HTML_TAG)) {
            value = value.replace(this.REPLACE_LT_GT, '');
        }

        super.writeValue(value);
    }

    private autoResize(text: string | number | undefined) {
        if (!!this.textarea && typeof text === 'string' && this._charWidth > 0) {
            const elementWidth = this.textarea.nativeElement.getBoundingClientRect()['width'];
            const charsByRow = Math.max(elementWidth / this._charWidth, 1);

            const textLines = text.split('\n');
            const rows = textLines.reduce((totalRows, line) => {
                const rowsForLine = line.length ? Math.ceil(line.length / charsByRow) : 1;
                return totalRows + rowsForLine;
            }, 0);

            this._rows = rows || 1;
        } else {
            this._rows = this._defaultRows || 1;
        }
    }

    private handleFocus() {
        if (this._hasFocus && !!this.textarea) {
            this.textarea.nativeElement.focus();
        }
    }

    private initTextSizing() {
        if (!!this.textarea) {
            const font = window.getComputedStyle(this.textarea.nativeElement).getPropertyValue('font');
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (context && !!font) {
                context.font = font;
                this._charWidth = context.measureText('_').width;
            }
        }
    }

    private setupAutoResizing() {
        if (!this.resizeTrigger) {
            this.resizeTrigger = new Subject<any>();
            this.instantValueChange.pipe(takeUntil(this.terminator)).subscribe((value) => {
                this.resizeTrigger?.next(value);
            });
            this.resizeTrigger.pipe(takeUntil(this.terminator)).subscribe((value) => {
                if (this._resizable) {
                    this.autoResize(value);
                }
            });
        }
    }

    private terminateAutoResizing() {
        if (!!this.resizeTrigger) {
            this.resizeTrigger.complete();
            this.resizeTrigger = undefined;
        }
    }
}
