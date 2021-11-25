import { TranslateService } from './translate.service';
import { TranslateDirective } from './translate.directive';
import { TranslatePipe } from './translate.pipe';
import { ElementRef } from '@angular/core';
class MockElementRef implements ElementRef {
    nativeElement = {};
}
const obj1 = { common: 1, second: 2 };
const obj2 = { common: 1, color: 'blue' };
const obj3 = { common: 1, second: 3 };

describe('TranslateService', () => {
    it('should create an instance', () => {
        const service = new TranslateService('en_US');
        expect(service).toBeTruthy();
    });
    it('should change language', () => {
        const service = new TranslateService('en_US');
        expect(service).toBeTruthy();
        service.setLang('latin');
        expect(service.currentLanguage).toEqual('latin');
    });
    it('should translate to the proper language', () => {
        const service = new TranslateService('en_US');
        expect(service).toBeTruthy();

        const pipe = new TranslatePipe(service, {
            en_US: { close: 'Close', cancel: 'Cancel' },
            latin: { close: 'Claudere' },
        });
        expect(pipe.transform('close')).toBe('Close');
        expect(pipe.transform('cancel')).toBe('Cancel');
        service.setLang('latin');
        expect(pipe.transform('close')).toBe('Claudere');
        expect(pipe.transform('cancel')).toBe('Cancel');
    });
});

describe('TranslateDirective', () => {
    it('should create an instance', () => {
        const directive = new TranslateDirective(
            new MockElementRef(),
            new TranslatePipe(new TranslateService('en_US'), {})
        );
        expect(directive).toBeTruthy();
    });
});

describe('Testing areEquals method', () => {
    it('Sending 2 objects with a different property should be false', () => {
        const directive = new TranslateDirective(
            new MockElementRef(),
            new TranslatePipe(new TranslateService('en_US'), {})
        );
        expect(directive.areEquals(obj1, obj2)).toBe(false);
    });

    it('Sending 2 equal objects should be true', () => {
        const directive = new TranslateDirective(
            new MockElementRef(),
            new TranslatePipe(new TranslateService('en_US'), {})
        );
        expect(directive.areEquals(obj1, obj1)).toBe(true);
    });

    it('Sending 2 objects with a different property value should be false', () => {
        const directive = new TranslateDirective(
            new MockElementRef(),
            new TranslatePipe(new TranslateService('en_US'), {})
        );
        expect(directive.areEquals(obj1, obj3)).toBe(false);
    });
    it('should translate to the proper language', () => {
        const pipe = new TranslatePipe(new TranslateService('en_US'), {
            en_US: { close: 'Close', cancel: 'Cancel' },
            latin: { close: 'Claudere' },
        });
        expect(pipe.transform('close')).toBe('Close');
        expect(pipe.transform('cancel')).toBe('Cancel');
    });
    it('should fall back to english if translation is missing', () => {
        const pipe = new TranslatePipe(new TranslateService('latin'), {
            en_US: { close: 'Close', cancel: 'Cancel' },
            latin: { close: 'Claudere' },
        });
        expect(pipe.transform('close')).toBe('Claudere');
        expect(pipe.transform('cancel')).toBe('Cancel');
    });
});
