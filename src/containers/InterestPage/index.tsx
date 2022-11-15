import React, { FC } from 'react';
import RecipesBlock from 'src/components/interests/Recipes';
import ProductsBlock from 'src/components/interests/ILPProductSlider';
import WhatsNew from 'src/components/interests/WhatsNew';
import Workout from 'src/components/interests/Workout';
import ArticlesBlock from 'src/components/interests/Articles';
import HtmlHead from 'src/components/_shared/HtmlHead';
import { InterestLandingPageProps } from 'pages/interests/[uid]';
import GoogleTagmanager from 'src/hooks/useGoogleTagManager';
import YoutubeVideo from 'src/components/interests/YoutubeVideo';
import TitleBlockWithImage from 'src/components/interests/TitleBlock/TitleBlockWithImage';
import TitleBlockNoImage from 'src/components/interests/TitleBlock/TitleBlockNoImage';
import { useMicrocopyTranslations } from 'src/hooks/useTranslations';

const InterestPage: FC<InterestLandingPageProps> = ({ ilpData }) => {
  const t = useMicrocopyTranslations();
  GoogleTagmanager(ilpData?.tracking_page_type || '');
  return (
    <div>
      <HtmlHead
        title={ilpData?.page_title || t('meta_title')}
        keywords={ilpData?.page_keywords || t('meta_keywords')}
        description={ilpData?.page_description || t('meta_description')}
      />
      {ilpData?.slices.map((slice, index: number) => {
        switch (slice.slice_type) {
          case 'anchor': {
            return <TitleBlockNoImage data={slice} key={index} />;
          }
          case 'anchor_with_image': {
            return <TitleBlockWithImage data={slice} key={index} />;
          }
          case 'whats_new': {
            return <WhatsNew data={slice} key={index} />;
          }
          case 'article_slider': {
            return <ArticlesBlock data={slice} key={index} />;
          }
          case 'recipe_slider': {
            return <RecipesBlock data={slice} key={index} />;
          }
          case 'article_product_slider': {
            return <ProductsBlock data={slice} key={index} />;
          }
          case 'workouts': {
            return <Workout data={slice} key={index} />;
          }
          case 'youtube_video': {
            return <YoutubeVideo data={slice} key={index} />;
          }
        }
      })}
    </div>
  );
};

export default InterestPage;
