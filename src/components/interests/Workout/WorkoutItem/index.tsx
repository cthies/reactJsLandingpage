import React, { FC } from 'react';
import Grid from 'src/components/_shared/Grid';
import Image from 'next/image';
import Typography from 'src/components/_shared/Typography';
import Icon from 'src/components/_shared/Icon';
import Link from 'src/components/_shared/Link';
import { InterestLandingPageWorkoutItem } from 'lib/api/content/getInterestPage/Types';
import PromotionTrackingElement from 'src/components/_tracking/PromotionTrackingElement';
import Badge from 'src/components/_shared/Badge';
import classes from './index.module.css';

interface WorkoutItemProps {
  data: InterestLandingPageWorkoutItem;
  isMobileStyle: boolean;
  position: string;
}

const WorkoutItem: FC<WorkoutItemProps> = ({ data, isMobileStyle, position }) => {
  const { image, title, subtitle, url, time, difficulty, difficulty_label } = data;

  return (
    <Grid item xs={12} md={!isMobileStyle ? 6 : 12} className={classes.itemWrapper}>
      <PromotionTrackingElement
        promoId={data.tracking_id}
        promoName={data.tracking_name}
        promoCreative={data.tracking_creative}
        promoPosition={position}
      >
        <Link href={url} className={classes.clickArea}>
          <Grid
            container
            direction={isMobileStyle ? 'row' : 'column'}
            justifyContent="space-around"
            alignItems="stretch"
            wrap="nowrap"
          >
            <Grid item xs={5} md={!isMobileStyle ? 12 : 5} className={classes.imageBlock}>
              <Image
                src={image}
                alt={title}
                title={title}
                layout="fill"
                objectFit="cover"
                loading={'eager'}
                className={classes.image}
              />
            </Grid>
            <Grid
              item
              xs={7}
              md={!isMobileStyle ? 12 : 7}
              container
              direction="column"
              justifyContent="space-around"
              alignItems="flex-start"
              wrap="nowrap"
              className={classes.textBlock}
            >
              <Grid item xs={12} className={classes.titleContainer}>
                <Typography tag="h5">{title}</Typography>
              </Grid>
              <Grid item xs={12} className={classes.textContainer}>
                <Typography tag="body-s" className={classes.description}>
                  {subtitle}
                </Typography>
              </Grid>
              <Grid
                item
                xs={8}
                md={12}
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className={classes.iconContainer}
                wrap={!isMobileStyle ? 'nowrap' : 'wrap'}
              >
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent={!isMobileStyle ? 'flex-end' : undefined}
                  md={6}
                  className={classes.badgeWrapper}
                >
                  <Badge type={difficulty}>
                    <Typography tag="body-xs">{difficulty_label}</Typography>
                  </Badge>
                </Grid>
                <Grid item xs={12} md={6} container direction="row" justifyContent="flex-start" alignItems="center">
                  <Icon name="timeClock" />
                  <Typography tag="body-xs">{time}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Link>
      </PromotionTrackingElement>
    </Grid>
  );
};

export default WorkoutItem;
