import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    NgZone,
    OnChanges,
    OnInit,
    Optional,
    Output,
    ViewChild,
    AfterViewChecked,
    OnDestroy,
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
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-input',
    templateUrl: 'input.component.html',
    styleUrls: ['textfield.scss', 'input.component.scss'],
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
})
export class InputComponent extends TextfieldCommon implements OnInit, OnChanges, AfterViewChecked, OnDestroy {
    @Input() type = 'text';
    @Input()
    get hasFocus(): boolean { return this._hasFocus; }
    set hasFocus(value: boolean) { this._hasFocus = coerceBooleanProperty(value); }
    protected _hasFocus = false;
    @Input()
    get isLessen(): boolean { return this._isLessen; }
    set isLessen(value: boolean) { this._isLessen = coerceBooleanProperty(value); }
    protected _isLessen = false;

    @Output() errorList: EventEmitter<any> = new EventEmitter();

    @ViewChild('dataInput', { static: true }) input?: ElementRef;

    autofilled = false;
    baseId = 'input';
    readonly stateChanges: Subject<void> = new Subject<void>();

    constructor(
        protected _platform: Platform,
        protected ngZone: NgZone,
        private _autofillMonitor: AutofillMonitor,
        @Optional() public _parentForm: NgForm,
        @Optional() public _parentFormGroup: FormGroupDirective,
    ) {
        super();
        this.errors.passwordStrength = false;
    }

    ngOnInit() {
        super.ngOnInit();
        if (!!this.help) {
            this.helpId = `${this.id}-help`;
        }
    }

    ngOnChanges(changes) {
        this.stateChanges.next();
    }

    ngAfterViewChecked() {
        if (this._platform.isBrowser && !!this.input) {
            this._autofillMonitor
                .monitor(this.input.nativeElement)
                .subscribe(event => {
                    this.autofilled = event.isAutofilled;
                    this.stateChanges.next();
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
        this.stateChanges.complete();

        if (this._platform.isBrowser && !!this.input) {
          this._autofillMonitor.stopMonitoring(this.input.nativeElement);
        }
    }

    _validate(value) {
        super._validate(value);

        this.errorList.emit(this.errors);
    }
}
