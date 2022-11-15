import Footer from './index';
import { setFooterData } from 'src/store/slices/footer';
import Wrapper from 'src/storybook/Wrapper';
import { useDispatch } from 'react-redux';

export default {
  title: 'Footer',
  component: Footer,
};

export function Story(): JSX.Element {
  const dispatch = useDispatch();
  dispatch(
    setFooterData({
      top: [
        {
          slice_type: 'footer_about',
          slice_label: 'footer_about',
          primary: { title: 'About' },
          items: Array.from({ length: 10 }).map((_, index) => ({ label: `label ${index}`, url: `#url_${index}` })),
        },
        {
          slice_type: 'footer_social_media',
          slice_label: 'footer_social_media',
          primary: { title: 'Social Media' },
          items: Array.from({ length: 10 }).map((_, index) => ({
            logo: `/icons/UI_action_arrow-right-white.svg?${index}`,
            url: `#url_${index}`,
          })),
        },
        {
          slice_type: 'footer_apps',
          slice_label: 'footer_apps',
          primary: { title: 'Apps' },
          items: Array.from({ length: 10 }).map((_, index) => ({
            image: `/icons/UI_action_arrow-right-white.svg?${index}`,
            store_url: `#store_url_${index}`,
          })),
        },
      ],
      middle: [
        {
          slice_type: 'footer_guarantees',
          slice_label: 'footer_guarantees',
          primary: {
            title: 'Guarantees',
            bulletpoints: Array.from({ length: 3 }).map((_, index) => ({
              type: 'list-item',
              text: `string_${index}`,
            })),
          },
          items: Array.from({ length: 10 }).map((_, index) => ({
            image: `/icons/UI_action_arrow-right-white.svg?${index}`,
            store_url: `#store_url_${index}`,
          })),
        },
        {
          slice_type: 'footer_links',
          slice_label: 'footer_links',
          primary: { title: 'Links' },
          items: Array.from({ length: 10 }).map((_, index) => ({ label: `label ${index}`, url: `#url_${index}` })),
        },
        {
          slice_type: 'footer_delivery',
          slice_label: 'footer_delivery',
          primary: { title: 'Delivery', subtitle: 'Subtitle' },
          items: Array.from({ length: 10 }).map((_, index) => ({
            image: `/icons/UI_action_arrow-right-white.svg?${index}`,
          })),
        },
      ],
      bottom: [
        {
          slice_type: 'footer_popular_categories',
          slice_label: 'footer_popular_categories',
          primary: { title: 'Popular Categories' },
          items: Array.from({ length: 10 }).map((_, index) => ({ label: `label ${index}`, url: `#url_${index}` })),
        },
        {
          slice_type: 'footer_payments',
          slice_label: 'footer_payments',
          primary: { title: 'Payments' },
          items: Array.from({ length: 10 }).map((_, index) => ({
            image: `/icons/UI_action_arrow-right-white.svg?${index}`,
          })),
        },
      ],
    })
  );
  return <Footer />;
}

Story.decorators = [Wrapper];
