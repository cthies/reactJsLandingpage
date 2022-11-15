import React, { FC } from 'react';
import Image from 'next/image';
import Grid from 'src/components/_shared/Grid';
import Link from 'src/components/_shared/Link';
import Icon from 'src/components/_shared/Icon';
import Rating from '../../Rating';
import Typography from 'src/components/_shared/Typography';
import PromotionTrackingElement from 'src/components/_tracking/PromotionTrackingElement';
import { HomePageEditorialItemType } from 'lib/api/content/getHomePageData/Types';
import classes from './index.module.css';

interface ContentCardProps {
  data: HomePageEditorialItemType;
  position: string;
}

const ContentCard: FC<ContentCardProps> = ({ data, position }) => {
  const {
    type,
    title,
    subtitle,
    headline,
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
    <div className={classes.blockWrapper}>
      <PromotionTrackingElement
        promoId={tracking_id}
        promoName={tracking_name}
        promoCreative={tracking_creative}
        promoPosition={position}
      >
        <div>
          <Typography className={classes.cardHeadline} tag="h6" data-cy="editorial-block-card-headline">
            {headline}
          </Typography>
        </div>
        <Link href={url} style={{ textDecoration: 'none' }} data-cy="editorial-block-card-link">
          <Grid container direction="row" className={classes.cardBlock} alignItems="stretch" wrap="nowrap">
            <Grid item xs={4} className={classes.imageBlock}>
              <Image
                src={image}
                alt={title}
                title={title}
                layout="fill"
                objectFit="cover"
                className={classes.image}
                data-cy="editorial-block-card-image"
              />
            </Grid>
            <Grid item xs={8}>
              <Grid container justifyContent="space-between" alignItems="flex-start" className={classes.textBlock}>
                <Grid item xs={12}>
                  <Typography tag="h5" data-cy="editorial-block-card-title">
                    {title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography tag="body-s" noWrap data-cy="editorial-block-card-subtitle">
                    {subtitle}
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.iconContainer}>
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
            </Grid>
          </Grid>
        </Link>
      </PromotionTrackingElement>
    </div>
  );
};

export default ContentCard;
