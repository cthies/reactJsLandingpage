import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectLanguage, selectCountry } from 'src/store/slices/ui';
import Typography, { TypographyProps } from 'src/components/_shared/Typography';

export interface CurrencyPriceProps extends TypographyProps {
  price: string | number;
}

const priceFormat: {
  [key: string]: string;
} = {
  uk: '£%d',
  at: '%d €',
  de: '%d €',
  be: '%d €',
  dk: '%dkr',
  fi: '%d €',
  fr: '%d €',
  it: '%d €',
  nl: '€ %d',
  pl: '%d PLN',
  sp: '%d €',
  se: '%dkr',
  ch: 'CHF%d',
  es: '%d €',
};

const CurrencyPrice: FC<CurrencyPriceProps> = ({ price, ...rest }) => {
  const lang = useSelector(selectLanguage);
  const region = useSelector(selectCountry);
  const locale = `${lang}-${region}`;

  const priceNumericValue = new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: Number(price) % 1 === 0 ? 0 : 2,
    maximumFractionDigits: Number(price) % 1 === 0 ? 0 : 2,
  }).format(Number(price));

  const formattedPrice = priceFormat[region]?.replace('%d', String(priceNumericValue)) ?? priceNumericValue;

  return <Typography {...rest}>{formattedPrice}</Typography>;
};

export default CurrencyPrice;
