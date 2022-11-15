import React, { FC } from 'react';
import Typography from 'src/components/_shared/Typography';
import ProgressBar from 'src/components/_shared/ProgressBar';
import classes from './index.module.css';

interface DotItemProps {
  active: boolean;
  title: string;
  theme: 'dark' | 'light';
}

const DotItem: FC<DotItemProps> = ({ active, title, theme }) => {
  return (
    <div>
      <div className={classes.progressbar} data-cy="hero-slider-step-line">
        <ProgressBar active={active} color={theme === 'light' ? 'black' : 'white'} timeDuration="8s" />
      </div>
      <div className={classes.title}>
        <Typography
          tag="h5"
          theme={theme}
          className={active ? classes.dotItemActive : classes.dotItem}
          data-cy="hero-slider-step-text"
        >
          {title}
        </Typography>
      </div>
    </div>
  );
};

export default DotItem;
