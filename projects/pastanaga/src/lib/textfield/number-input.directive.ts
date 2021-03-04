import {AfterContentInit, Directive, Input} from '@angular/core';
import {InputComponent} from 'pastanaga-angular/lib/textfield/input.component';

/**
 * Applied on a pa-input
 * this directives allows support for
 * native [type:number] attributes
 * ie: list, min, max and step
 */
@Directive({
    selector: '[paNumberInput]',
})
export class NumberInputDirective implements AfterContentInit {
    @Input() paNumberList?: string;
    @Input() paNumberMax?: number;
    @Input() paNumberMin?: number;
    @Input() paNumberStep?: number;

    constructor(private paInput: InputComponent) {}

    ngAfterContentInit(): void {
        const htmlInput: HTMLInputElement = this.paInput.input?.nativeElement;
        if (!htmlInput) {
            console.warn('pa-input is not initialized properly');
            return;
        }
        if (this.paNumberMin !== undefined) {
            htmlInput.setAttribute('min', `${this.paNumberMin}`);
        }
        if (this.paNumberMax !== undefined) {
            htmlInput.setAttribute('max', `${this.paNumberMax}`);
        }
        if (this.paNumberStep !== undefined) {
            htmlInput.setAttribute('step', `${this.paNumberStep}`);
        }
        if (!!this.paNumberList) {
            htmlInput.setAttribute('list', this.paNumberList);
        }
    }
}
