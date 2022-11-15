import { SearchProductsResultProps } from 'lib/api/foodspring/searchProducts/Types';
import useSearchProductsAPI from 'lib/api/foodspring/searchProducts/useSearchProducts';
import { useEffect, useState } from 'react';
import { validateSearch } from 'src/utils/validate';

export const useSearch = (q: string): SearchProductsResultProps => {
  const [searchResult, setSearchResult] = useState({} as SearchProductsResultProps);
  const callSearchProductsApi = useSearchProductsAPI();

  useEffect(() => {
    const callApi = async () => {
      setSearchResult(await callSearchProductsApi(q));
    };

    if (validateSearch(q)) {
      callApi();
    } else {
      setSearchResult({});
    }
  }, [callSearchProductsApi, q]);

  return searchResult;
};
