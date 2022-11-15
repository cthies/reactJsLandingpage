import { Product } from 'lib/api/foodspring/getProduct/Types';

export type HomePageDocument = {
  page_title: string;
  page_keywords: string;
  page_description: string;
  tracking_page_type: string;
  slices: HomePageSliceType[];
};

export type HomePageSliceType =
  | HomePageHeroSliderSlice
  | HomePageTagsSlice
  | HomePageShortcutsSlice
  | HomePageBestSellersSlice
  | HomePageEditorialSlice
  | HomePageContentSliderSlice
  | HomePageStepSliderSlice
  | HomePageBodyCheckSlice
  | HomePageFootnoteSlice
  | HomePageNewsletterSlice;

export type HomePageHeroSliderSlice = {
  slice_type: 'hero_slider';
  slice_label: string | null;
  primary: {
    step_tracking: string;
  };
  items: HomePageHeroSliderItemType[];
};

export type HomePageHeroSliderItemType = GaPromotionTracking & {
  cta_url: string;
  cta_title: string;
  image_mobile_url: string;
  image_mobile_width: number;
  image_mobile_height: number;
  image_desktop_url: string;
  image_desktop_width: number;
  image_desktop_height: number;
  style: 'white' | 'black';
  title: string;
  subtitle: string;
};

export type HomePageTagsSlice = {
  slice_type: 'tags';
  slice_label: string | null;
  primary: {
    is_active: boolean;
    title: string;
  };
  items: HomePageTagsItemType[];
};

export type HomePageTagsItemType = GaPromotionTracking & {
  title: string;
  url: string;
};

export type HomePageShortcutsSlice = {
  slice_type: 'shortcuts';
  slice_label: string | null;
  primary: {
    is_active: boolean;
    title: string;
  };
  items: HomePageShortcutsItemType[];
};

export type HomePageShortcutsItemType = GaPromotionTracking & {
  title: string;
  url: string;
  image: string;
};

export type HomePageBestSellersSlice = {
  slice_type: 'bestsellers';
  slice_label: string | null;
  primary: {
    title: string;
    tracking_list: string;
  };
  items: HomePageBestsellersItemType[];
};

export type HomePageBestsellersItemType = {
  product_sku: string;

  /**
   * Populated after appending api call
   */
  product: Product | undefined;
};

export type HomePageNewsletterSlice = {
  slice_type: 'newsletter';
  slice_label: string | null;
  primary: {
    title: string;
    subtitle: string;
    cta_title: string;
    cta_title_female: string;
    cta_title_male: string;
    email_placeholder: string;
    footer: string;
  };
};

export type HomePageEditorialSlice = {
  slice_type: 'editorial_block';
  slice_label: string | null;
  primary: {
    tracking_category: string;
    intro_title: string;
    intro_author: string;
    intro_content: string;
  };
  items: HomePageEditorialItemType[];
};

export type HomePageEditorialItemType = GaPromotionTracking & {
  type: 'article' | 'recipe' | 'product';
  url: string;
  time: string;
  image: string;
  title: string;
  headline: string;
  subtitle: string;
  review_rate?: number;
  review_count?: number;
};

export type HomePageContentSliderSlice = {
  slice_type: 'content_slider';
  slice_label: string | null;
  primary: {
    title: string;
    type: 'recipes' | 'articles' | 'workouts';
  };
  items: HomePageContentSliderItemType[];
};

export type HomePageContentSliderItemType = GaPromotionTracking & {
  type: 'recipe' | 'article' | 'workout';
  topic: string;
  image: string;
  title: string;
  url: string;
  time: string;
  badge_label: string;
  badge_type: 'beginner' | 'intermediate' | 'advanced';
  cta_title: string;
  cta_url: string;
  cta_tracking_category: string;
  cta_tracking_label: string;
};

export type HomePageStepSliderSlice = {
  slice_type: 'step_slider';
  slice_label: string | null;
  primary: {
    title: string;
    tracking_category: string;
  };
  items: HomePageStepSliderItemType[];
};

export type HomePageStepSliderItemType = GaPromotionTracking & {
  title: string;
  text: string;
  image_mobile_url: string;
  image_desktop_url: string;
  cta_title: string;
  cta_url: string;
};

export type HomePageBodyCheckSlice = {
  slice_type: 'body_check';
  slice_label: string | null;
  primary: GaPromotionTracking & {
    title: string;
    subtitle: string;
    image_desktop_url: string;
    cta_title: string;
    cta_url: string;
    items: {
      text: string;
      type: 'paragraph';
    }[];
  };
};

export type HomePageFootnoteSlice = {
  slice_type: 'footnote';
  slice_label: string | null;
  primary: {
    title: string;
  };
};

export type GaPromotionTracking = {
  tracking_id: string;
  tracking_name: string;
  tracking_creative: string;
  tracking_position: string;
};
