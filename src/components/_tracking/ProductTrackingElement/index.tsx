import { Product } from 'lib/api/foodspring/getProduct/Types';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectConfig } from 'src/store/slices/config';
import { ProductTrackingOptions, trackProductClick, trackProductImpression, trackAddToBasket } from 'src/tracking';
import TrackingElement from '../_TrackingElement';

interface Props {
  className?: string;
  variant: 'click' | 'addToCart';
  product?: Product;
  position?: string | number;
  list?: string;
  quantity?: string;
  disableImpressions?: boolean;
}

const ProductTrackingElement: React.FC<Props> = ({ product, children, ...rest }) => {
  if (!product) {
    console.warn('ProductTrackingElement: product is empty');
    return <>{children}</>;
  } else {
    return (
      <ProductTracker product={product} {...rest}>
        {children}
      </ProductTracker>
    );
  }
};

const ProductTracker: React.FC<Props & { product: Product }> = ({
  className,
  children,
  variant,
  product,
  list,
  position,
  quantity,
  disableImpressions,
}) => {
  const config = useSelector(selectConfig);

  const options = useMemo(() => {
    const pTrackingOptions: ProductTrackingOptions = {
      currency: config.currency_code,
      name: product?.name,
      id: product?.parent_sku ?? product?.sku, // sku of configurable or simple
      price: product?.special_price ?? product?.price,
      position, // position in product list
      list, // product list
      dimension9: product?.dimension9, // discount cluster
      dimension10: product?.dimension10, // has discount
      dimension11: product?.dimension11, // availability
      dimension12: product?.dimension12, // product type
      dimension13: product?.dimension13, // single vs bundle
      dimension14: product?.dimension14, // simple sku
      dimension15: product?.dimension15, // subscription for regular delivery
    };

    if (product?.taste) {
      pTrackingOptions.variant = product?.taste; // taste
    }

    if (product?.special_price) {
      pTrackingOptions.metric1 = product?.price; // original price
    }
    return pTrackingOptions;
  }, [config.currency_code, list, position, product, quantity]);

  const handleImpression = useCallback(() => {
    trackProductImpression(options);
  }, [options]);

  const handleClick = useCallback(() => {
    switch (variant) {
      case 'click': {
        trackProductClick(options);
        break;
      }
      case 'addToCart': {
        options.quantity = quantity;
        trackAddToBasket(options);
        break;
      }
    }
  }, [options, variant]);

  return (
    <TrackingElement
      className={className}
      onClick={handleClick}
      onImpression={disableImpressions ? undefined : handleImpression}
    >
      {children}
    </TrackingElement>
  );
};

export default ProductTrackingElement;
