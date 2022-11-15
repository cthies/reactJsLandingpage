export type FooterResponseType = {
  top: FooterDocuments;
  middle: FooterDocuments;
  bottom: FooterDocuments;
};

export type FooterLinkItem = {
  label: string;
  url: string;
};

export type FooterDocuments = FooterDocument[];

export type FooterDocument =
  | FooterLinksSliceType
  | FooterPaymentsSliceType
  | FooterDeliverySliceType
  | FooterGuaranteesSliceType
  | FooterAppsSliceType
  | FooterSocialMediaSliceType
  | FooterAboutSliceType
  | FooterPopularCategoriesSliceType;

export type FooterLinksSliceType = {
  slice_type: 'footer_links';
  slice_label: string | null;
  primary: {
    title: string;
  };
  items: {
    label: string;
    url: string;
  }[];
};

export type FooterPaymentsSliceType = {
  slice_type: 'footer_payments';
  slice_label: string | null;
  primary: {
    title: string;
  };
  items: {
    image: string;
  }[];
};

export type FooterDeliverySliceType = {
  slice_type: 'footer_delivery';
  slice_label: string | null;
  primary: {
    title: string;
    subtitle: string;
  };
  items: {
    image: string;
  }[];
};

export type FooterGuaranteesSliceType = {
  slice_type: 'footer_guarantees';
  slice_label: string | null;
  primary: {
    title: string;
    bulletpoints: {
      type: 'list-item';
      text: string;
    }[];
  };
  items: {
    image: string;
  }[];
};

export type FooterAppsSliceType = {
  slice_type: 'footer_apps';
  slice_label: string | null;
  primary: {
    title: string;
  };
  items: {
    image: string;
    store_url: string;
  }[];
};

export type FooterSocialMediaSliceType = {
  slice_type: 'footer_social_media';
  slice_label: string | null;
  primary: {
    title: string;
  };
  items: {
    logo: string;
    url: string;
  }[];
};

export type FooterAboutSliceType = {
  slice_type: 'footer_about';
  slice_label: string | null;
  primary: {
    title: string;
  };
  items: FooterLinkItem[];
};

export type FooterPopularCategoriesSliceType = {
  slice_type: 'footer_popular_categories';
  slice_label: string | null;
  primary: {
    title: string;
  };
  items: FooterLinkItem[];
};
