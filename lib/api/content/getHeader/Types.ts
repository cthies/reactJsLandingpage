export type HeaderResponseType = {
  mainMenu: (HeaderTopMenuSliceType | HeaderSupportMenuSliceType | HeaderServiceMenuSliceType)[];
  secondLevelMenu: HeaderSecondLevelMenuSliceType[];
};

export type HeaderTopMenuSliceType = {
  slice_type: 'header_top_menu';
  slice_label: string | null;
  items: {
    title: string;
    url: string;
    category: string;
    action: string;
    label: string;
  }[];
};

export type HeaderSupportMenuSliceType = {
  slice_type: 'support_menu';
  slice_label: string | null;
  primary: {
    name: string;
  };
  items: {
    name: string;
    url: string;
  }[];
};

export type HeaderServiceMenuSliceType = {
  slice_type: 'service_menu';
  slice_label: string | null;
  primary: {
    name: string;
  };
  items: {
    name: string;
    url: string;
  }[];
};

export type HeaderSecondLevelMenuSliceType = {
  slice_type: 'header_bottom_menu';
  slice_label: string | null;
  primary: {
    name: string;
    url: string;
    category: string;
    action: string;
    label: string;
    style: string;
  };
  items: HeaderProductType[];
};

export type HeaderProductType = {
  title: string;
  image: string | null;
  url: string;
  category: string;
  action: string;
  label: string;
};
