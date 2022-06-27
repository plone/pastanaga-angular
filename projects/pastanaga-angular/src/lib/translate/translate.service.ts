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

@Injectable({
    providedIn: 'root',
})
export class TranslateService {
    private _lang: string;
    private readonly _flattenTranslations: FlattenTranslation = {};

    private _onTranslationChange: EventEmitter<TranslationChangeEvent> = new EventEmitter<TranslationChangeEvent>();

    get onTranslationChange(): EventEmitter<TranslationChangeEvent> {
        return this._onTranslationChange;
    }

    get flattenTranslations() {
        return this._flattenTranslations;
    }

    set lang(language: string) {
        this._lang = language;
    }
    get lang() {
        return this._lang;
    }

    /**
     * Keeping for backward compatibility
     * @param language
     */
    set currentLanguage(language: string) {
        this._lang = language;
    }
    get currentLanguage() {
        return this._lang;
    }

    constructor(
        @Inject(PA_LANG) private injectedLang: any,
        @Inject(PA_TRANSLATIONS) private translations: Translation,
    ) {
        this._lang = injectedLang;

        if (Object.keys(translations).length > 0) {
            this._flattenTranslations = Object.entries(translations).reduce((langMap, [lang, entries]) => {
                langMap[lang] = formatTranslationEntries(entries as Translation);
                return langMap;
            }, {} as FlattenTranslation);
        }
    }

    initTranslationsAndUse(lang: string, translation: TranslationEntries) {
        this.lang = lang;
        const flattenTranslations = formatTranslationEntries(translation);
        mergeTranslations(this._flattenTranslations, [{ [lang]: flattenTranslations }]);
        this.onTranslationChange.emit({ lang: this.lang, translations: this.flattenTranslations });
    }
}
