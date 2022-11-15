import React, { FC } from 'react';
import { SearchSuggestionContentItemType } from 'lib/api/content/getSearchSuggestions/Types';
import Typography from 'src/components/_shared/Typography';
import Grid from 'src/components/_shared/Grid';
import Link from 'src/components/_shared/Link';
import Image from 'next/image';
import classes from './index.module.css';

const ContentCard: FC<SearchSuggestionContentItemType> = (item) => {
  const { badge, title, image, link, first_label, second_label } = item;
  return (
    <div className={classes.container}>
      <Link href={link} className={classes.clickArea}>
        <div className={classes.cardWrapper}>
          <div className={classes.badgeContainer}>
            <Typography tag="body-xs" className={classes.badge}>
              {badge}
            </Typography>
          </div>
          <Grid container direction="column" justifyContent="space-between" alignItems="center">
            <Grid item xs={12} className={classes.imageContainer}>
              <div className={classes.imageWrapper}>
                <Image
                  src={image}
                  alt={title}
                  title={title}
                  layout="fill"
                  objectFit="cover"
                  loading={'eager'}
                  className={classes.image}
                />
              </div>
            </Grid>
            <Grid item xs={12} className={classes.titleContainer}>
              <Typography tag="h6">{title}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.labelContainer}>
              <Typography tag="body-xs" className={classes.label}>
                {first_label}
                {second_label ? ` | ${second_label}` : ''}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Link>
    </div>
  );
};

export default ContentCard;
