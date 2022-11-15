import React, { FC, useCallback } from 'react';
import { HabitsBlockProps } from '../';
import Grid from 'src/components/_shared/Grid';
import StepSlider from 'src/components/_common/StepSlider';
import BlockContainer from 'src/components/_common/BlockContainer';
import IntroBlock from '../IntroBlock';
import SliderItem from './SliderItem';
import { trackEvent, trackPromotionImpression } from 'src/tracking';
import isEmpty from 'lodash.isempty';
import classes from './index.module.css';

const HabitsBlockMobile: FC<HabitsBlockProps> = ({ data }) => {
  const { primary, items } = data;
  const { intro_title, intro_author, intro_content, tracking_category } = primary;

  const onDotClickHandler = useCallback(
    (index) => {
      trackEvent({
        action: 'click',
        category: `${tracking_category}`,
        label: `Step ${index + 1} - ${items[index].type}`,
      });
    },
    [items, tracking_category]
  );

  const onSwipeHandler = useCallback(
    (index) => {
      trackEvent({
        action: 'swipe',
        category: `${tracking_category}`,
        label: `Slide ${index + 1} - ${items[index].type}`,
      });
    },
    [items, tracking_category]
  );

  const handleImpression = useCallback(
    (index) => {
      const { tracking_id, tracking_name, tracking_creative } = items[index];
      trackPromotionImpression({
        id: tracking_id,
        name: tracking_name,
        creative: tracking_creative,
        position: `${index + 1}`,
      });
    },
    [items]
  );

  if (isEmpty(items)) {
    return null;
  }

  const titles = items.map((item) => item.headline);

  return (
    <div className={classes.container} data-cy="editorial-block-box">
      <BlockContainer>
        <Grid container direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} className={classes.introBlock}>
            <IntroBlock title={intro_title} author={intro_author} content={intro_content} />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.dotsWrapper} />
            <div style={{ height: 'max-content' }}>
              <StepSlider
                dotsPlace="above"
                navTitleTag="h5"
                titles={titles}
                isTitleAbove={true}
                className={classes.dotsContainer}
                parentClassName={classes.container}
                onImpression={handleImpression}
                onDotClick={onDotClickHandler}
                onSwipe={onSwipeHandler}
              >
                {items.map((item, index) => (
                  <div key={index}>
                    <SliderItem data={item} position={`${index + 1}`} />
                  </div>
                ))}
              </StepSlider>
            </div>
          </Grid>
        </Grid>
      </BlockContainer>
    </div>
  );
};

export default HabitsBlockMobile;
