import { TranslatePipe } from './translate.pipe';
import { TranslateService } from './translate.service';

describe('TranslatePipe', () => {
    let pipe: TranslatePipe;
    let translateService: TranslateService;

    beforeEach(() => {
        translateService = new TranslateService('en_US');
        pipe = new TranslatePipe(translateService, {
            en_US: { close: 'Close', cancel: 'Cancel' },
            latin: { close: 'Claudere' },
        });
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
});
