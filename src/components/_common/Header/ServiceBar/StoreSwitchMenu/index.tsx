import styles from './index.module.css';
import cn from 'src/utils/cn';
import { useSelector } from 'react-redux';
import { selectCurrentCountry, selectCurrentStore, selectStoreSwitcherCountries } from 'src/store/slices/head';
import { ChangeEvent, useState, useCallback } from 'react';

const StoreSwitchMenu: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState(useSelector(selectCurrentCountry));
  const [selectedStore, setSelectedStore] = useState(useSelector(selectCurrentStore));

  const countries = useSelector(selectStoreSwitcherCountries);

  const handleCountrySelection = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const country = countries.find((c) => c.name === e?.target?.value);
      if (country) {
        setSelectedCountry(country);
        setSelectedStore(country.stores[0]);
      } else {
        console.error(`Country not found by name ${e?.target?.value}`);
      }
    },
    [countries]
  );

  const handleStoreSelection = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const store = selectedCountry?.stores.find((s) => s.store_id === e?.target?.value);
      if (store) {
        setSelectedStore(store);
      } else {
        console.error(`Store not found by store_id ${e?.target?.value}`);
      }
    },
    [selectedCountry]
  );

  return (
    <div className={styles.menu}>
      <label htmlFor="country_selector">Choose your country</label>
      <div className={cn('styled-select', styles.selectContainer, styles.selectCountry)}>
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select id="country_selector" onChange={handleCountrySelection}>
          {countries.map((country) => {
            return (
              <option key={country.name} value={country.name} selected={selectedCountry?.name === country.name}>
                {country.name}
              </option>
            );
          })}
        </select>
      </div>

      <label htmlFor="language_selector">and your language:</label>
      <div className={cn('styled-select', styles.selectContainer, styles.selectLanguage)}>
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select id="language_selector" onChange={handleStoreSelection}>
          {selectedCountry?.stores?.map(({ language, store_id }) => {
            return (
              <option key={store_id} value={store_id} selected={selectedStore?.store_id === store_id}>
                {language}
              </option>
            );
          })}
        </select>
      </div>

      <a href={`https://${selectedStore?.url}`} className="btn btn-primary margin-default-right">
        Confirm
      </a>
    </div>
  );
};

export default StoreSwitchMenu;
