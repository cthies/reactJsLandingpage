import React, { FC } from 'react';
import Typography from 'src/components/_shared/Typography';
import Grid from 'src/components/_shared/Grid';
import Link from 'src/components/_shared/Link';
import BlockContainer from 'src/components/_common/BlockContainer';
import { DeviceType, DeviceOrientation } from 'src/hooks/useDeviceTypeWatcher';
import Button from 'src/components/_shared/Button';
import classes from './index.module.css';

export interface HeaderItemProps {
  title: string;
  text: string;
  buttonTitle: string;
  buttonUrl: string;

  type: DeviceType | null;
  orientation: DeviceOrientation | null;
  theme: 'light' | 'dark';
}

const HeaderItem: FC<HeaderItemProps> = (props) => {
  const { title, text, buttonTitle, buttonUrl, type, theme, orientation } = props;

  const itemWrapperClassName =
    type === 'mobile' && orientation !== 'landscape' ? classes.itemWrapperSmall : classes.itemWrapper;

  return (
    <div>
      <Link href={buttonUrl} className={classes.linkStyle} data-cy="hero-slider-link">
        <div>
          <BlockContainer className={classes.root}>
            <Grid
              container
              spacing={3}
              direction="column"
              wrap="nowrap"
              justifyContent="flex-end"
              alignItems={type === 'desktop' || orientation === 'landscape' ? 'flex-start' : 'center'}
              className={classes.contentContainer}
            >
              <Grid
                item
                xs={12}
                sm={type === 'mobile' && orientation === 'landscape' ? 5 : 12}
                md={5}
                lg={6}
                xl={5}
                className={`${itemWrapperClassName} ${type === 'mobile' ? classes.headerContainer : ''}`}
              >
                <Typography tag="h1" theme={theme} className={classes.title} data-cy="hero-slider-title">
                  {title}
                </Typography>
              </Grid>
              {type === 'desktop' && (
                <Grid item xs={12} md={5} lg={5} className={itemWrapperClassName}>
                  <Typography tag="body-l" theme={theme} className={classes.subTitle} data-cy="hero-slider-subtitle">
                    {text}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={6} sm={4} md={3} lg={2} className={`${itemWrapperClassName} ${classes.btnContainer}`}>
                <Button component="span" theme={theme} data-cy="hero-slider-button">
                  {buttonTitle}
                </Button>
              </Grid>
            </Grid>
          </BlockContainer>
        </div>
      </Link>
    </div>
  );
};

export default HeaderItem;
