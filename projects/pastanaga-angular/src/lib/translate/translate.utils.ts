import { FlattenTranslationEntries, Translation, TranslationEntries } from './translate.model';

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
      ([lang, entries]) => (existing[lang] = deepMerge(entries, existing[lang] || {})),
    ),
  );
};

export const formatTranslationEntries = (entries: TranslationEntries): FlattenTranslationEntries => {
  return flattenEntry('', entries);
};

const flattenEntry = (rootKey: string, entry: TranslationEntries): FlattenTranslationEntries => {
  let flattenEntries: FlattenTranslationEntries = {};
  Object.entries(entry).forEach(([key, value]) => {
    const flattenKey = !!rootKey ? `${rootKey}.${key}` : key;
    if (typeof value === 'string') {
      flattenEntries[flattenKey] = value;
    } else {
      const flattenResult = flattenEntry(flattenKey, value);
      flattenEntries = { ...flattenEntries, ...flattenResult };
    }
  });
  return flattenEntries;
};
