import { InputFormatterDirective } from './input-formatter.directive';
import { ElementRef } from '@angular/core';

describe('InputFormatterDirective', () => {
    it('should create an instance', () => {
        const el: ElementRef = new ElementRef<any>(undefined);
        const directive = new InputFormatterDirective(el);
        expect(directive).toBeTruthy();
    });
});
