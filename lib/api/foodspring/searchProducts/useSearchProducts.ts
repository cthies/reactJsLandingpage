import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentStoreId } from 'src/store/slices/config';
import { selectLanguage, selectWebsiteId } from 'src/store/slices/ui';
import { searchProducts } from '.';
import { SearchProductsResultProps } from './Types';

type ReturnType = (q: string) => Promise<SearchProductsResultProps>;

const useSearchProductsAPI = (): ReturnType => {
  const websiteId = useSelector(selectWebsiteId);
  const storeId = useSelector(selectCurrentStoreId);
  const lang = useSelector(selectLanguage);

  const searchAPI = useCallback(
    async (q: string): Promise<SearchProductsResultProps> => {
      const response = await searchProducts({
        q,
        lang,
        storeId,
        websiteId,
      });

      if (response.success) {
        return response.data;
      } else {
        return {};
      }
    },
    [lang, storeId, websiteId]
  );

  return searchAPI;
};

export default useSearchProductsAPI;
