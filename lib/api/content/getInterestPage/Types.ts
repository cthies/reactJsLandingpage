import { Product } from 'lib/api/foodspring/getProduct/Types';

export type InterestLandingPageDocument = {
  page_title: string;
  page_keywords: string;
  page_description: string;
  tracking_page_type: string;
  slices: (
    | InterestLandingPageAnchorSlice
    | InterestLandingPageAnchorWithImagesSlice
    | InterestLandingPageWhatsNewSlice
    | InterestLandingPageArticlesSlice
    | InterestLandingPageRecipesSlice
    | InterestLandingPageProductsSlice
    | InterestLandingPageWorkoutsSlice
    | InterestLandingPageYoutubeSlice
  )[];
};

export type InterestLandingPageAnchorSlice = {
  slice_type: 'anchor';
  slice_label: string | null;
  primary: {
    title: string;
    subtitle: string;
  };
  items: InterestLandingPageAnchorItem[];
};

export type InterestLandingPageAnchorWithImagesSlice = {
  slice_type: 'anchor_with_image';
  slice_label: string | null;
  primary: {
    title: string;
    subtitle: {
      type: 'list-item';
      text: string;
    }[];
    image_desktop?: string;
    image_mobile?: string;
  };
  items: InterestLandingPageAnchorItem[];
};

export type InterestLandingPageAnchorItem = {
  label: string;
  url: string;
  tracking_category: string;
  tracking_label: string;
};

export type InterestLandingPageWhatsNewSlice = {
  slice_type: 'whats_new';
  slice_label: string | null;
  primary: {
    title: string;
    tracking_category: string;
  };
  items: InterestLandingPageWhatsNewItem[];
};

export type InterestLandingPageWhatsNewItem = {
  title: string;
  subtitle: string;
  image: string;
  url: string;
  tracking_id: string;
  tracking_name: string;
  tracking_creative: string;
};

export type InterestLandingPageArticlesSlice = {
  slice_type: 'article_slider';
  slice_label: string | null;
  primary: {
    intro_title: string;
    intro_subtitle: string;
    cta_url: string;
    cta_label: string;
    tracking_category: string;
    tracking_cta_label: string;
  };
  items: InterestLandingPageArticleItem[];
};

export type InterestLandingPageArticleItem = {
  title: string;
  image: string;
  reading_time: string;
  url: string;
  tracking_id: string;
  tracking_name: string;
  tracking_creative: string;
};

export type InterestLandingPageRecipesSlice = {
  slice_type: 'recipe_slider';
  slice_label: string | null;
  primary: {
    intro_title: string;
    intro_subtitle: string;
    cta_url: string;
    cta_label: string;
    tracking_category: string;
    tracking_cta_label: string;
  };
  items: InterestLandingPageRecipeItem[];
};

export type InterestLandingPageRecipeItem = {
  title: string;
  preparation_time: string;
  image: string;
  badge: string;
  url: string;
  tracking_id: string;
  tracking_name: string;
  tracking_creative: string;
};

export type InterestLandingPageProductsSlice = {
  slice_type: 'article_product_slider';
  slice_label: string | null;
  primary: {
    title: string;
    cta_url: string;
    cta_label: string;
    tracking_category: string;
    tracking_event_category: string;
    tracking_cta_label: string;
    tracking_list: string;
  };
  items: InterestLandingPageProductItem[];
};

export type InterestLandingPageProductItem = {
  article_title: string;
  article_image: string;
  article_subtitle: string;
  article_url: string;
  article_cta_label: string;
  tracking_article_id: string;
  tracking_article_name: string;
  tracking_article_creative: string;

  /**
   * TODO: remove after prismic migration
   * @deprecated
   */
  tracking_dimension14: string;

  product_sku: string;

  /**
   * Populated after appending api call
   */
  product: Product | undefined;
};

export type InterestLandingPageWorkoutsSlice = {
  slice_type: 'workouts';
  slice_label: string | null;
  primary: {
    intro_title: string;
    intro_subtitle: string;
    cta_title: string;
    cta_url: string;
    tracking_category: string;
    tracking_cta_label: string;
  };
  items: InterestLandingPageWorkoutItem[];
};

export type InterestLandingPageYoutubeSlice = {
  slice_type: 'youtube_video';
  slice_label: string | null;
  primary: {
    youtube_video_id: string;
    subtitle: string;
  };
};

export type InterestLandingPageWorkoutItem = {
  title: string;
  subtitle: string;
  image: string;
  time: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  difficulty_label: string;
  url: string;
  tracking_id: string;
  tracking_name: string;
  tracking_creative: string;
};
