import React, { FC } from 'react';
import BlockContainer from 'src/components/_common/BlockContainer';
import { useDeviceType } from 'src/hooks/useDeviceType';
import WorkoutItem from './WorkoutItem';
import Grid from 'src/components/_shared/Grid';
import Typography from 'src/components/_shared/Typography';
import { InterestLandingPageWorkoutsSlice } from 'lib/api/content/getInterestPage/Types';
import ClickTrackingElement from 'src/components/_tracking/ClickTrackingElement';
import Button from 'src/components/_shared/Button';
import isEmpty from 'lodash.isempty';
import classes from './index.module.css';

interface Props {
  data: InterestLandingPageWorkoutsSlice;
}

const Workout: FC<Props> = ({ data }) => {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const { primary, items } = data;
  const { intro_title, intro_subtitle, cta_title, cta_url, tracking_category, tracking_cta_label } = primary;

  if (isEmpty(items)) {
    return null;
  }

  return (
    <div className={classes.wrapper} id="workouts">
      <BlockContainer>
        <Grid container direction="row" justifyContent="space-between" alignItems="stretch">
          <Grid item xs={12} sm={4} md={3} className={classes.intro}>
            <Typography tag="h3">{intro_title}</Typography>
            <Typography className={classes.subtitle}>{intro_subtitle}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={8}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
            wrap={deviceType === 'desktop' ? 'nowrap' : 'wrap'}
            className={classes.cardsWrapper}
          >
            {items.map((item, index) => (
              <WorkoutItem key={index} data={item} position={`${index + 1}`} isMobileStyle={isMobile} />
            ))}
          </Grid>
        </Grid>
        <div className={classes.footerContainer}>
          <div>
            <ClickTrackingElement category={tracking_category} label={tracking_cta_label}>
              <Button mode="tertiary" fullWidth={false} href={cta_url}>
                {cta_title}
              </Button>
            </ClickTrackingElement>
          </div>
        </div>
      </BlockContainer>
    </div>
  );
};

export default Workout;
