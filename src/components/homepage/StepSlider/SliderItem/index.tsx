import React, { FC } from 'react';
import Image from 'next/image';
import Grid from 'src/components/_shared/Grid';
import Link from 'src/components/_shared/Link';
import Typography from 'src/components/_shared/Typography';
import PromotionTrackingElement from 'src/components/_tracking/PromotionTrackingElement';
import { useDeviceType } from 'src/hooks/useDeviceType';
import { HomePageStepSliderItemType } from 'lib/api/content/getHomePageData/Types';
import Button from 'src/components/_shared/Button';
import classes from './index.module.css';

interface SlideritemProps {
  data: HomePageStepSliderItemType;
  position: string;
}

const Slideritem: FC<SlideritemProps> = ({ data, position }) => {
  const deviceType = useDeviceType();

  const {
    title,
    text,
    image_desktop_url,
    image_mobile_url,
    cta_title,
    cta_url,
    tracking_id,
    tracking_creative,
    tracking_name,
  } = data;

  return (
    <div className={classes.root} data-cy="step-slider-card">
      <PromotionTrackingElement
        promoId={tracking_id}
        promoName={tracking_name}
        promoCreative={tracking_creative}
        promoPosition={position}
        useImpression={false}
      >
        <Link href={cta_url} style={{ textDecoration: 'none' }} data-cy="step-slider-card-link">
          <Grid container direction="row" justifyContent="flex-start" alignItems="stretch">
            <Grid item xs={12} md={6} className={classes.imageBlock}>
              <Image
                src="https://d23o500odzh64r.cloudfront.net/media/wysiwyg/shop-next/homepage/top_categories/210819_ONSITE_New_home_page_Part_1_01_Top_categories_Mobile_690x332_Bars.jpg"
                // TODO fix mockData src={deviceType === 'mobile' ? image_mobile_url : image_desktop_url}
                alt={title}
                title={title}
                layout="fill"
                objectFit="cover"
                loading={'eager'}
                className={classes.image}
                data-cy="step-slider-card-image"
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              container
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              className={classes.textBlock}
            >
              <Grid item className={classes.titleContainer}>
                <Typography tag="h3" data-cy="step-slider-card-title">
                  {title}
                </Typography>
              </Grid>
              <Grid item className={classes.textContainer}>
                <Typography data-cy="step-slider-card-content">{text}</Typography>
              </Grid>
              <Grid item xs={6} sm={5} md={5} lg={4} className={classes.btnContainer}>
                <Button mode="secondary" component="span" data-cy="step-slider-card-button">
                  {cta_title}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Link>
      </PromotionTrackingElement>
    </div>
  );
};

export default Slideritem;
