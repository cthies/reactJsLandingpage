import ReferAFriend from './index';
import Wrapper from 'src/storybook/Wrapper';
import { useDispatch } from 'react-redux';
import { initialState, setUserData } from 'src/store/slices/ui';

export default {
  title: 'ReferAFriend',
  component: ReferAFriend,
  decorators: [Wrapper],
};

export function Story(): JSX.Element {
  const dispatch = useDispatch();
  dispatch(setUserData({ ...initialState.userData, show_refer_a_friend: 'http://example.com/refer-link' }));
  return <ReferAFriend />;
}

Story.decorators = [Wrapper];
