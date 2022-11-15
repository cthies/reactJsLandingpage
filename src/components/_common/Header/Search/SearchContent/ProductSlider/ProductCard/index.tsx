import React, { FC } from 'react';
import { SearchSuggestionProductItemType } from 'lib/api/content/getSearchSuggestions/Types';
import Image from 'next/image';
import Typography from 'src/components/_shared/Typography';
import Link from 'src/components/_shared/Link';
import Grid from 'src/components/_shared/Grid';
import classes from './index.module.css';

const ProductCard: FC<SearchSuggestionProductItemType> = ({ title, link, image }) => {
  return (
    <Link href={link} className={classes.clickArea}>
      <div className={classes.cardWrapper}>
        <Grid container direction="column" justifyContent="space-between" alignItems="stretch">
          <Grid item xs={12} className={classes.imageContainer}>
            <div className={classes.imageWrapper}>
              <Image src={image} alt={title} title={title} layout="fill" objectFit="contain" />
            </div>
          </Grid>
          <Grid item xs={12} className={classes.titleContainer}>
            <Typography tag="body-s">{title}</Typography>
          </Grid>
        </Grid>
      </div>
    </Link>
  );
};

export default ProductCard;
