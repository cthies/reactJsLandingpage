import { InterestLandingPageRecipeItem, InterestLandingPageRecipesSlice } from 'lib/api/content/getInterestPage/Types';
import { useCallback } from 'react';
import ILPContentSlider from '../ILPContentSlider';
import ContentCard from 'src/components/_common/ContendCard';
import classes from './index.module.css';

interface Props {
  data: InterestLandingPageRecipesSlice;
}

const RecipesBlock: React.FC<Props> = ({ data }) => {
  const { primary, items } = data;
  const { intro_title, intro_subtitle, cta_label, cta_url, tracking_category, tracking_cta_label } = primary;

  const renderItem = useCallback(
    (item: InterestLandingPageRecipeItem, index: number) => {
      return (
        <ContentCard
          key={index}
          item={{
            image: item.image,
            link: item.url,
            time: item.preparation_time,
            title: item.title,
            tag: item.badge,
            tracking: {
              id: item.tracking_id,
              creative: item.tracking_creative,
              name: item.tracking_name,
              position: `${index + 1}`,
            },
          }}
          className={classes.card}
          badgeBgColor="black"
          badgeTheme="dark"
          iconName="timeClock"
        />
      );
    },
    [classes.card]
  );

  return (
    <div className={classes.wrapper}>
      <ILPContentSlider
        introTitle={intro_title}
        introSubtitle={intro_subtitle}
        footerTitle={cta_label}
        footerUrl={cta_url}
        items={items}
        renderItem={renderItem}
        id="recipes"
        tracking_category={tracking_category}
        tracking_cta_label={tracking_cta_label}
      />
    </div>
  );
};

export default RecipesBlock;
