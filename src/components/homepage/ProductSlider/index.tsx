import React, { useMemo } from 'react';

import Slider, { Settings } from 'react-slick';
import { useWindowSize } from 'src/hooks/useWindowSize';
import ProductCard from 'src/components/_common/ProductCard';
import ArrowComponent from 'src/components/_shared/Arrow';
import Typography from 'src/components/_shared/Typography';
import { useDeviceType } from 'src/hooks/useDeviceType';
import BlockContainer from 'src/components/_common/BlockContainer';
import { HomePageBestSellersSlice } from 'lib/api/content/getHomePageData/Types';
import styles from './index.module.css';
import isEmpty from 'lodash.isempty';

interface ProductSliderProps {
  data: HomePageBestSellersSlice;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ data }): JSX.Element | null => {
  const { width } = useWindowSize();
  const deviceType = useDeviceType();

  const { items, primary } = data;

  const settings: Settings = useMemo(() => {
    return {
      className: styles.container,
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 5,
      swipeToSlide: true,
      speed: 500,
      arrows: deviceType !== 'mobile',
      nextArrow: <ArrowComponent direction="right" size={28} data-cy="bestsellers-arrow-next" />,
      prevArrow: <ArrowComponent direction="left" size={28} data-cy="bestsellers-arrow-prev" />,
      responsive: [
        {
          breakpoint: 1420,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 3.5,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2.5,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1.5,
            slidesToScroll: 1,
            speed: 500,
          },
        },
      ],
    };
  }, [deviceType, items.length, width]);

  if (isEmpty(items)) {
    return null;
  }

  return (
    <BlockContainer data-cy="bestsellers-block">
      <div className={styles.title} data-cy="bestsellers-block-title">
        <Typography tag="h4">{primary.title}</Typography>
      </div>
      <Slider {...settings}>
        {items.map((item, index) => (
          <ProductCard
            key={index}
            className={styles.wrapper}
            product={item.product}
            list={primary.tracking_list}
            position={`${index + 1}`}
          />
        ))}
      </Slider>
    </BlockContainer>
  );
};

export default ProductSlider;
