import React, { FC } from 'react';
import Slider from 'react-slick';
import { SearchSuggestionContentSlice } from 'lib/api/content/getSearchSuggestions/Types';
import ContentCard from './ContentCard';
import Typography from 'src/components/_shared/Typography';
import styles from './index.module.css';
import isEmpty from 'lodash.isempty';

export interface ContentSliderProps {
  data: SearchSuggestionContentSlice;
}

const ContentSlider: FC<ContentSliderProps> = ({ data }) => {
  const { title } = data.primary;

  if (isEmpty(data.items)) {
    return null;
  }

  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 0,
    swipeToSlide: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 1,
          initialSlide: 1,
          swipeToSlide: true,
        },
      },
    ],
    className: styles.container,
  };
  return (
    <div className={styles.wrapper}>
      <Typography tag="h4">{title}</Typography>
      <div className={styles.slider}>
        <Slider {...settings}>
          {data.items.map((item, index) => (
            <ContentCard key={index} {...item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ContentSlider;
