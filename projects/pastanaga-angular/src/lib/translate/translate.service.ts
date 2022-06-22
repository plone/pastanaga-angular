import { Inject, Injectable, InjectionToken } from '@angular/core';
import { FlattenTranslation, Translation } from './translate.model';
import { formatTranslationEntries } from './translate.utils';
import { PA_TRANSLATIONS } from './translate.pipe';

export const PA_LANG = new InjectionToken<string>('pastanaga.lang', {
    factory: () => '',
});

@Injectable({
    providedIn: 'root',
})
export class TranslateService {
    private _currentLanguage: string;

    private readonly _flattenTranslations: FlattenTranslation = {};

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
}
