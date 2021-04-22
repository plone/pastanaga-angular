import { TranslateDirective } from './translate.directive';
import { TranslatePipe } from './translate.pipe';
import { ElementRef } from '@angular/core';
import { PA_TRANSLATIONS } from './translate.model';
class MockElementRef implements ElementRef {
    nativeElement = {};
}
const obj1 = { common: 1, second: 2 };
const obj2 = { common: 1, color: 'blue' };
const obj3 = { common: 1, second: 3 };

describe('TranslateDirective', () => {
    it('should create an instance', () => {
        const directive = new TranslateDirective(new MockElementRef(), new TranslatePipe('en_US'));
        expect(directive).toBeTruthy();
    });
});

describe('Testing areEquals method', () => {
    it('Sending 2 objects with a different property should be false', () => {
        const directive = new TranslateDirective(new MockElementRef(), new TranslatePipe('en_US'));
        expect(directive.areEquals(obj1, obj2)).toBe(false);
    });

    it('Sending 2 equal objects should be true', () => {
        const directive = new TranslateDirective(new MockElementRef(), new TranslatePipe('en_US'));
        expect(directive.areEquals(obj1, obj1)).toBe(true);
    });

    it('Sending 2 objects with a different property value should be false', () => {
        const directive = new TranslateDirective(new MockElementRef(), new TranslatePipe('en_US'));
        expect(directive.areEquals(obj1, obj3)).toBe(false);
    });
    it('should translate to the proper language', () => {
        PA_TRANSLATIONS.en_US = { close: 'Close', cancel: 'Cancel' };
        PA_TRANSLATIONS.latin = { close: 'Claudere' };
        const pipe = new TranslatePipe('en_US');
        expect(pipe.transform('close')).toBe('Close');
        expect(pipe.transform('cancel')).toBe('Cancel');
    });
    it('should fall back to english if translation is missing', () => {
        PA_TRANSLATIONS.en_US = { close: 'Close', cancel: 'Cancel' };
        PA_TRANSLATIONS.latin = { close: 'Claudere' };
        const pipe = new TranslatePipe('latin');
        expect(pipe.transform('close')).toBe('Claudere');
        expect(pipe.transform('cancel')).toBe('Cancel');
    });
});
