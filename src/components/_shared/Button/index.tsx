import BaseButton, { BaseButtonProps } from './BaseButton';

type ButtonProps = BaseButtonProps;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  if (!rest.component && rest.href) {
    rest.component = 'a';
  }

  return <BaseButton {...rest}>{children}</BaseButton>;
};

export default Button;
