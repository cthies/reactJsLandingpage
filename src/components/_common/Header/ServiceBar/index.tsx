import FullWidthBgContainer from 'src/components/_shared/FullWidthBgContainer';
import styles from './index.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import cn from 'src/utils/cn';
import StoreSwitchControl from 'src/components/_common/Header/ServiceBar/StoreSwitchControl';
import StoreSwitchMenu from 'src/components/_common/Header/ServiceBar/StoreSwitchMenu';
import Link from 'src/components/_shared/Link';
import { selectIsStoreSwitcherOpen, setStoreSwitcherIsOpen } from 'src/store/slices/head';
import { selectConfig } from 'src/store/slices/config';
import { useMicrocopyTranslations } from 'src/hooks/useTranslations';

function ServiceBar(): JSX.Element {
  const t = useMicrocopyTranslations();
  const dispatch = useDispatch();
  const { customer_service_page, shipping_threshold } = useSelector(selectConfig);
  const isStoreSwitcherOpen = useSelector(selectIsStoreSwitcherOpen);

  useEffect(() => {
    document.body.style.overflow = isStoreSwitcherOpen ? 'hidden' : '';
  }, [isStoreSwitcherOpen]);

  function handleVeilClick(): void {
    dispatch(setStoreSwitcherIsOpen(false));
  }

  function renderMenu(): JSX.Element {
    return (
      <>
        <div className={cn('desktop', styles.menu)}>
          <StoreSwitchMenu />
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className={styles.veil} onClick={handleVeilClick} />
      </>
    );
  }

  function renderContact(): JSX.Element {
    const contactText = t('service_bar_consultation_and_service');
    if (contactText.indexOf('@') > -1) {
      const split = contactText.split('|');
      return split
        .map((item) => {
          if (item.indexOf('@') > -1) {
            return <Link href={customer_service_page}>{item}</Link>;
          }
          return <span key={item}>{item}</span>;
        })
        .reduce((prev: JSX.Element, next: JSX.Element) =>
          prev === null ? (
            next
          ) : (
            <>
              {prev} | {next}
            </>
          )
        );
    }
    return <Link href={customer_service_page}>{contactText}</Link>;
  }

  return (
    <>
      <FullWidthBgContainer className={cn('desktop', styles.container)}>
        <div>{renderContact()}</div>
        <div>
          {t('service_bar_free_shipping')} {shipping_threshold}
        </div>
        <StoreSwitchControl />
      </FullWidthBgContainer>
      {isStoreSwitcherOpen && renderMenu()}
    </>
  );
}

export default ServiceBar;
