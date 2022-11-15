import { useSelector } from 'react-redux';
import { selectTranslations, Translations } from 'src/store/slices/translations';
import { useEffect, useState } from 'react';
import { selectCountry, selectLanguage, selectPreviewRef } from 'src/store/slices/ui';
import getTranslations, { Key } from 'lib/api/content/getTranslations';

type TranslateFunction<T> = (s: keyof T) => T[keyof T] | string;

function useTranslations<T>(key: Key): TranslateFunction<T> {
  const translations = useSelector(selectTranslations);
  const previewRef = useSelector(selectPreviewRef);
  const language = useSelector(selectLanguage);
  const region = useSelector(selectCountry);

  const [result, setResult] = useState(translations[key]);

  useEffect(() => {
    async function fetchTranslations(key: Key) {
      const result = await getTranslations(key, language, region, previewRef);
      setResult(result);
    }

    if (!result) {
      fetchTranslations(key);
    }
  }, [result, language, region, key, previewRef]);

  if (!result) {
    return () => '';
  }

  return (translationKey) => (result as unknown as T)[translationKey] || (translationKey as string);
}

export function useMicrocopyTranslations(): TranslateFunction<Required<Translations>['microcopy']> {
  return useTranslations<Required<Translations>['microcopy']>('microcopy');
}

export function useReferAFriendTranslations(): TranslateFunction<Required<Translations>['refer_a_friend']> {
  return useTranslations<Required<Translations>['refer_a_friend']>('refer_a_friend');
}

export default useTranslations;
