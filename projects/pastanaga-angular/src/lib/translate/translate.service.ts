import { EventEmitter, Inject, Injectable, InjectionToken } from '@angular/core';
import { FlattenTranslation, Translation, TranslationEntries } from './translate.model';
import { formatTranslationEntries, mergeTranslations } from './translate.utils';
import { PA_TRANSLATIONS } from './translate.pipe';

export const PA_LANG = new InjectionToken<string>('pastanaga.lang', {
    factory: () => '',
});

export interface TranslationChangeEvent {
    translations: any;
    lang: string;
}

@Injectable({
    providedIn: 'root',
})
export class TranslateService {
    private _currentLanguage: string;
    private readonly _flattenTranslations: FlattenTranslation = {};

    private _onTranslationChange: EventEmitter<TranslationChangeEvent> = new EventEmitter<TranslationChangeEvent>();

    get onTranslationChange(): EventEmitter<TranslationChangeEvent> {
        return this._onTranslationChange;
    }

    get flattenTranslations() {
        return this._flattenTranslations;
    }

    set currentLanguage(language: string) {
        this._currentLanguage = language;
    }
    get currentLanguage() {
        return this._currentLanguage;
    }

    constructor(@Inject(PA_LANG) private lang: any, @Inject(PA_TRANSLATIONS) private translations: Translation) {
        this._currentLanguage = lang;

        if (Object.keys(translations).length > 0) {
            this._flattenTranslations = Object.entries(translations).reduce((langMap, [lang, entries]) => {
                langMap[lang] = formatTranslationEntries(entries);
                return langMap;
            }, {} as FlattenTranslation);
        }
    }

    initTranslations(lang: string, translation: TranslationEntries) {
        const flattenTranslations = formatTranslationEntries(translation);
        mergeTranslations(this._flattenTranslations, [{ [lang]: flattenTranslations }]);
        this.onTranslationChange.next({ lang: this.currentLanguage, translations: this.flattenTranslations });
    }
}
