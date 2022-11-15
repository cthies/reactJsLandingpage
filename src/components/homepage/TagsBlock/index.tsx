import React, { FC } from 'react';
import Slider, { Settings } from 'react-slick';
import Typography from 'src/components/_shared/Typography';
import styles from './index.module.css';
import cn from 'src/utils/cn';
import BlockContainer from 'src/components/_common/BlockContainer';
import PromotionTrackingElement from 'src/components/_tracking/PromotionTrackingElement';
import { HomePageShortcutsSlice, HomePageTagsSlice } from 'lib/api/content/getHomePageData/Types';
import Button from 'src/components/_shared/Button';

interface TagsBlockProps {
  data: HomePageTagsSlice | HomePageShortcutsSlice;
}

const TagsBlock: FC<TagsBlockProps> = ({ data }) => {
  if (!data || !data.primary?.is_active) {
    return null;
  }

  const settings: Settings = {
    className: cn('variable-width', styles.container),
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    variableWidth: true,
    arrows: false,
  };
  return (
    <BlockContainer data-cy="tags-block">
      <div className={styles.titleWrapper}>
        <Typography tag="h4" data-cy="tags-block-title">
          {data.primary?.title}
        </Typography>
      </div>

      <Slider {...settings}>
        {data.items?.map((item, index: number) => (
          <PromotionTrackingElement
            key={index}
            promoId={item?.tracking_id}
            promoName={item?.tracking_name}
            promoCreative={item?.tracking_creative}
            promoPosition={`${index + 1}`}
          >
            <Button
              href={item?.url}
              className={styles.btnRound}
              mode="secondary"
              theme="dark"
              data-cy="tags-block-item"
            >
              {item?.title}
            </Button>
          </PromotionTrackingElement>
        ))}
      </Slider>
    </BlockContainer>
  );
};

export default TagsBlock;
