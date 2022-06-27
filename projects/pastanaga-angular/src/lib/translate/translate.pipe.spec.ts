import { TranslatePipe } from './translate.pipe';
import { TranslateService } from './translate.service';
import { ChangeDetectorRef } from '@angular/core';

describe('TranslatePipe', () => {
    let pipe: TranslatePipe;
    let translateService: TranslateService;

    beforeEach(() => {
        translateService = new TranslateService('en_US', {
            en_US: { close: 'Close', cancel: 'Cancel' },
            latin: { close: 'Claudere' },
        });
        pipe = new TranslatePipe(translateService, { markForCheck: () => {} } as ChangeDetectorRef);
    });

    it('should translate to the proper language', () => {
        expect(pipe.transform('close')).toBe('Close');
        expect(pipe.transform('cancel')).toBe('Cancel');
    });

    it('should fall back to english if translation is missing', () => {
        translateService.currentLanguage = 'latin';

        expect(pipe.transform('close')).toBe('Claudere');
        expect(pipe.transform('cancel')).toBe('Cancel');
    });

    it('should keep last value in cache', () => {
        const pipeAny = pipe as any;
        jest.spyOn(pipeAny, 'getValue');

        expect(pipe.transform('close')).toBe('Close');
        expect(pipe.transform('close')).toBe('Close');
        expect(pipeAny.getValue).toHaveBeenCalledTimes(1);
    });

    it('should return an empty string for empty key', () => {
        expect(pipe.transform()).toBe('');
    });
});
