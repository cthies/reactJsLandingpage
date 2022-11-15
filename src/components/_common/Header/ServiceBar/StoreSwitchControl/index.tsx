import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.css';
import { setStoreSwitcherIsOpen, selectIsStoreSwitcherOpen, selectCurrentStore } from 'src/store/slices/head';
import { useCallback } from 'react';
import { useMicrocopyTranslations } from 'src/hooks/useTranslations';

function StoreSwitchControl(): JSX.Element {
  const t = useMicrocopyTranslations();
  const isStoreSwitcherOpen = useSelector(selectIsStoreSwitcherOpen);

  const currentStore = useSelector(selectCurrentStore);
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(setStoreSwitcherIsOpen(!isStoreSwitcherOpen));
  }, [dispatch, isStoreSwitcherOpen]);

  const countryCode = currentStore?.code?.substr(3, 2);

  return (
    <div>
      <a className={styles.control} onClick={handleClick} onKeyDown={handleClick} role="button" tabIndex={-1}>
        <img
          src={`https://d23o500odzh64r.cloudfront.net/media/wysiwyg/icons/flags/store-${countryCode}.png`}
          alt={t('service_bar_country_language')}
          width="18"
          height="18"
        />
        {t('service_bar_country_language')}
      </a>
    </div>
  );
}

export default StoreSwitchControl;
