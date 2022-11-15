import React, { useMemo } from 'react';
import Slider, { Settings } from 'react-slick';
import { useWindowSize } from 'src/hooks/useWindowSize';
import ContentCard from './ContentCard';
import styles from './index.module.css';
import Typography from 'src/components/_shared/Typography';
import { useDeviceType } from 'src/hooks/useDeviceType';
import BlockContainer from 'src/components/_common/BlockContainer';
import { HomePageContentSliderSlice } from 'lib/api/content/getHomePageData/Types';

interface ContentSliderProps {
  data: HomePageContentSliderSlice;
}

const ContentSlider: React.FC<ContentSliderProps> = ({ data }): JSX.Element => {
  const { width } = useWindowSize();
  const deviceType = useDeviceType();

  const { primary, items } = data;
  const { title } = primary;

  const settings: Settings = useMemo(() => {
    return {
      className: styles.container,
      infinite: false,
      slidesToShow: deviceType === 'mobile' ? 1.5 : width ? Math.min(items.length, Math.round(width / 288)) : 4,
      slidesToScroll: 1,
      swipeToSlide: true,
      arrows: false,
    };
  }, [deviceType, items.length, width]);

  return (
    <BlockContainer data-cy={`content-block-${data.primary.type}`}>
      <div className={styles.title}>
        <Typography tag="h4" data-cy={`content-block-${data.primary.type}-title`}>
          {title}
        </Typography>
      </div>
      <Slider {...settings}>
        {items.map((item, index) => (
          <ContentCard
            key={index}
            item={item}
            isFavorite={false}
            onFavoriteClick={undefined}
            position={`${index + 1}`}
          />
        ))}
      </Slider>
    </BlockContainer>
  );
};

export default ContentSlider;
