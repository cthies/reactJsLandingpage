import React, { FC, useCallback } from 'react';
import Slideritem from './SliderItem';
import Typography from 'src/components/_shared/Typography';
import BaseStepSlider from 'src/components/_common/StepSlider';
import styles from './index.module.css';
import { useDeviceType } from 'src/hooks/useDeviceType';
import BlockContainer from 'src/components/_common/BlockContainer';
import { trackEvent, trackPromotionImpression } from 'src/tracking';
import { HomePageStepSliderSlice } from 'lib/api/content/getHomePageData/Types';

export interface StepSlider {
  data: HomePageStepSliderSlice;
}

const StepSlider: FC<StepSlider> = ({ data }) => {
  const { primary, items } = data;
  const { title, tracking_category } = primary;

  const deviceType = useDeviceType();
  const titles = data?.items.map((item) => item.title);
  const onImpressionHandler = useCallback(
    (index: number) => {
      trackPromotionImpression({
        id: items[index]?.tracking_id,
        name: items[index]?.tracking_name,
        creative: items[index]?.tracking_creative,
        position: `${index + 1}`,
      });
    },
    [items]
  );

  const onDotsClickHandler = useCallback(
    (index: number) => {
      trackEvent({
        action: 'click',
        category: tracking_category,
        label: `Step ${index + 1}`,
      });
    },
    [tracking_category]
  );

  const onSwipeHandler = useCallback(
    (index: number) => {
      trackEvent({
        action: 'swipe',
        category: tracking_category,
        label: `Slide ${index + 1}`,
      });
    },
    [tracking_category]
  );

  return (
    <BlockContainer data-cy="step-slider-block">
      <Typography tag="h4" className={styles.titleContainer} data-cy="step-slider-block-title">
        {title}
      </Typography>
      {deviceType === 'mobile' && <div className={styles.dotsWrapper} />}
      <div style={{ height: 'max-content' }}>
        <BaseStepSlider
          dotsPlace={deviceType === 'desktop' ? 'under' : 'above'}
          navTitleTag={deviceType === 'desktop' ? 'h6' : undefined}
          titles={titles}
          parentClassName={styles.container}
          className={styles.dotsContainer}
          onImpression={onImpressionHandler}
          onDotClick={onDotsClickHandler}
          onSwipe={onSwipeHandler}
        >
          {items.map((item, index) => (
            <Slideritem key={index} data={item} position={`${index + 1}`} />
          ))}
        </BaseStepSlider>
      </div>
      {deviceType === 'desktop' && <div className={styles.dotsWrapper} />}
    </BlockContainer>
  );
};

export default StepSlider;
