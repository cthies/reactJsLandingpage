import React, { FC } from 'react';
import BaseRating from 'src/components/_shared/BaseRating';
import Typography from 'src/components/_shared/Typography';
import classes from './index.module.css';

interface RatingProps {
  value?: number;
  count?: number;
}

const Rating: FC<RatingProps> = ({ value = 0, count = 0 }) => {
  return (
    <div className={classes.ratingContainer}>
      <BaseRating ratingValue={value} maxValue={5} size={16} iconsCount={5} />
      <Typography className={classes.bold} tag="body-xs">
        {value}/5
      </Typography>
      <Typography className={classes.reviewCount} tag="body-xs">
        {count} customer reviews
      </Typography>
    </div>
  );
};

export default Rating;
