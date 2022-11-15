import React, { FC, ReactNode } from 'react';
import Grid from 'src/components/_shared/Grid';
import Image from 'next/image';
import Link from 'src/components/_shared/Link';
import Badge from 'src/components/_shared/Badge';
import Icon, { IconProps } from 'src/components/_shared/Icon';
import Typography, { TypographyProps } from 'src/components/_shared/Typography';
import PromotionTrackingElement from 'src/components/_tracking/PromotionTrackingElement';
import classes from './index.module.css';

interface CardProps {
  item: {
    link: string;
    image: string;
    title: string;
    time: string;
    tag?: string;
    tracking?: {
      id: string;
      name: string;
      creative: string;
      position: string;
    };
  };
  iconName?: IconProps['name'];
  children?: ReactNode;
  className?: string;
  badgeBgColor?: string;
  badgeTheme?: TypographyProps['theme'];
}

const ContendCard: FC<CardProps> = ({ item, iconName, className, badgeBgColor, badgeTheme }) => {
  const {
    link,
    image,
    title,
    time,
    tag,
    tracking = { id: 'test', name: 'Test', creative: 'Test', position: '1' },
  } = item;

  return (
    <div className={`${classes.mainContainer} ${className}`}>
      <PromotionTrackingElement
        promoId={tracking.id}
        promoName={tracking.name}
        promoCreative={tracking.creative}
        promoPosition={tracking.position}
      >
        <div className={classes.cardWrapper}>
          <Link href={link} className={classes.clickArea}>
            <Grid container direction="column" alignItems="stretch" wrap="nowrap">
              <Grid item xs={12} className={classes.imageBlock}>
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
                xs={12}
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

                <Grid
                  item
                  xs={12}
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  className={classes.iconContainer}
                  wrap="wrap-reverse"
                >
                  <Grid item xs={7} container direction="row" justifyContent="flex-start" alignItems="center">
                    <Icon name={iconName || 'timeClock'} className={classes.icon} />
                    <Typography tag="body-xs">{time}</Typography>
                  </Grid>
                  {tag && (
                    <Grid item xs={12} className={classes.badgeWrapper}>
                      <Badge className={classes.badge} color={badgeBgColor}>
                        <Typography tag="body-xs" theme={badgeTheme || 'light'}>
                          {tag}
                        </Typography>
                      </Badge>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Link>
        </div>
      </PromotionTrackingElement>
    </div>
  );
};

export default ContendCard;
