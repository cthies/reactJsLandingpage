import { Client, locale } from 'lib/content/client';
import { Translations } from 'src/store/slices/translations';

export type Key = keyof Translations;

/*
having different microcopies for the same language in different regions is redundant, thus this map
 */
const microCopyLanguageToRegionMap = {
  en: 'gb',
  de: 'de',
  nl: 'be',
  be: 'be',
  fr: 'fr',
  sv: 'se',
  it: 'it',
  es: 'es',
} as { [key: string]: string };

export function makeLocale(key: Key, language: string, region: string): string {
  if (key === 'microcopy') {
    return locale(language, microCopyLanguageToRegionMap[language]);
  }
  return locale(language, region);
}

async function getTranslations(
  key: Key,
  language: string,
  region: string,
  previewRef: string
): Promise<Translations[Key]> {
  if (key === 'microcopy') {
    // get primary language microcopy
    const lang = makeLocale(key, language, region);
    const mainLanguageResult = await Client().getSingle(key, { lang, ref: previewRef });
    const mainLanguageData = mainLanguageResult.data;

    // get language-region override microcopy
    const overrideLanguageResult = await Client().getSingle(key, {
      lang: locale(language, region),
      ref: previewRef,
    });
    const overrideLanguageData = overrideLanguageResult.data;

    // filter out empty values
    Object.keys(overrideLanguageData).forEach((key) => {
      if (overrideLanguageData[key] === '' || overrideLanguageData[key] === null) {
        delete overrideLanguageData[key];
      }
    });

    // merge the result
    return { ...mainLanguageData, ...overrideLanguageData };
  }

  const lang = locale(language, region);
  const result = await Client().getSingle(key, { lang, ref: previewRef });
  return result.data;
}

export default getTranslations;
