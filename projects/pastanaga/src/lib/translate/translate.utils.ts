import { TranslationEntries } from './translate.model';

function deepMerge(from: TranslationEntries, to: TranslationEntries): TranslationEntries {
    return Object.entries(from).reduce((all, [key, translation]) => {
        if (!all[key]) {
            all[key] = translation;
        } else if (typeof all[key] !== 'string' && typeof translation !== 'string') {
            all[key] = deepMerge(translation, all[key] as TranslationEntries);
        }
        return all;
    }, to);
}

export const mergeTranslations = (translations: TranslationEntries[]): TranslationEntries => {
    return translations.reduce((all, current) => {
        return deepMerge(all, current);
    }, {} as TranslationEntries);
}
