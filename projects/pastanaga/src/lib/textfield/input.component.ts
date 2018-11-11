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
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { getSupportedInputTypes, Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { TextfieldCommon } from './textfield.common';
import { Subject } from 'rxjs';

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
export class InputComponent extends TextfieldCommon
    implements OnInit, OnChanges, AfterViewChecked, OnDestroy {
    @Input() type = 'text';
    @Input() hasFocus: boolean;
    @Input() hasStrengthBar: boolean;

    @Output() errorList: EventEmitter<any> = new EventEmitter();

    @ViewChild('dataInput') input: ElementRef;

    passwordStrength: number;
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
        if (this.hasStrengthBar && this.type === 'password') {
            this.help = 'common.password-rules';
        }
        if (this.help) {
            this.helpId = `${this.id}-help`;
        }
    }

    ngOnChanges(changes) {
        if (!!changes.hasFocus && changes.hasFocus.currentValue === true) {
            this.input.nativeElement.focus();
        }
        this.stateChanges.next();
    }

    ngAfterViewChecked() {
        if (this._platform.isBrowser) {
            this._autofillMonitor
                .monitor(this.input.nativeElement)
                .subscribe(event => {
                    this.autofilled = event.isAutofilled;
                    this.stateChanges.next();
                });
        }
        if (this._platform.IOS) {
            this.ngZone.runOutsideAngular(() => {
                this.input.nativeElement.addEventListener(
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
    }

    ngOnDestroy() {
        this.stateChanges.complete();

        if (this._platform.isBrowser) {
          this._autofillMonitor.stopMonitoring(this.input.nativeElement);
        }
    }

    _validate(value) {
        super._validate(value);

        if (this.hasStrengthBar && this.type === 'password') {
            this.checkPasswordStrength(value);
            this.errors.passwordStrength = this.passwordStrength < 4;
        }

        this.errorList.emit(this.errors);
    }

    /**
     * rules:
     *  - at least 10 characters
     *  - at least 1 lowercase
     *  - at least 1 uppercase
     *  - at least 1 number
     *  - at least 1 special character
     * @param password
     */
    private checkPasswordStrength(password) {
        const rules = [
            password.length >= 10,
            password.match(rulesRegexp.lowerCase) !== null,
            password.match(rulesRegexp.upperCase) !== null,
            password.match(rulesRegexp.number) !== null,
            password.match(rulesRegexp.specialCharacter) !== null,
        ];

        this.passwordStrength = rules.filter(isRuleOk => isRuleOk).length;
    }
}

const rulesRegexp = {
    lowerCase: new RegExp(/[a-z]/),
    upperCase: new RegExp(/[A-Z]/),
    number: new RegExp(/[0-9]/),
    specialCharacter: new RegExp(/[^\da-zA-Z]/),
};
