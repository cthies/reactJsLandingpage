/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import uniqueId from 'lodash.uniqueid';

import Icon from 'src/components/_shared/Icon';
import LanguageLink from 'src/components/_shared/LanguageLink';
import commonStyles from '../index.module.css';
import styles from './index.module.css';
const Popover = dynamic(() => import('src/components/_shared/Popover'));
import { useDispatch, useSelector } from 'react-redux';
import { LegacyRef } from 'react';
import {
  selectCartAmount,
  selectLanguage,
  selectMiniCartContent,
  setCartAmount,
  setMiniCartContent,
} from 'src/store/slices/ui';
import { useIsCartAndCheckout } from 'src/hooks/usePageType';
import { useDeviceType } from 'src/hooks/useDeviceType';
import { setStoreHeaderHidden } from 'src/store/slices/head';
import fetcher from 'src/utils/fetcher';

function MiniCart(): JSX.Element {
  const deviceType = useDeviceType();
  const isPopupEnabled = !useIsCartAndCheckout();
  const lang = useSelector(selectLanguage);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const cartAmount = useSelector(selectCartAmount);
  const miniCartContent = useSelector(selectMiniCartContent);

  async function handleAddToCartClick(e: MouseEvent): Promise<void> {
    const { classList } = e.target as any;
    if (classList.contains('addToCart-label')) {
      // timeout because data is not updated instantly for the minicart request
      dispatch(setStoreHeaderHidden(false));
      setTimeout(fetchCart, 2000);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleAddToCartClick);
    return () => document.removeEventListener('click', handleAddToCartClick);
  }, []);

  async function fetchCart(): Promise<void> {
    setIsLoading(true);
    const miniCartResponse = await fetcher(`${lang ? `/${lang}` : ''}/egg/ajax/getminicart/${uniqueId()}`, {
      body: null,
      method: 'POST',
    });
    const json = await miniCartResponse.json();
    dispatch(setMiniCartContent(json.minicartHtml));
    dispatch(setCartAmount(json.minicartAmount));
  }

  async function handleMouseEnter(): Promise<void> {
    if (deviceType !== 'mobile' && !miniCartContent) {
      await fetchCart();
    }
  }

  async function handleDeleteFromMiniCartClick(e: React.MouseEvent): Promise<void> {
    const target = e.target as HTMLAnchorElement;
    if (target.classList.contains('js-delete-item')) {
      e.preventDefault();
      await fetcher(target.href);
      await fetchCart();
    }
  }

  const trigger = (ref?: LegacyRef<HTMLDivElement>): JSX.Element => (
    <div ref={ref} className={commonStyles.item} onMouseEnter={handleMouseEnter} id="flyout-shopping-cart-wrapper">
      <LanguageLink href="/checkout/cart">
        <Icon name="cart" mobileSize={28} />
      </LanguageLink>
    </div>
  );

  const menu = (): JSX.Element | null =>
    isLoading && !miniCartContent ? null : (
      <div className={commonStyles.popover}>
        <div
          dangerouslySetInnerHTML={{ __html: miniCartContent }}
          onClickCapture={handleDeleteFromMiniCartClick}
          className={styles.content}
        />
      </div>
    );

  return (
    <div className={styles.container}>
      <Popover trigger={trigger} content={menu} enabled={isPopupEnabled} />
      <span id="cart-bubble" className={cartAmount > 0 ? styles.count : styles.emptyCount}>
        {cartAmount || ''}
      </span>
    </div>
  );
}

export default MiniCart;
