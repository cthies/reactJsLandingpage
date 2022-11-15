/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';

import Icon from 'src/components/_shared/Icon';
import LanguageLink from 'src/components/_shared/LanguageLink';
import { uiSelector } from 'src/store/slices/ui';

import parentStyles from '../index.module.css';
import styles from './index.module.css';
const Popover = dynamic(() => import('src/components/_shared/Popover'));
import { JSX } from '@babel/types';
import { LegacyRef } from 'react';
import { useMicrocopyTranslations } from 'src/hooks/useTranslations';

const UserMenu = (): JSX.Element => {
  const { userData } = useSelector(uiSelector);
  const t = useMicrocopyTranslations();

  const menu = (): JSX.Element => (
    <div className={parentStyles.popover}>
      {userData.customer_is_logged_in ? (
        <div className={styles.menu}>
          <LanguageLink href="/customer/account">{t('user_account')}</LanguageLink>
          <LanguageLink href="/sales/order/history">{t('user_orders')}</LanguageLink>
          <LanguageLink href="/subscription">{t('user_subscriptions')}</LanguageLink>
          <LanguageLink href="/refer-a-friend/index/stats">{t('user_refer')}</LanguageLink>
          <LanguageLink href="/customer/account/loyalty">{t('user_loyalty')}</LanguageLink>
          <LanguageLink href="/customer/balance">{t('user_balance')}</LanguageLink>
          <LanguageLink href="/customer/account/review">{t('user_review')}</LanguageLink>
          <LanguageLink href="/customer/account/logout">{t('user_logout')}</LanguageLink>
        </div>
      ) : (
        <div className={styles.menu}>
          <LanguageLink href="/customer/account/login" className="btn btn-primary btn-block">
            {t('user_login')}
          </LanguageLink>
          <LanguageLink href="/customer/account/forgotpassword">{t('user_forgot_your_password')}</LanguageLink>
          <LanguageLink href="/customer/account/login">
            {t('user_new_customer')} <b>{t('user_register_now')}</b>
          </LanguageLink>
        </div>
      )}
    </div>
  );

  const trigger = (ref: LegacyRef<HTMLDivElement>): JSX.Element => (
    <div ref={ref} className={parentStyles.item}>
      <LanguageLink href="/customer/account/login">
        {userData.customer_is_logged_in ? (
          <Icon name="userLogged" mobileSize={28} />
        ) : (
          <Icon name="user" mobileSize={28} />
        )}
      </LanguageLink>
    </div>
  );

  return (
    <div className={styles.container}>
      <Popover trigger={trigger} content={menu} />
    </div>
  );
};

export default UserMenu;
