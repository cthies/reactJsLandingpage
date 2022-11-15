import React, { FC } from 'react';
import ProgressBar from 'src/components/_shared/ProgressBar';
import Grid from 'src/components/_shared/Grid';
import Typography, { Variant } from 'src/components/_shared/Typography';
import classes from './index.module.css';

interface DotItemProps {
  active: boolean;
  title: string;
  tag?: Variant;
  timeDuration: string;
  isTitleAbove?: boolean;
  option: 'dark' | 'light';
}

const DotItem: FC<DotItemProps> = ({ active, title, isTitleAbove = false, option, tag, timeDuration }) => {
  return (
    <Grid
      container
      direction={isTitleAbove ? 'column-reverse' : 'column'}
      justifyContent="space-between"
      alignItems="stretch"
    >
      <Grid item xs={12} className={classes.progressbar}>
        <ProgressBar active={active} color={option === 'dark' ? 'white' : 'black'} timeDuration={timeDuration} />
      </Grid>
      {tag && (
        <Grid item xs={12} className={`${classes.titleContainer} ${isTitleAbove ? classes.titleCenter : ''}`}>
          <Typography tag={tag} theme={option} className={active ? classes.dotItemActive : classes.dotItemInactive}>
            {title}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default DotItem;
