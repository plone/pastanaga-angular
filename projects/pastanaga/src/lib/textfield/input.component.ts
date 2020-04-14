import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    NgZone,
    OnInit,
    Optional,
    Output,
    ViewChild,
    AfterViewInit,
    OnDestroy,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS,
    FormGroupDirective,
    NgForm,
} from '@angular/forms';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { TextfieldCommon } from './textfield.common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { takeUntil } from 'rxjs/operators';
import { detectChanges } from '../common/utils';

const HTML_TAG = new RegExp(/.?<.+>/g);
const REPLACE_LT_GT = new RegExp(/[<>]/g);

@Component({
    selector: 'pa-input',
    templateUrl: 'input.component.html',
    styleUrls: ['input.component.scss'],
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
export class InputComponent extends TextfieldCommon implements OnInit, AfterViewInit, OnDestroy {
    @Input() type = 'text';
    @Input() maxCharacters?: number;
    @Input()
    get hasFocus(): boolean { return this._hasFocus; }
    set hasFocus(value: boolean) { this._hasFocus = coerceBooleanProperty(value); }
    @Input()
    get acceptHtmlTags(): boolean { return this._acceptHtmlTags; }
    set acceptHtmlTags(value: boolean) { this._acceptHtmlTags = coerceBooleanProperty(value); }
    @Input()
    get noAutoComplete(): boolean { return this._noAutoComplete; }
    set noAutoComplete(value: boolean) { this._noAutoComplete = coerceBooleanProperty(value); }

    @Output() errorList: EventEmitter<any> = new EventEmitter();

    @ViewChild('dataInput', { static: true }) input?: ElementRef;

    _hasFocus = false;
    _acceptHtmlTags = false;
    _noAutoComplete = false;

    autofilled = false;
    baseId = 'input';

    constructor(
        protected _platform: Platform,
        protected ngZone: NgZone,
        private _autofillMonitor: AutofillMonitor,
        @Optional() public _parentForm: NgForm,
        @Optional() public _parentFormGroup: FormGroupDirective,
        private cdr: ChangeDetectorRef,
    ) {
        super();
        this.valueChange.pipe(takeUntil(this.terminator)).subscribe(() => detectChanges(this.cdr));
    }

    ngOnInit() {
        super.ngOnInit();
        if (!!this.help) {
            this.helpId = `${this.id}-help`;
        }
    }

    ngAfterViewInit() {
        if (this._platform.isBrowser && !!this.input) {
            this._autofillMonitor
                .monitor(this.input.nativeElement)
                .subscribe(event => {
                    this.autofilled = event.isAutofilled;
                });
        }
        if (this._platform.IOS && !!this.input) {
            const input = this.input;
            this.ngZone.runOutsideAngular(() => {
                input.nativeElement.addEventListener(
                    'keyup',
                    (event: Event) => {
                        const el = event.target as HTMLInputElement;
                        if (
                            !el.value &&
                            !el.selectionStart &&
                            !el.selectionEnd
                        ) {
                            // Note: Just setting `0, 0` doesn't fix the issue. Setting
                            // `1, 1` fixes it for the first time that you type text and
                            // then hold delete. Toggling to `1, 1` and then back to
                            // `0, 0` seems to completely fix it.
                            el.setSelectionRange(1, 1);
                            el.setSelectionRange(0, 0);
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
        this.terminator.next();
        if (this._platform.isBrowser && !!this.input) {
          this._autofillMonitor.stopMonitoring(this.input.nativeElement);
        }
    }

    _validate(value) {
        super._validate(value);

        this.errorList.emit(this.errors);
    }

    writeValue(value: string | number | undefined) {
        if (!!value && typeof(value) === 'string' && !this._acceptHtmlTags && value.match(HTML_TAG)) {
            value = value.replace(REPLACE_LT_GT, '');
        }
        super.writeValue(value);
    }

    reset() {
        if (!!this.input) {
            this.input.nativeElement.value = '';
            this.value = '';
        }
    }
}
