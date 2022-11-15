import React from 'react';
import BodyCheckPromo from 'src/components/homepage/BodyCheckPromo';
import TagsBlock from 'src/components/homepage/TagsBlock';
import ShortCutsBlock from 'src/components/homepage/ShortCutsBlock';
import ContentSlider from 'src/components/homepage/ContentSlider';
import ProductSlider from 'src/components/homepage/ProductSlider';
import HeroSlider from 'src/components/homepage/HeroSlider';
import StepSlider from 'src/components/homepage/StepSlider';
import HabitsBlock from 'src/components/homepage/HabitsBlock';
import HtmlHead from 'src/components/_shared/HtmlHead';
import FullWidthBgContainer from 'src/components/_shared/FullWidthBgContainer';
import { useDeviceType } from 'src/hooks/useDeviceType';
import useGoogleTagManager from 'src/hooks/useGoogleTagManager';
import { HomePageDocument } from 'lib/api/content/getHomePageData/Types';
import BlockContainer from 'src/components/_common/BlockContainer';
import Newsletter from 'src/components/_common/Newsletter';
import { useMicrocopyTranslations } from 'src/hooks/useTranslations';
import classes from './index.module.css';

export interface HomePageProps {
  data: HomePageDocument;
}

const HomePage: React.FC<HomePageProps> = ({ data }) => {
  const deviceType = useDeviceType();
  const t = useMicrocopyTranslations();

  useGoogleTagManager(data.tracking_page_type || '');

  return (
    <>
      <HtmlHead
        title={data.page_title || t('meta_title')}
        keywords={data.page_keywords || t('meta_keywords')}
        description={data.page_description || t('meta_description')}
        alternate=""
      />
      <div className={classes.mainContainer}>
        {data?.slices?.map((item, index) => {
          switch (item.slice_type) {
            case 'hero_slider': {
              return <HeroSlider key={`hp-${index}`} data={item} priority={index === 0} />;
            }
            case 'tags': {
              return <TagsBlock key={`hp-${index}`} data={item} />;
            }
            case 'shortcuts': {
              if (deviceType === 'mobile') {
                return <TagsBlock key={`hp-${index}`} data={item} />;
              } else {
                return <ShortCutsBlock key={`hp-${index}`} data={item} />;
              }
            }
            case 'bestsellers': {
              return <ProductSlider key={`hp-${index}`} data={item} />;
            }
            case 'editorial_block': {
              return <HabitsBlock key={`hp-${index}`} data={item} />;
            }
            case 'content_slider':
              return <ContentSlider key={`hp-${index}`} data={item} />;
            case 'step_slider':
              return <StepSlider key={`hp-${index}`} data={item} />;
            case 'body_check':
              return <BodyCheckPromo key={`hp-${index}`} data={item} />;
            case 'newsletter':
              return <Newsletter key={`hp-${index}`} data={item.primary} variant="home" />;
            case 'footnote':
              return (
                <FullWidthBgContainer key={index} id="footnote" className={classes.footnote}>
                  <BlockContainer>{item.primary?.title}</BlockContainer>
                </FullWidthBgContainer>
              );
            default: {
              return null;
            }
          }
        })}
      </div>
    </>
  );
};

export default HomePage;
