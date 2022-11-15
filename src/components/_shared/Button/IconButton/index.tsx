import { memo } from 'react';
import cn from 'src/utils/cn';
import Icon, { IconProps } from '../../Icon';
import BaseButton, { BaseButtonProps } from '../BaseButton';
import styles from './index.module.css';

export type IconButtonProps = BaseButtonProps & {
  iconProps: IconProps;
};

const IconButton: React.FC<IconButtonProps> = ({
  iconProps,
  className,
  mode = 'tertiary',
  theme = 'light',
  ...rest
}) => {
  return (
    <BaseButton
      className={cn(styles.iconButton, styles[mode], styles[theme], className)}
      mode={mode}
      theme={theme}
      fullWidth={false}
      {...rest}
    >
      <Icon {...iconProps} />
    </BaseButton>
  );
};

export default memo(IconButton);
