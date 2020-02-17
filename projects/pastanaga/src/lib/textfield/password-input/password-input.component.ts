import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { PasswordRule } from './password-rule';

const rulesRegexp = {
    lowerCase: new RegExp(/[a-z]/),
    upperCase: new RegExp(/[A-Z]/),
    number: new RegExp(/[0-9]/),
    specialCharacter: new RegExp(/[^\da-zA-Z]/),
};

@Component({
    selector: 'pa-password-input',
    templateUrl: './password-input.component.html',
    styleUrls: ['./password-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordInputComponent {
    @Input() id = '';
    @Input() placeholder = '';
    @Input() set value(value: string) {
        if (!!value) {
            this.password = value;
        }
    }

    @Input()
    get withRules(): boolean { return this._withRules; }
    set withRules(value: boolean) { this._withRules = coerceBooleanProperty(value); }
    protected _withRules = false;

    @Input()
    get required(): boolean { return this._required; }
    set required(value: boolean) { this._required = coerceBooleanProperty(value); }
    protected _required = false;

    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
    protected _disabled = false;

    @Output() valueChange: EventEmitter<string> = new EventEmitter();

    password = '';
    errorMessage = '';
    iconName = 'show';
    isVisible = false;
    type = 'password';
    rules: PasswordRule[] = [
        new PasswordRule({id: 'length', length: 10, label: 'password-input.rule-list.length'}),
        new PasswordRule({id: 'upper', regexp: rulesRegexp.upperCase, label: 'password-input.rule-list.upper'}),
        new PasswordRule({id: 'lower', regexp: rulesRegexp.lowerCase, label: 'password-input.rule-list.lower'}),
        new PasswordRule({id: 'number', regexp: rulesRegexp.number, label: 'password-input.rule-list.number'}),
        new PasswordRule({id: 'special', regexp: rulesRegexp.specialCharacter, label: 'password-input.rule-list.special'}),
    ];
    debounceEmitter = 0;

    togglePasswordVisibility() {
        this.isVisible = !this.isVisible;
        this.iconName = this.isVisible ? 'hide' : 'show';
        this.type = this.isVisible ? 'text' : 'password';
    }

    /**
     * rules:
     *  - at least 10 characters
     *  - at least 1 lowercase
     *  - at least 1 uppercase
     *  - at least 1 number
     *  - at least 1 special character
     */
    checkPasswordStrength($event: KeyboardEvent) {
        if (!$event.target) {
            return;
        }
        if (this.debounceEmitter) {
            clearInterval(this.debounceEmitter);
        }
        const password =  (<HTMLInputElement>$event.target).value;
        let allValid = true;
        this.errorMessage = '';
        if (this._withRules) {
            this.rules.forEach(rule => {
                if (typeof rule.length === 'number') {
                    rule.isValid = password.length >= rule.length;
                } else if (rule.regexp instanceof RegExp) {
                    rule.isValid = password.match(rule.regexp) !== null;
                }
                if (!rule.isValid) {
                    allValid = false;
                }
            });
        }

        this.debounceEmitter = window.setTimeout(() => {
            if (allValid) {
                this.password = password;
                this.valueChange.emit(password);
            } else {
                this.valueChange.emit('');
                this.errorMessage = 'password-input.invalid-password';
            }
        }, 500);
    }
}
