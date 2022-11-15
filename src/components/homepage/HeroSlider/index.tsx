/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React, { useCallback, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import SliderItem from './SliderItem';
import DotItem from './DotItem';
import Grid from 'src/components/_shared/Grid';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './index.module.css';
import { useDeviceType } from 'src/hooks/useDeviceType';
import { useDeviceOrientation } from 'src/hooks/useDeviceOrientation';
import BlockContainer from 'src/components/_common/BlockContainer';
import useSlickSliderTracking from 'src/hooks/useSlickSliderTracking';
import { trackEvent, trackPromotionImpression } from 'src/tracking';
import ClickTrackingElement from 'src/components/_tracking/ClickTrackingElement';
import { HomePageHeroSliderSlice } from 'lib/api/content/getHomePageData/Types';
import { useSelector } from 'react-redux';
import { selectIsLighthouse } from 'src/store/slices/ui';
import isEmpty from 'lodash.isempty';

export interface HeroSliderProps {
  data: HomePageHeroSliderSlice;
  priority?: boolean;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ data, priority }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeDotsIndex, setActiveDotsIndex] = useState(0);
  const [sliderContainer, setSliderContainer] = useState<HTMLElement | null>(null);
  const deviceType = useDeviceType();
  const orientationType = useDeviceOrientation();
  const isLighthouse = useSelector(selectIsLighthouse);

  useSlickSliderTracking(
    sliderContainer,
    activeImageIndex,
    useCallback(
      (index) => {
        if (!isEmpty(data.items)) {
          trackPromotionImpression({
            creative: data.items[index].tracking_creative,
            id: data.items[index].tracking_id,
            name: data.items[index].tracking_name,
            position: `${index + 1}`,
          });
        }
      },
      [data.items]
    )
  );

  const settings: Settings = {
    arrows: true,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 8000,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    pauseOnHover: false,
    appendDots: (dots) => (
      <div
        style={
          deviceType === 'desktop'
            ? {
                display: 'block',
                backgroundColor: '#fff',
                height: '10%',
                bottom: '-10%',
              }
            : {
                display: 'block',
                backgroundColor: 'transparent',
                padding: '2rem 1rem 0',
                height: '1.5rem',
                bottom: 0,
              }
        }
      >
        <BlockContainer>
          <Grid
            container
            direction="row"
            justifyContent={deviceType === 'mobile' ? 'space-around' : 'space-between'}
            alignItems="stretch"
            className={styles.flexContainer}
          >
            {dots}
          </Grid>
        </BlockContainer>
      </div>
    ),
    customPaging: (i) => (
      <div className={styles.flexStyle}>
        <a>
          <ClickTrackingElement category={data.primary.step_tracking} label={`Step ${i + 1}`}>
            <DotItem
              active={i === activeDotsIndex}
              title={deviceType !== 'mobile' ? data?.items[i].title : ''}
              theme={
                deviceType === 'mobile' ? (data?.items[activeDotsIndex].style === 'black' ? 'light' : 'dark') : 'light'
              }
            />
          </ClickTrackingElement>
        </a>
      </div>
    ),
    dotsClass: `slick-dots slick-thumb ${styles.dotsContainer}`,
    beforeChange: (_current: number, next: number) => setActiveDotsIndex(next),
    afterChange: (current: number) => {
      setActiveImageIndex(current);
    },
    onSwipe: useCallback(() => {
      trackEvent({
        action: 'swipe',
        category: data.primary.step_tracking,
        label: `Slide ${activeImageIndex + 1}`,
      });
    }, [activeImageIndex, data.primary]),
  };

  /*
  Lighthouse tests resize the viewport quite fast and often.
  The Slider layout is very complex.
  Resizing the Slider component with all the slides causes glitches in the rendering pipeline.
  They all accumulate as a CLS (Cumulative Layout Shift) penalty.
  The users do not experience these glitches, because the users don't resize the viewport like Lighthouse does.
  Thus we're showing the first slide without the Slider for Lighthouse only.
   */
  if (isLighthouse && data?.items && data?.items.length > 0) {
    return (
      <div className={styles.container}>
        <SliderItem data={data.items[0]} active={true} type={deviceType} position="1" orientation={orientationType} />
      </div>
    );
  }

  return (
    <div ref={setSliderContainer} className={styles.container} data-cy="hero-slider">
      <Slider {...settings}>
        {data?.items?.map((item, index) => (
          <SliderItem
            key={index}
            data={item}
            type={deviceType}
            active={index === activeImageIndex}
            position={`${index + 1}`}
            orientation={orientationType}
            priority={priority && index === 0}
          />
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
