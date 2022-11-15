import React, { useCallback } from 'react';
import ILPContentSlider from 'src/components/interests/ILPContentSlider';
import ContentCard from 'src/components/_common/ContendCard';
import classes from './index.module.css';

import {
  InterestLandingPageArticleItem,
  InterestLandingPageArticlesSlice,
} from 'lib/api/content/getInterestPage/Types';

interface Props {
  data: InterestLandingPageArticlesSlice;
}

export default function ArticlesBlock(props: Props): JSX.Element {
  const { primary, items } = props.data;
  const { intro_title, intro_subtitle, cta_label, cta_url, tracking_category, tracking_cta_label } = primary;

  const renderItem = useCallback(
    (item: InterestLandingPageArticleItem, index: number) => {
      return (
        <ContentCard
          key={index}
          item={{
            title: item.title,
            image: item.image,
            link: item.url,
            time: item.reading_time,
            tracking: {
              id: item.tracking_id,
              creative: item.tracking_creative,
              name: item.tracking_name,
              position: (index + 1).toString(),
            },
          }}
          className={classes.wrapper}
          iconName="book"
        />
      );
    },
    [classes.wrapper]
  );

  return (
    <ILPContentSlider
      introTitle={intro_title}
      introSubtitle={intro_subtitle}
      footerTitle={cta_label}
      footerUrl={cta_url}
      items={items}
      renderItem={renderItem}
      id="articles"
      tracking_category={tracking_category}
      tracking_cta_label={tracking_cta_label}
    />
  );
}
