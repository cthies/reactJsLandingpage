/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, memo } from 'react';
import ServiceBar from './ServiceBar';
import MainMenu from './MainMenu';
import SubMenu from './SubMenu';
import styles from './index.module.css';
import { selectLanguage, setUserData } from 'src/store/slices/ui';
import { selectIsHeaderHidden, setStoreHeaderHidden } from 'src/store/slices/head';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'src/utils/cn';
import { useIsCartAndCheckout } from 'src/hooks/usePageType';
import throttle from 'lodash.throttle';
import fetcher from 'src/utils/fetcher';

function Header(): JSX.Element {
  const dispatch = useDispatch();
  const isHidden = useSelector(selectIsHeaderHidden);
  const lang = useSelector(selectLanguage);
  const isCheckoutPage = useIsCartAndCheckout();
  const lastScroll = useRef(0);

  const hideHeader = () => {
    if (document.body.classList.contains('ignore-scroll')) {
      return;
    }
    const currentScroll = window.pageYOffset;
    const diff = currentScroll - lastScroll.current;
    dispatch(setStoreHeaderHidden(diff > 0 && currentScroll > 150));
    lastScroll.current = currentScroll;
  };

  const delayedScroll = throttle(hideHeader, 400, { leading: true });

  async function fetchUser(): Promise<void> {
    const url = `${lang ? `/${lang}` : ''}/goodminton/ajax/global/${Math.random()}`;
    try {
      const userResponse = await fetcher(url);
      const json = await userResponse.json();
      const body = document.querySelector('body');
      dispatch(setUserData(json));

      // trigger global ajax success for magento content pages
      if (document.getElementById('global_data') !== null) {
        const event = new CustomEvent('nextJS_global_ajax_finished', { detail: { data: json } });
        document.dispatchEvent(event);
      } else if (body) {
        body.dataset.formkey = json.csrf_form_key;
      }
    } catch (e) {
      console.error(e, url);
    }
  }

  useEffect(() => {
    fetchUser().then(() => null);
    window.addEventListener('scroll', delayedScroll, false);
    return () => window.removeEventListener('scroll', delayedScroll);
  }, []);

  return (
    <header id="header" className={cn(styles.header, isHidden ? styles.hidden : styles.shown)}>
      <ServiceBar />
      <MainMenu />
      {!isCheckoutPage && <SubMenu />}
    </header>
  );
}

export default memo(Header);
