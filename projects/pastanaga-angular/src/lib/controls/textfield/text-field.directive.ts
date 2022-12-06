import { PaFormControlDirective } from '../form-field';
import { AfterViewInit, Directive, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
    selector: '[paTextField]',
})
export class TextFieldDirective extends PaFormControlDirective implements AfterViewInit {
    @Input()
    set hasFocus(value: any) {
        this._hasFocus = coerceBooleanProperty(value);
        this.focusInput();
    }
    get hasFocus() {
        return this._hasFocus;
    }

    private _hasFocus = false;
    private _labelWidth?: number;

    get hasContent() {
        return this.control.value?.length > 0;
    }

    get labelWidth() {
        return `${this._labelWidth}px`;
    }

    ngAfterViewInit() {
        setTimeout(() => {
            const label = this.element.nativeElement.querySelector('.pa-field-label');
            if (label) {
                this._labelWidth = label.getBoundingClientRect().width;
            }
        });
    }

    onFocus(event: any) {
        this._hasFocus = true;
    }

    onBlur() {
        this._hasFocus = false;
    }

    focusInput() {
        // To be overridden
    }
}
