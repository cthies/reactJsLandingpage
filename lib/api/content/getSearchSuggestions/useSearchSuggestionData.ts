import { useEffect, useState } from 'react';
import { SearchSuggestionsResponseType } from 'lib/api/content/getSearchSuggestions/Types';
import { useSelector } from 'react-redux';
import { selectCountry, selectLanguage, selectPreviewRef } from 'src/store/slices/ui';
import { getSearchSuggestions } from 'lib/api/content/getSearchSuggestions';

export const useSearchSuggestionData = (): SearchSuggestionsResponseType | undefined => {
  const [data, setData] = useState<SearchSuggestionsResponseType>();

  const region = useSelector(selectCountry);
  const language = useSelector(selectLanguage);
  const prismicPreviewRef = useSelector(selectPreviewRef);

  useEffect(() => {
    getSearchSuggestions(language, region, prismicPreviewRef)
      .then(async (r) => {
        if (r) {
          setData(r);
        }
      })
      .catch(console.error);
  }, [language, prismicPreviewRef, region]);

  return data;
};
