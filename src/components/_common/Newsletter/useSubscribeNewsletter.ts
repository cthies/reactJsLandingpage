import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFormKey, selectLanguage } from 'src/store/slices/ui';
import fetcher from 'src/utils/fetcher';
import useHrefWithLang from 'src/hooks/useHrefWithLang';

type ReturnType = {
  isLoading: boolean;
  subscribe: (email: string) => Promise<string | undefined>;
};

const useSubscribeNewsletter = (): ReturnType => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const language = useSelector(selectLanguage);
  const formKey = useSelector(selectFormKey);
  const hrefWithLang = useHrefWithLang();

  const subscribe = useCallback(
    async (email: string) => {
      setIsLoading(true);
      const data = new FormData();
      data.append('form_key', `${formKey}`);
      data.append('isAjax', '1');
      data.append('gender', '3');
      data.append('email', email);
      data.append('origin', 'footer');

      try {
        const url = hrefWithLang('/newsletter/subscriber/new');
        const result = await fetcher(url, {
          method: 'POST',
          body: data,
        });

        setIsLoading(false);
        return await result.text();
      } catch (e) {
        console.warn(e);
        setIsLoading(false);
        return undefined;
      }
    },
    [formKey, language]
  );

  return {
    isLoading,
    subscribe,
  };
};

export default useSubscribeNewsletter;
