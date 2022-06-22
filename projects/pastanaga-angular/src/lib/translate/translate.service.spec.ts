import { TranslateService } from './translate.service';

describe('TranslateService', () => {
    it('should set currentLanguage with the provided language by default', () => {
        const service = new TranslateService('en_US', {});
        expect(service.currentLanguage).toBe('en_US');
    });

    it('should allow to change the language', () => {
        const service = new TranslateService('en_US', {});
        service.currentLanguage = 'latin';
        expect(service.currentLanguage).toBe('latin');
    });
});
