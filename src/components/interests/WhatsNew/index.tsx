import React from 'react';
import { useDeviceType } from 'src/hooks/useDeviceType';
import WhatsNewDesktop from 'src/components/interests/WhatsNew/desktop';
import WhatsNewMobile from 'src/components/interests/WhatsNew/mobile';
import BlockContainer from 'src/components/_common/BlockContainer';
import { InterestLandingPageWhatsNewSlice } from 'lib/api/content/getInterestPage/Types';
import classes from './index.module.css';

type Props = {
  data: InterestLandingPageWhatsNewSlice;
};

const WhatsNew: React.FC<Props> = (props) => {
  const deviceType = useDeviceType();

  return (
    <div className={classes.wrapper}>
      <BlockContainer>
        {deviceType === 'desktop' ? <WhatsNewDesktop {...props} /> : <WhatsNewMobile {...props} />}
      </BlockContainer>
    </div>
  );
};

export default WhatsNew;
