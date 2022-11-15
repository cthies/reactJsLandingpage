import React, { FC } from 'react';
import ImageItem from '../ImageItem';
import HeaderItem from '../HeaderItem';
import PromotionTrackingElement from 'src/components/_tracking/PromotionTrackingElement';
import { HomePageHeroSliderItemType } from 'lib/api/content/getHomePageData/Types';
import { DeviceType, DeviceOrientation } from 'src/hooks/useDeviceTypeWatcher';
import classes from './index.module.css';

interface SliderItemProps {
  data: HomePageHeroSliderItemType;
  active: boolean;
  type: DeviceType;
  position: string;
  orientation: DeviceOrientation | null;
  priority?: boolean;
}

const SliderItem: FC<SliderItemProps> = ({ data, active, type, position, orientation, priority }) => {
  const getImageSrc = (): string => {
    if (type === 'mobile' && orientation !== 'landscape') {
      return data.image_mobile_url;
    }
    return data.image_desktop_url;
  };

  return (
    <div className={classes.slideContainer} data-cy="hero-slider-slide">
      <PromotionTrackingElement
        promoId={data.tracking_id}
        promoName={data.tracking_name}
        promoCreative={data.tracking_creative}
        promoPosition={position}
        useImpression={false}
      >
        <ImageItem src={getImageSrc()} title={data.title} active={active} priority={priority} />
        <HeaderItem
          title={data.title}
          text={data.subtitle}
          buttonTitle={data.cta_title}
          buttonUrl={data.cta_url}
          type={type}
          orientation={orientation}
          theme={data.style === 'black' ? 'light' : 'dark'}
        />
      </PromotionTrackingElement>
    </div>
  );
};

export default SliderItem;
