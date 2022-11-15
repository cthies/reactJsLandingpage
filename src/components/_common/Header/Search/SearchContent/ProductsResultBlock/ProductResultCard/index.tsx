import React, { FC, useCallback } from 'react';
import Typography from 'src/components/_shared/Typography';
import Grid from 'src/components/_shared/Grid';
import Link from 'src/components/_shared/Link';
import CurrencyPrice from 'src/components/_common/CurrencyPrice';
import { SearchProductsResultItemProps } from 'lib/api/foodspring/searchProducts/Types';
import classes from './index.module.css';
import useHrefWithLang from 'src/hooks/useHrefWithLang';

interface Props {
  product: SearchProductsResultItemProps;
  onProductClick: (product: SearchProductsResultItemProps) => void;
}
const ProductResultCard: FC<Props> = ({ product, onProductClick }) => {
  const { title, link, discount, priceOld, priceNew, image } = product;
  const href = useHrefWithLang()(link);

  const onProductClickHandler = useCallback(() => {
    onProductClick(product);
  }, [onProductClick, product]);

  return (
    <div className={classes.blockWrapper}>
      <Link href={href} style={{ textDecoration: 'none' }} onClick={onProductClickHandler}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          wrap="nowrap"
          className={classes.container}
        >
          <Grid item xs={4} className={classes.imageBlock}>
            <img src={image} alt={title} title={title} className={classes.image} />
          </Grid>
          <Grid item xs={5}>
            <Typography>{title}</Typography>
          </Grid>
          <Grid item xs={3} className={classes.priceBlock}>
            {discount && priceOld && <CurrencyPrice price={priceOld} className={classes.discount} />}
            <CurrencyPrice price={priceNew} />
          </Grid>
        </Grid>
      </Link>
    </div>
  );
};

export default ProductResultCard;
