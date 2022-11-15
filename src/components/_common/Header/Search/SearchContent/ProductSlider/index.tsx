import React, { FC } from 'react';
import Slider from 'react-slick';
import Typography from 'src/components/_shared/Typography';
import ProductCard from './ProductCard';
import styles from './index.module.css';
import { SearchSuggestionProductSlice } from 'lib/api/content/getSearchSuggestions/Types';
import isEmpty from 'lodash.isempty';

export interface ProductSliderProps {
  data: SearchSuggestionProductSlice;
}

const ProductSlider: FC<ProductSliderProps> = ({ data }) => {
  const { title } = data.primary;

  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 0,
    swipeToSlide: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          initialSlide: 1,
          swipeToSlide: true,
        },
      },
    ],
    className: styles.container,
  };

  if (isEmpty(data.items)) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Typography tag="h4">{title}</Typography>
      <div className={styles.slider}>
        <Slider {...settings}>
          {data.items.map((item, index) => (
            <ProductCard key={index} {...item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;
//
