import React, { FC } from 'react';
import Grid from 'src/components/_shared/Grid';
import Typography from 'src/components/_shared/Typography';
import { useDeviceType } from 'src/hooks/useDeviceType';
import classes from './index.module.css';

interface IntroBlockProps {
  title: string;
  content: string;
  author: string;
}

const IntroBlock: FC<IntroBlockProps> = ({ title, content, author }) => {
  const deviceType = useDeviceType();

  return (
    <Grid container justifyContent="space-between" alignItems="flex-start" className={classes.root}>
      <Grid item xs={12} className={classes.itemWrapper}>
        <Typography tag="h4" data-cy="editorial-block-intro-title">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.itemWrapper}>
        <Typography data-cy="editorial-block-intro-content">{content}</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        className={`${classes.itemWrapper} ${classes.authorItem} ${
          deviceType === 'mobile' ? classes.authorPosition : ''
        }`}
      >
        <Typography tag="body-s" className={classes.introAuthor} data-cy="editorial-block-intro-author-text">
          - {author}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default IntroBlock;
