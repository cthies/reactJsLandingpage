import { FC, useMemo } from 'react';
import { useDeviceType } from 'src/hooks/useDeviceType';
import HabitsBlockDesktop from './desktop';
import HabitsBlockMobile from './mobile';
import { HomePageEditorialSlice } from 'lib/api/content/getHomePageData/Types';

export interface HabitsBlockProps {
  data: HomePageEditorialSlice;
}

const HabitsBlock: FC<HabitsBlockProps> = (props) => {
  const deviceType = useDeviceType();
  const Component = useMemo(() => (deviceType === 'mobile' ? HabitsBlockMobile : HabitsBlockDesktop), [deviceType]);
  return <Component {...props} />;
};

export default HabitsBlock;
