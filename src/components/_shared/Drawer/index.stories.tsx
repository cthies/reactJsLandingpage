import Drawer from './index';
import Wrapper from 'src/storybook/Wrapper';
import { useState } from 'react';

export default {
  title: 'Drawer',
  decorators: [Wrapper],
};

export function Story(): JSX.Element {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function handleDrawerClose() {
    setIsDrawerOpen(false);
  }

  return (
    <div>
      <style>{`.content { width: 10em; }`}</style>
      <div>
        <button onClick={() => setIsDrawerOpen(true)}>open drawer</button>
      </div>

      <Drawer
        transitionDuration={400}
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        className="next-js-modal"
      >
        <div className="content">drawer</div>
      </Drawer>
    </div>
  );
}
