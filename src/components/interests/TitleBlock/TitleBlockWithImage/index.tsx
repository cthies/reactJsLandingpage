import React, { FC } from 'react';
import Typography from 'src/components/_shared/Typography';
import BlockContainer from 'src/components/_common/BlockContainer';
import Grid from 'src/components/_shared/Grid';
import Image from 'next/image';
import { InterestLandingPageAnchorWithImagesSlice } from 'lib/api/content/getInterestPage/Types';
import TitleBlockItem from '../TitleBlockItem';
import { useDeviceType } from 'src/hooks/useDeviceType';
import classes from './index.module.css';

interface TitleBlockProps {
  data: InterestLandingPageAnchorWithImagesSlice;
}

const TitleBlockWithImage: FC<TitleBlockProps> = ({ data }) => {
  const { title, subtitle, image_desktop, image_mobile } = data.primary;
  const imageUrl = useDeviceType() === 'mobile' ? image_mobile : image_desktop;

  if (!imageUrl) {
    console.error('image_desktop & image_mobile is required for TitleBlockWithImage component');
    return null;
  }

  return (
    <div>
      <div className={classes.imageContainer}>
        <Image
          src={imageUrl}
          alt={title}
          title={title}
          layout="fill"
          objectFit="cover"
          objectPosition="50% 20%"
          className={classes.imageBackground}
          loading={'eager'}
        />
        <div className={classes.imageOverlay} />
        <BlockContainer style={{ position: 'absolute' }}>
          <div className={classes.titleWrapper}>
            <Typography className={classes.title} tag="h1" theme="dark">
              {title}
            </Typography>
            <Grid container direction="row" justifyContent="center" alignItems="flex-start">
              {data.items.map((item, index) => (
                <Grid key={index} item xs={6} sm={2} className={classes.btnWrapper}>
                  <TitleBlockItem {...item} />
                </Grid>
              ))}
            </Grid>
          </div>
        </BlockContainer>
      </div>
      <BlockContainer>
        <div className={classes.header}>
          {subtitle.map((s, index) => {
            return (
              <Typography key={index} className={classes.subtitle}>
                {s.text}
              </Typography>
            );
          })}
        </div>
      </BlockContainer>
    </div>
  );
};

export default TitleBlockWithImage;
