import { useCallback, useMemo, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import BlockContainer from 'src/components/_common/BlockContainer';
import ArrowComponent from 'src/components/_shared/Arrow';
import Typography from 'src/components/_shared/Typography';
import { useDeviceType } from 'src/hooks/useDeviceType';

import styles from './index.module.css';
import ClickTrackingElement from 'src/components/_tracking/ClickTrackingElement';
import { trackEvent } from 'src/tracking';
import Button from 'src/components/_shared/Button';

interface Props<T> {
  introTitle: string;
  introSubtitle: string;

  footerTitle: string;
  footerUrl: string;

  items: T[];
  id?: string;

  tracking_category: string;
  tracking_cta_label: string;

  /**
   * Function that renders the slide from an item
   */
  renderItem: (item: T, index: number) => React.ReactNode;

  /**
   * Use these settings to override default ones.
   */
  settings?: Settings;
}

function ILPContentSlider<T>({
  introTitle,
  introSubtitle,
  footerTitle,
  footerUrl,
  items,
  renderItem,
  id,
  tracking_category,
  tracking_cta_label,
  settings: additionalSettings,
}: Props<T>): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const deviceType = useDeviceType();

  const introComponent = useMemo(
    () => (
      <div className={styles.introBlock} key={introTitle}>
        <Typography className={styles.title} tag="h3">
          {introTitle}
        </Typography>
        <Typography className={styles.subtitle}>{introSubtitle}</Typography>
      </div>
    ),
    [introSubtitle, introTitle]
  );

  const trackArrowClick = useCallback(
    (action) => {
      trackEvent({
        action: 'click',
        category: tracking_category,
        label: action,
      });
    },
    [tracking_category]
  );

  const settings: Settings = useMemo(() => {
    return {
      className: styles.container,
      infinite: false,
      slidesToShow: 4.2,
      slidesToScroll: 4,
      onSwipe: () => {
        trackEvent({
          action: 'swipe',
          category: tracking_category,
          label: `${activeIndex + 1}`,
        });
      },
      beforeChange: (_current: number, next: number) => setActiveIndex(next),
      swipeToSlide: true,
      arrows: deviceType !== 'mobile',
      nextArrow: <ArrowComponent direction="right" size={28} onArrowClick={trackArrowClick} />,
      prevArrow: <ArrowComponent direction="left" size={28} onArrowClick={trackArrowClick} />,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 3.2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2.5,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1.4,
            slidesToScroll: 1,
            speed: 500,
          },
        },
      ],
      ...additionalSettings,
    };
  }, [activeIndex, additionalSettings, deviceType, trackArrowClick, tracking_category]);

  const slides = useMemo(() => {
    const temp = items.map(renderItem);
    if (deviceType === 'desktop') {
      temp.unshift(introComponent);
    }
    return temp;
  }, [deviceType, introComponent, items, renderItem]);

  return (
    <BlockContainer id={id}>
      {deviceType === 'mobile' ? introComponent : null}
      <Slider {...settings}>{slides}</Slider>
      <div className={styles.footerContainer}>
        <ClickTrackingElement category={tracking_category} label={tracking_cta_label}>
          <Button className={styles.footerButton} mode="tertiary" fullWidth={false} href={footerUrl}>
            {footerTitle}
          </Button>
        </ClickTrackingElement>
      </div>
    </BlockContainer>
  );
}

export default ILPContentSlider;
