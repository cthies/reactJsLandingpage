import React, { FC } from 'react';
import Icon from 'src/components/_shared/Icon';
import Button from 'src/components/_shared/Button';
import { BaseButtonProps } from 'src/components/_shared/Button/BaseButton';
import cn from 'src/utils/cn';
import classes from './index.module.css';

interface AnimatedButtonProps extends BaseButtonProps {
  defaultlabel: string;
  addedLabel: string;
}

const AnimatedButton: FC<AnimatedButtonProps> = ({ defaultlabel, addedLabel, className, disabled, ...rest }) => {
  return (
    <Button className={cn(classes.addToCartBtn, className || '')} disabled={disabled} {...rest}>
      <div className={`${classes.label} ${disabled ? classes.animatedLabel : ''}`}>{defaultlabel}</div>

      <div className={cn(classes.addedlabel, !disabled ? classes.addedlabelHidden : '')}>
        {addedLabel}
        <Icon name="check" className={classes.icon} />
      </div>
    </Button>
  );
};

export default AnimatedButton;
