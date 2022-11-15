import Wrapper from 'src/storybook/Wrapper';
import { useDispatch } from 'react-redux';
import { showOverlay } from 'src/store/slices/overlay';

export default {
  title: 'Overlay Container',
  decorators: [Wrapper],
};

export function Notification(): JSX.Element {
  const dispatch = useDispatch();
  dispatch(
    showOverlay({
      type: 'notification',
      message: 'Notification',
      variant: 'success',
      expirationDuration: false,
    })
  );
  return <div />;
}

export function Modal(): JSX.Element {
  const dispatch = useDispatch();
  dispatch(
    showOverlay({
      type: 'modal',
      variant: 'default',
      title: 'Title',
      message: 'Modal',
      expirationDuration: false,
    })
  );
  return <div />;
}
