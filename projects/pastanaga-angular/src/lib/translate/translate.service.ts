import { EventEmitter, Inject, Injectable, InjectionToken } from '@angular/core';
import { FlattenTranslation, Translation, TranslationEntries } from './translate.model';
import { formatTranslationEntries, mergeTranslations } from './translate.utils';

export const PA_LANG = new InjectionToken<string>('pastanaga.lang', {
    factory: () => '',
});

export const PA_TRANSLATIONS = new InjectionToken<Translation>('pastanaga.translations', {
    factory: () => ({}),
});

export interface TranslationChangeEvent {
    translations: any;
    lang: string;
}

const HTML_TAG_DELIMITERS = new RegExp(/[<>]/gim);

@Injectable({
    providedIn: 'root',
})
export class TranslateService {
    private _currentLang: string;
    private readonly _flattenTranslations: FlattenTranslation = {};
    private _onTranslationChange: EventEmitter<TranslationChangeEvent> = new EventEmitter<TranslationChangeEvent>();

    defaultLang = 'en_US';

    get onTranslationChange(): EventEmitter<TranslationChangeEvent> {
        return this._onTranslationChange;
    }

    get flattenTranslations() {
        return this._flattenTranslations;
    }

    set currentLang(language: string) {
        this._currentLang = language;
    }
    get currentLang() {
        return this._currentLang;
    }

    /**
     * Keeping for backward compatibility
     * @param language
     */
    set currentLanguage(language: string) {
        this._currentLang = language;
    }
    get currentLanguage() {
        return this._currentLang;
    }

    constructor(
        @Inject(PA_LANG) private injectedLang: any,
        @Inject(PA_TRANSLATIONS) private translations: Translation,
    ) {
        this._currentLang = injectedLang;

        if (Object.keys(translations).length > 0) {
            this._flattenTranslations = Object.entries(translations).reduce((langMap, [lang, entries]) => {
                langMap[lang] = formatTranslationEntries(entries as Translation);
                return langMap;
            }, {} as FlattenTranslation);
        }
    }

    initTranslationsAndUse(lang: string, translation: TranslationEntries) {
        const flattenTranslations = formatTranslationEntries(translation);
        mergeTranslations(this._flattenTranslations, [{ [lang]: flattenTranslations }]);
        this.use(lang);
    }

    use(lang: string) {
        this.currentLang = lang;
        this.onTranslationChange.emit({ lang: this.currentLang, translations: this.flattenTranslations });
    }

    getValue(key: string, args?: any): string {
        if (!!args && typeof args !== 'object') {
            throw new Error('Translation parameter must be an object');
        }
        let value =
            (this.flattenTranslations[this.currentLang] || {})[key] ||
            (this.flattenTranslations[this.defaultLang] || {})[key];
        if (!!value && !!args) {
            Object.keys(args).forEach((param) => {
                let paramValue = args[param];
                if (typeof paramValue === 'string') {
                    paramValue = paramValue.replace(HTML_TAG_DELIMITERS, (c) => '&#' + c.charCodeAt(0) + ';');
                }
                value = value.replace(new RegExp(`{{${param}}}`, 'g'), paramValue);
            });
        }
        return value || key;
    }
}
