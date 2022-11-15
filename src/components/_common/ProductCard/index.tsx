import React, { FC } from 'react';
import Grid from 'src/components/_shared/Grid';
import Typography from 'src/components/_shared/Typography';
import Link from 'src/components/_shared/Link';
import Image from 'next/image';
import CurrencyPrice from 'src/components/_common/CurrencyPrice';
import Button from 'src/components/_shared/Button';
import AddToCart from 'src/components/_common/AddToCart';
import ProductTrackingElement from 'src/components/_tracking/ProductTrackingElement';
import { useMicrocopyTranslations } from 'src/hooks/useTranslations';
import { Product } from 'lib/api/foodspring/getProduct/Types';
import useHrefWithLang from 'src/hooks/useHrefWithLang';
import classes from './index.module.css';

interface ProductCardProps {
  product?: Product;
  position: string;
  list: string;
  className?: string;
}

const ProductCard: FC<ProductCardProps> = ({ product, className, position, list }) => {
  const t = useMicrocopyTranslations();
  const productHref = useHrefWithLang()(product?.url_path);
  const isOutOfStock = Number(product?.is_disable_for_sale) !== 0;

  if (!product) {
    console.warn('ProductCard: product cannot be empty!');
    return null;
  }

  return (
    <div className={`${classes.mainContainer} ${className}`}>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        wrap="nowrap"
        className={classes.cardWrapper}
      >
        <Link href={productHref} className={classes.clickArea} data-cy="bestsellers-link">
          <ProductTrackingElement variant="click" product={product} list={list} position={position}>
            <Grid item xs={12} className={classes.imageBlock}>
              <div className={classes.imageWrapper}>
                <Image
                  src={product.image}
                  alt={product.name}
                  title={product.name}
                  layout="fill"
                  objectFit="contain"
                  data-cy="bestsellers-image"
                />
              </div>
            </Grid>
          </ProductTrackingElement>
        </Link>
        <Grid
          item
          xs={12}
          container
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          wrap="nowrap"
          className={classes.textBlock}
        >
          <Grid item xs={12} container direction="column" justifyContent="flex-end" className={classes.title}>
            <Typography tag="h5" data-cy="bestsellers-product-name">
              {product.name}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.subTitle}>
            {product.taste && (
              <Typography>
                {t('product_flavor')} {product.taste}
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            className={classes.contentWrapper}
          >
            <Grid item xs={5} container direction="column-reverse" justifyContent="space-between">
              <CurrencyPrice price={product.special_price ?? product.price} data-cy="bestsellers-price" />
              {product.special_price && (
                <CurrencyPrice
                  price={product.price}
                  className={classes.oldPrice}
                  data-cy="bestsellers-price-strikeout"
                />
              )}
            </Grid>
            <Grid item xs={7} container direction="column" justifyContent="flex-end" alignItems="flex-end">
              <Typography tag="body-xs">{product.egg_product_recommended_dosage}</Typography>
              <Typography tag="body-xs">{product.unit_price}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.buttonBlock}>
          {isOutOfStock ? (
            <Button disabled={true}>{t('product_disabled')}</Button>
          ) : (
            <ProductTrackingElement
              variant="addToCart"
              product={product}
              list={list}
              position={position}
              quantity="1"
              disableImpressions={true}
            >
              <AddToCart productId={product.id} productHref={productHref} />
            </ProductTrackingElement>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductCard;
