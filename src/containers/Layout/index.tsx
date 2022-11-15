import React from 'react';
import dynamic from 'next/dynamic';

import Header from '../../components/_common/Header';
const Footer = dynamic(() => import('../../components/_common/Footer'), { ssr: false });

import styles from './index.module.css';
import useDeviceTypeWatcher from 'src/hooks/useDeviceTypeWatcher';
import { useIsCartAndCheckout, useIsDMLandingPage } from 'src/hooks/usePageType';
import cn from 'src/utils/cn';
import Overlays from 'src/components/_shared/Overlays';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props): JSX.Element {
  useDeviceTypeWatcher();
  const isCheckoutPage = useIsCartAndCheckout();
  const isDMLandingPage = useIsDMLandingPage();

  return (
    <>
      <section
        className={cn(
          styles.container,
          isCheckoutPage && styles.checkoutContainer,
          isDMLandingPage && styles.noHeaderContainer
        )}
      >
        <main id="main">{children}</main>
        {!isDMLandingPage && (
          <>
            <Header />
            <Footer />
          </>
        )}
        <Overlays />
      </section>
    </>
  );
}

export default Layout;
