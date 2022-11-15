import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import AnimatedButton from 'src/components/_common/AnimatedButton';
import { setStoreHeaderHidden } from 'src/store/slices/head';
import useAddToCart from './useAddToCart';
import { useMicrocopyTranslations } from 'src/hooks/useTranslations';

interface AddToCartProps {
  productId: string;
  productHref?: string;
}

const AddToCart: FC<AddToCartProps> = ({ productId, productHref }) => {
  const t = useMicrocopyTranslations();
  const dispatch = useDispatch();

  const { state, addToCart } = useAddToCart();

  const addToCartClickHandler = useCallback(() => {
    dispatch(setStoreHeaderHidden(false));
    addToCart(productId, 1);
  }, [addToCart, dispatch, productId]);

  const goToProductClickHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if (productHref) {
        window.location.href = productHref;
      }
    },
    [productHref]
  );

  return (
    <AnimatedButton
      component="button"
      defaultlabel={state !== 'error' ? t('product_label') : t('product_cta_title')}
      addedLabel={t('product_added_label')}
      disabled={state === 'loading'}
      onClick={state !== 'error' ? addToCartClickHandler : goToProductClickHandler}
      data-cy="add-to-cart-button"
    />
  );
};

export default AddToCart;
