export type StoreSwitcherResponseType = StoreSwitcherCountry[];

export type StoreSwitcherCountry = {
  name: string;
  base_url: string;
  stores: Store[];
};

export type Store = {
  store_id: string;
  code: string;
  language: string;
  url: string;
};

export type CountrySliceType = {
  slice_type: 'country';
  slice_label?: string | null;
  primary: {
    name: string;
    base_url: string;
  };
  items: Store[];
};
