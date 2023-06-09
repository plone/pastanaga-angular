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

  it('should store injected translations formatted', () => {
    const service = new TranslateService('en', { en: { hello: 'world' } });
    expect(service.flattenTranslations).toEqual({ en: { hello: 'world' } });
  });

  describe('initTranslationsAndUse', () => {
    let service: TranslateService;

    beforeEach(() => {
      service = new TranslateService('en', { en: { hello: 'world' } });
      jest.spyOn(service.onTranslationChange, 'emit');
    });

    it('should merge existing translations with the one provided', () => {
      const expectedTranslations = { en: { hello: 'world', foo: 'bar' } };
      service.initTranslationsAndUse('en', { foo: 'bar' });
      expect(service.flattenTranslations).toEqual(expectedTranslations);
      expect(service.onTranslationChange.emit).toHaveBeenCalledWith({
        lang: 'en',
        translations: expectedTranslations,
      });
    });

    it('should update current lang with the one provided', () => {
      const expectedTranslations = { en: { hello: 'world' }, fr: { hello: 'le monde' } };
      service.initTranslationsAndUse('fr', { hello: 'le monde' });
      expect(service.flattenTranslations).toEqual(expectedTranslations);
      expect(service.onTranslationChange.emit).toHaveBeenCalledWith({
        lang: 'fr',
        translations: expectedTranslations,
      });
      expect(service.currentLang).toBe('fr');
    });
  });

  describe('getValue', () => {
    let service: TranslateService;

    beforeEach(() => {
      service = new TranslateService('en', { en: { hello: 'world', welcome: 'Welcome {{you}}!' } });
    });
    it('should return the translation', () => {
      expect(service.getValue('hello')).toBe('world');
    });

    it('should return the translation including the params', () => {
      expect(service.getValue('welcome')).toBe('Welcome {{you}}!');
      expect(service.getValue('welcome', { you: 'Anakin' })).toBe('Welcome Anakin!');
    });

    it('should return the key when there is matching translation', () => {
      expect(service.getValue('salut')).toBe('salut');
    });

    it('should raise an error if the argument passed is not an object', () => {
      expect(() => {
        service.getValue('welcome', 'Anakin');
      }).toThrow('Translation parameter must be an object');
      expect(() => {
        service.getValue('welcome', true);
      }).toThrow('Translation parameter must be an object');
      expect(() => {
        service.getValue('welcome');
      }).not.toThrow('Translation parameter must be an object');
    });
  });
});
