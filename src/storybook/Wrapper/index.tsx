import { StoryFn } from '@storybook/react';
import { Provider } from 'react-redux';

import { initializeStore, useStore } from 'src/store';
import Overlay from 'src/components/_shared/Overlays';

const initialStore = initializeStore();

function Wrapper(Story: StoryFn): JSX.Element {
  const store = useStore(initialStore.getState());
  return (
    <Provider store={store}>
      <Story />
      <Overlay />
    </Provider>
  );
}

export default Wrapper;
