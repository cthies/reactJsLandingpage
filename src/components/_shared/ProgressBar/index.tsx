import React, { FC } from 'react';
import cn from 'src/utils/cn';
import classes from './index.module.css';

export interface ProgressBarProps {
  active: boolean;
  color: 'white' | 'black';
  timeDuration: string;
}

const ProgressBar: FC<ProgressBarProps> = (props) => {
  const { active } = props;
  return (
    <>
      <div style={{ position: 'relative' }}>
        <div className={cn(classes.main, classes[`color-${props.color}`])} />
        <div
          className={cn(classes.content, classes[`color-${props.color}`], active && classes.animatedContent)}
          style={{ animationDuration: props.timeDuration }}
        />
      </div>
    </>
  );
};

export default ProgressBar;
