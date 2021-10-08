import { Translation, TranslationEntries } from './translate.model';

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

export const mergeTranslations = (existing: Translation, translations: Translation[]) => {
    translations.forEach((translation) =>
        Object.entries(translation).forEach(
            ([lang, entries]) => (existing[lang] = deepMerge(entries, existing[lang] || {}))
        )
    );
};
