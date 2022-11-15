import React, { FC } from 'react';
import Image from 'next/image';
import Grid from 'src/components/_shared/Grid';
import Link from 'src/components/_shared/Link';
import Typography from 'src/components/_shared/Typography';
import Icon from 'src/components/_shared/Icon';
import Rating from '../../Rating';
import PromotionTrackingElement from 'src/components/_tracking/PromotionTrackingElement';
import { HomePageEditorialItemType } from 'lib/api/content/getHomePageData/Types';
import classes from './index.module.css';

interface SlideritemProps {
  data: HomePageEditorialItemType;
  position: string;
}

const Slideritem: FC<SlideritemProps> = ({ data, position }) => {
  const {
    type,
    title,
    subtitle,
    image,
    url,
    time,
    review_rate = 0,
    review_count = 0,
    tracking_id,
    tracking_name,
    tracking_creative,
  } = data;
  return (
    <div className={classes.root}>
      <PromotionTrackingElement
        promoId={tracking_id}
        promoName={tracking_name}
        promoCreative={tracking_creative}
        promoPosition={position}
        useImpression={false}
      >
        <Link href={url} style={{ textDecoration: 'none' }} data-cy="editorial-block-card-link">
          <Grid container direction="row" justifyContent="flex-start" alignItems="stretch">
            <Grid item xs={12} sm={5} className={classes.imageBlock}>
              <Image
                src={image}
                alt={title}
                title={title}
                layout="fill"
                objectFit="cover"
                loading={'eager'}
                className={classes.image}
                data-cy="editorial-block-card-image"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={7}
              container
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
              className={classes.textBlock}
            >
              <Typography tag="h5" data-cy="editorial-block-card-title">
                {title}
              </Typography>
              <Typography className={classes.subtitle} tag="body-s" noWrap data-cy="editorial-block-card-subtitle">
                {subtitle}
              </Typography>
              {type === 'product' ? (
                <Rating value={review_rate} count={review_count} />
              ) : (
                <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                  <Icon name={type === 'article' ? 'book' : 'timeClock'} className={classes.clockIcon} />
                  <Typography tag="body-xs">{time}</Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Link>
      </PromotionTrackingElement>
    </div>
  );
};

export default Slideritem;
