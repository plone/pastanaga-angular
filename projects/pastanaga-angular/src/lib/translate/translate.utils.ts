import { PA_TRANSLATIONS, Translation } from './translate.model';

function deepMerge(from: any, to: any): any {
    return Object.entries(from).reduce((all, [key, translation]) => {
        if (!all[key]) {
            all[key] = translation;
        } else if (typeof all[key] !== 'string' && typeof translation !== 'string') {
            all[key] = deepMerge(translation, all[key]);
        }
        return all;
    }, to);
}

export const mergeTranslations = (translations: Translation[]) => {
    translations.forEach((current) => {
        Object.entries(current).forEach(
            ([lang, entries]) => (PA_TRANSLATIONS[lang] = deepMerge(entries, PA_TRANSLATIONS[lang] || {})),
        );
    });
};
