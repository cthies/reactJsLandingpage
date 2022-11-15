import { AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from 'react';
import { useDeviceType } from 'src/hooks/useDeviceType';
import cn from 'src/utils/cn';
import styles from './index.module.css';

type OwnProps = {
  mode?: 'primary' | 'secondary' | 'tertiary';
  theme?: 'light' | 'dark';
  component?: 'button' | 'a' | 'span';
  fullWidth?: boolean;
};

type HTMLButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type HTMLAnchorProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
type HTMLSpanProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

export type BaseButtonProps = HTMLButtonProps & HTMLAnchorProps & HTMLSpanProps & OwnProps;

const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  className,
  mode = 'primary',
  theme = 'light',
  fullWidth = true,
  component,
  ...rest
}) => {
  const isMobile = useDeviceType() === 'mobile';

  const baseClassName = cn(
    styles.buttonRoot,
    styles[mode],
    styles[theme],
    fullWidth ? styles['full-width'] : '',
    isMobile ? styles['mobile'] : ''
  );

  switch (component) {
    case 'a': {
      return (
        <a className={cn(styles['a-mod'], baseClassName, className)} {...rest}>
          {children}
        </a>
      );
    }
    case 'span': {
      return (
        <span aria-disabled={true} className={cn(styles['span-mod'], baseClassName, className)} {...rest}>
          {children}
        </span>
      );
    }
    default: {
      return (
        <button className={cn(baseClassName, className)} {...rest}>
          {children}
        </button>
      );
    }
  }
};

export default BaseButton;
