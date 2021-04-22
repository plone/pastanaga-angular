export const PA_TRANSLATIONS: Translation = {};

export interface TranslationEntries {
    [id: string]: string | TranslationEntries;
}

export interface Translation {
    [lang: string]: TranslationEntries;
}
