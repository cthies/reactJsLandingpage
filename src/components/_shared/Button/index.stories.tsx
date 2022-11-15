/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Wrapper from 'src/storybook/Wrapper';
import Button from './index';
import IconButton from './IconButton/index';
import IconComponent from '../Icon/index';
import { setDeviceType } from 'src/store/slices/ui';
import { useDispatch } from 'react-redux';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    mode: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'radio' },
    },
    theme: {
      options: ['dark', 'light'],
      control: { type: 'radio' },
    },
    component: {
      options: ['button', 'span', 'a'],
      control: { type: 'radio' },
    },
    deviceType: {
      options: ['mobile', 'desktop'],
      control: { type: 'radio' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
};

export function Default(args: any): JSX.Element {
  const dispatch = useDispatch();
  dispatch(setDeviceType(args.deviceType ?? 'desktop'));

  return <Button {...args}>Just a button</Button>;
}
Default.decorators = [Wrapper];

export function Icon(args: any): JSX.Element {
  const dispatch = useDispatch();
  dispatch(setDeviceType(args.deviceType ?? 'desktop'));
  return (
    <IconButton
      {...args}
      iconProps={{
        name: 'cart',
      }}
    />
  );
}

Icon.decorators = [Wrapper];

export function TextWithIcon(args: any): JSX.Element {
  const dispatch = useDispatch();
  dispatch(setDeviceType(args.deviceType ?? 'desktop'));
  return (
    <Button {...args}>
      <IconComponent name="cart" />
      Open cart
    </Button>
  );
}

TextWithIcon.decorators = [Wrapper];
