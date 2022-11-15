/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useMemo, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Grid from 'src/components/_shared/Grid';
import DotItem from './DotItem';
import { Variant } from 'src/components/_shared/Typography';
import useSlickSliderTracking from 'src/hooks/useSlickSliderTracking';
import TrackingElement from 'src/components/_tracking/_TrackingElement';
import classes from './index.module.css';

interface StepSliderProps {
  titles: string[];
  isTitleAbove?: boolean;
  children: ReactNode;
  dotsPlace: 'above' | 'under';
  navTitleTag?: Variant;
  navTheme?: 'dark' | 'light';
  navTimeDuration?: string | undefined;
  className: string;
  parentClassName: string;
  onDotClick?: (index: number) => void;
  onSwipe?: (index: number, swipeDirection: string) => void;
  onImpression: (index: number) => void;
}

const StepSlider: React.FC<StepSliderProps> = ({
  titles,
  navTitleTag,
  isTitleAbove,
  navTheme = 'light',
  navTimeDuration = '5s',
  children,
  dotsPlace,
  className,
  parentClassName,
  onImpression,
  onDotClick,
  onSwipe,
}) => {
  const [sliderContainer, setSliderContainer] = useState<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useSlickSliderTracking(sliderContainer, activeIndex, onImpression);

  const settings: Settings = useMemo(() => {
    return {
      arrows: false,
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 6000,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      className: parentClassName,
      appendDots: (dots) => (
        <div
          style={
            dotsPlace === 'under'
              ? {
                  display: 'block',
                  backgroundColor: 'transparent',
                  textAlign: 'start',
                  bottom: '0',
                }
              : {
                  display: 'block',
                  backgroundColor: 'transparent',
                  textAlign: 'start',
                  top: 0,
                }
          }
        >
          <Grid
            container
            direction="row"
            justifyContent={dotsPlace === 'under' ? 'flex-start' : 'space-between'}
            alignItems="stretch"
            className={classes.flexContainer}
          >
            {dots}
          </Grid>
        </div>
      ),
      customPaging: (i) => (
        <div className={classes.flexStyle}>
          <a>
            <TrackingElement
              onClick={() => {
                if (onDotClick) {
                  onDotClick(i);
                }
              }}
            >
              <DotItem
                active={i === activeIndex}
                title={titles[i]}
                isTitleAbove={isTitleAbove}
                tag={navTitleTag}
                option={navTheme}
                timeDuration={navTimeDuration}
              />
            </TrackingElement>
          </a>
        </div>
      ),
      dotsClass: `slick-dots slick-thumb ${className}`,
      beforeChange: (_current: number, next: number) => setActiveIndex(next),
      onSwipe: (direction) => {
        if (onSwipe) {
          onSwipe(activeIndex, direction);
        }
      },
    };
  }, [
    parentClassName,
    className,
    dotsPlace,
    classes.flexContainer,
    classes.flexStyle,
    activeIndex,
    titles,
    isTitleAbove,
    navTitleTag,
    navTheme,
    navTimeDuration,
    onDotClick,
    onSwipe,
  ]);

  return (
    <div ref={setSliderContainer}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default StepSlider;
