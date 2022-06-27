import { TranslatePipe } from './translate.pipe';
import { TranslateService } from './translate.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

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

    it('should update the translation value when translationChange event is triggered', () => {
        expect(pipe.transform('close')).toBe('Close');
        expect(pipe.transform('cancel')).toBe('Cancel');
        translateService.initTranslationsAndUse('fr', { close: 'Fermer', cancel: 'Annuler' });
        expect(pipe.transform('close')).toBe('Fermer');
        expect(pipe.transform('cancel')).toBe('Annuler');
    });

    it('should cleanup subscriptions on destroy', () => {
        const mockUnsubscribe = jest.fn();
        pipe.onTranslationChange = { unsubscribe: mockUnsubscribe } as unknown as Subscription;
        pipe.ngOnDestroy();
        expect(mockUnsubscribe).toHaveBeenCalled();
        expect(pipe.onTranslationChange).toBeUndefined();
    });
});
