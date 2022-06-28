export interface FlattenTranslationEntries {
    [id: string]: string;
}
export interface TranslationEntries {
    [id: string]: string | TranslationEntries;
}

export interface Translation {
    [lang: string]: TranslationEntries;
}

export interface FlattenTranslation {
    [lang: string]: FlattenTranslationEntries;
}
