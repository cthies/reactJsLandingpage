import React, { useCallback, useMemo, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import SliderItem from './SliderItem';
import styles from './index.module.css';
import Typography from 'src/components/_shared/Typography';
import { useDeviceType } from 'src/hooks/useDeviceType';
import BlockContainer from 'src/components/_common/BlockContainer';
import ArrowComponent from 'src/components/_shared/Arrow';
import { InterestLandingPageProductsSlice } from 'lib/api/content/getInterestPage/Types';
import ClickTrackingElement from 'src/components/_tracking/ClickTrackingElement';
import { trackEvent } from 'src/tracking';
import Button from 'src/components/_shared/Button';

interface ProductSliderProps {
  data: InterestLandingPageProductsSlice;
}

const ILPProductSlider: React.FC<ProductSliderProps> = ({ data }): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const { items, primary } = data;
  const { title, cta_label, cta_url, tracking_category, tracking_cta_label } = primary;

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
      slidesToShow: 2,
      slidesToScroll: 2,
      swipeToSlide: true,
      arrows: !isMobile,
      nextArrow: <ArrowComponent direction="right" size={28} onArrowClick={trackArrowClick} />,
      prevArrow: <ArrowComponent direction="left" size={28} onArrowClick={trackArrowClick} />,
      responsive: [
        {
          breakpoint: 1380,
          settings: {
            slidesToShow: 1.4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 2.5,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 850,
          settings: {
            slidesToShow: 2.2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1.5,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1.2,
            slidesToScroll: 1,
          },
        },
      ],
      onSwipe: () => {
        trackEvent({
          action: 'swipe',
          category: tracking_category,
          label: `${activeIndex + 1}`,
        });
      },
      beforeChange: (_current: number, next: number) => setActiveIndex(next),
    };
  }, [activeIndex, isMobile, trackArrowClick, tracking_category]);

  return (
    <BlockContainer id="products">
      <div className={styles.title}>
        <Typography tag="h4">{title}</Typography>
      </div>
      <Slider {...settings}>
        {items.map((item, index) => (
          <SliderItem key={index} data={item} position={`${index + 1}`} tracking_list={primary.tracking_list} />
        ))}
      </Slider>
      <div className={styles.footerContainer}>
        <div>
          <ClickTrackingElement category={tracking_category} label={tracking_cta_label}>
            <Button mode="tertiary" fullWidth={false} href={cta_url}>
              {cta_label}
            </Button>
          </ClickTrackingElement>
        </div>
      </div>
    </BlockContainer>
  );
};

export default ILPProductSlider;
