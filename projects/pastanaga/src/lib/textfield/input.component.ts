import { Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { TextfieldCommon } from './textfield.common';

@Component({
    selector: 'pa-input',
    templateUrl: 'input.component.html',
    styleUrls: ['textfield.scss', 'input.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true,
    }, {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => InputComponent),
        multi: true,
    }],
})
export class InputComponent extends TextfieldCommon implements OnInit, OnChanges {
    @Input() type = 'text';
    @Input() hasFocus: boolean;
    @Input() hasStrengthBar: boolean;

    @Output() errorList: EventEmitter<any> = new EventEmitter();

    @ViewChild('dataInput') input: ElementRef;

    passwordStrength: number;

    baseId = 'input';

    constructor() {
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
