import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFormKey, selectLanguage, setCartAmount, setMiniCartContent } from 'src/store/slices/ui';
import fetcher from 'src/utils/fetcher';
import { showOverlay } from 'src/store/slices/overlay';
import { useMicrocopyTranslations } from 'src/hooks/useTranslations';
import useHrefWithLang from 'src/hooks/useHrefWithLang';

type RequestState = 'idle' | 'loading' | 'error';

type ReturnType = {
  state: RequestState;
  addToCart: (productId: string, quantity: number) => Promise<void>;
};

const useAddToCart = (): ReturnType => {
  const [state, setState] = useState<RequestState>('idle');

  const formKey = useSelector(selectFormKey);
  const lang = useSelector(selectLanguage);
  const hrefWithLang = useHrefWithLang();

  const dispatch = useDispatch();

  const t = useMicrocopyTranslations();

  const addToCart = useCallback(
    async (productId: string, quantity: number) => {
      try {
        setState('loading');
        const form = new FormData();
        form.append('form_key', formKey);
        form.append('product', productId);
        form.append('qty', quantity.toString());
        form.append('isAjax', '1');

        const apiUrl = hrefWithLang(`/checkout/cart/add/product/${productId}/form_key/${formKey}`);

        const result = await fetcher(apiUrl, {
          method: 'POST',
          body: form,
        });
        const json = await result.json();
        if (!json.success) {
          throw 'Response is not successfull';
        }

        dispatch(setCartAmount(Number(json.minicartAmount)));
        dispatch(setMiniCartContent(''));
        setState('idle');
        return json;
      } catch (err) {
        console.log('the product could not add to cart', err);
        setState('error');
        dispatch(
          showOverlay({
            type: 'modal',
            variant: 'error',
            message: t('error_generic'),
          })
        );
      }
    },
    [dispatch, formKey, lang, t]
  );

  return {
    state,
    addToCart,
  };
};

export default useAddToCart;
