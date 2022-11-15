import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'src/components/_shared/Link';
import Typography from 'src/components/_shared/Typography';
import styles from './index.module.css';
import CurrencyPrice from 'src/components/_common/CurrencyPrice';
import { InterestLandingPageProductItem } from 'lib/api/content/getInterestPage/Types';
import ProductTrackingElement from 'src/components/_tracking/ProductTrackingElement';
import AddToCart from 'src/components/_common/AddToCart';
import PromotionTrackingElement from 'src/components/_tracking/PromotionTrackingElement';
import { useMicrocopyTranslations } from 'src/hooks/useTranslations';
import cn from 'src/utils/cn';
import useHrefWithLang from 'src/hooks/useHrefWithLang';
import Button from 'src/components/_shared/Button';

interface SlideritemProps {
  data: InterestLandingPageProductItem;
  tracking_list: string;
  position: string;
}

const Slideritem: FC<SlideritemProps> = ({ data, tracking_list, position }) => {
  const {
    article_cta_label,
    article_image,
    article_subtitle,
    article_title,
    article_url,
    tracking_article_id,
    tracking_article_name,
    tracking_article_creative,
    product,
  } = data;

  const t = useMicrocopyTranslations();
  const productHref = useHrefWithLang()(product?.url_path);
  const isOutOfStock = Number(product?.is_disable_for_sale) !== 0;

  if (!product) {
    console.warn('ILP product slider item: no product data!');
    return null;
  }

  return (
    <div className={styles.container}>
      <Link href={article_url} className={styles.articleBlock}>
        <PromotionTrackingElement
          promoId={tracking_article_id}
          promoName={tracking_article_name}
          promoCreative={tracking_article_creative}
          promoPosition={position}
          className={styles.articleContainer}
        >
          <div className={`${styles.imageBlock} ${styles.articleImage}`}>
            <Image
              src={article_image}
              alt={article_title}
              title={article_title}
              layout="fill"
              objectFit="cover"
              loading={'eager'}
              className={styles.image}
            />
          </div>
          <div className={`${styles.titleWrapper}`}>
            <Typography tag="h4" className={styles.articleTitle}>
              {article_title}
            </Typography>
          </div>
          <Typography className={styles.articleSubtitle}>{article_subtitle}</Typography>
          <Typography tag="h6" className={styles.moreLink}>
            {article_cta_label}
          </Typography>
        </PromotionTrackingElement>
      </Link>
      <div className={styles.productBlock}>
        <ProductTrackingElement
          variant="click"
          className={styles.productContainer}
          product={product}
          list={tracking_list}
          position={position}
        >
          <Link href={productHref} className={styles.imageWrapper}>
            <div className={`${styles.imageBlock} ${styles.productImage}`}>
              <Image
                src={product.image}
                alt={product.name}
                title={product.name}
                layout="fill"
                objectFit="scale-down"
                loading={'eager'}
                className={styles.image}
              />
            </div>
          </Link>
          <div className={styles.contentWrapper}>
            <Typography tag="h5" className={styles.productTitle}>
              {product.name}
            </Typography>
            <div className={styles.productSubtitle}>
              {product.taste && (
                <Typography>
                  {t('product_flavor')}: {product.taste}
                </Typography>
              )}
            </div>
            <div className={styles.priceBlock}>
              <div className={styles.priceWrapper}>
                {product.special_price && (
                  <CurrencyPrice price={product.price} className={cn(styles.oldPrice, styles.price)} />
                )}
                <CurrencyPrice price={product.special_price ?? product.price} className={styles.price} />
              </div>
              <div className={styles.priceContentWrapper}>
                <Typography tag="body-xs">{product.egg_product_recommended_dosage}</Typography>
                <Typography tag="body-xs">{product.unit_price}</Typography>
              </div>
            </div>
          </div>
        </ProductTrackingElement>
        {isOutOfStock ? (
          <Button disabled={true}>{t('product_disabled')}</Button>
        ) : (
          <ProductTrackingElement
            variant="addToCart"
            product={product}
            list={tracking_list}
            position={position}
            quantity="1"
            disableImpressions={true}
          >
            <AddToCart productId={product.id} productHref={productHref} />
          </ProductTrackingElement>
        )}
      </div>
    </div>
  );
};

export default Slideritem;
