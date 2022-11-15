import React, { FC } from 'react';
import Typography from 'src/components/_shared/Typography';
import ProductResultCard from '../ProductsResultBlock/ProductResultCard';
import Grid from 'src/components/_shared/Grid';
import isEmpty from 'lodash.isempty';
import Link from 'src/components/_shared/Link';
import { useMicrocopyTranslations } from 'src/hooks/useTranslations';
import { SearchProductsResultItemProps, SearchProductsResultProps } from 'lib/api/foodspring/searchProducts/Types';
import classes from './index.module.css';
import useHrefWithLang from 'src/hooks/useHrefWithLang';

export interface SearchProductsResultBlockProps {
  data: SearchProductsResultProps;
  target: string;
  onProductClick: (product: SearchProductsResultItemProps) => void;
}

const ProductsResultBlock: FC<SearchProductsResultBlockProps> = ({ data, target, onProductClick }) => {
  const t = useMicrocopyTranslations();
  const href = useHrefWithLang()(target);

  if (isEmpty(data.items)) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.headlineWrapper}>
        <Typography className={classes.cardHeadline} tag="h4">
          {`${t('search_products')}  (${data.total})`}
        </Typography>
        <Link className={classes.allResults} href={href}>
          {t('linklabel_seeall')}
        </Link>
      </div>
      <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="stretch">
        {data.items?.map((item, index) => {
          return (
            <Grid item xs={12} sm={6} key={index}>
              <ProductResultCard product={item} onProductClick={onProductClick} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ProductsResultBlock;
