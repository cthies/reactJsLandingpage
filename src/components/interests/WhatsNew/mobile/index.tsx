import React, { useCallback } from 'react';
import WhatsNewItem from 'src/components/interests/WhatsNew/WhatsNewItem';
import BaseStepSlider from 'src/components/_common/StepSlider';
import Typography from 'src/components/_shared/Typography';
import styles from './index.module.css';
import { InterestLandingPageWhatsNewSlice } from 'lib/api/content/getInterestPage/Types';
import { trackEvent, trackPromotionImpression } from 'src/tracking';
import isEmpty from 'lodash.isempty';

type Props = {
  data: InterestLandingPageWhatsNewSlice;
};

function Mobile(props: Props): JSX.Element | null {
  const { primary, items } = props.data;

  const titles: string[] = (items || []).map((item) => item.title);
  const trackingData = (items || []).map((item, index) => {
    return {
      creative: item.tracking_creative,
      name: item.tracking_name,
      id: item.tracking_id,
      position: `${index + 1}`,
    };
  });

  const onImpressionHandler = useCallback(
    (index: number) => {
      trackPromotionImpression({ ...trackingData[index] });
    },
    [trackingData]
  );

  const onDotsClickHandler = useCallback(
    (index: number) => {
      trackEvent({
        action: 'click',
        category: primary.tracking_category,
        label: `Step ${index + 1}`,
      });
    },
    [primary.tracking_category]
  );

  const onSwipeHandler = useCallback(
    (index: number) => {
      trackEvent({
        action: 'swipe',
        category: primary.tracking_category,
        label: `Slide ${index + 1}`,
      });
    },
    [primary.tracking_category]
  );

  if (isEmpty(items)) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Typography tag="h4" theme="dark">
        {primary.title}
      </Typography>
      <BaseStepSlider
        dotsPlace="under"
        navTheme="dark"
        titles={titles}
        parentClassName=""
        className={styles.slider}
        onImpression={onImpressionHandler}
        onDotClick={onDotsClickHandler}
        onSwipe={onSwipeHandler}
      >
        {items.map((item, index) => (
          <WhatsNewItem key={index} item={item} position={`${index + 1}`} usedImpression={false} titleTag="h3" />
        ))}
      </BaseStepSlider>
    </div>
  );
}

export default Mobile;
