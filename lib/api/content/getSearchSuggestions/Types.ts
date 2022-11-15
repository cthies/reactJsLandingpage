export type SearchSuggestionProductSlice = {
  slice_type: 'searchsuggestionproducts';
  slice_label: string | null;
  primary: {
    title: string;
  };
  items: SearchSuggestionProductItemType[];
};

export type SearchSuggestionProductItemType = {
  title: string;
  link: string;
  image: string;
};

export type SearchSuggestionTopCategorySlice = {
  slice_type: 'searchsuggestioncategories';
  slice_label: string | null;
  primary: {
    title: string;
  };
  items: SearchSuggestionTopCategoryItemType[];
};

export type SearchSuggestionTopCategoryItemType = {
  title: string;
  link: string;
};

export type SearchSuggestionContentSlice = {
  slice_type: 'searchsuggestionlatestcontent';
  slice_label: string | null;
  primary: {
    title: string;
  };
  items: SearchSuggestionContentItemType[];
};

export type SearchSuggestionContentItemType = {
  title: string;
  badge: string;
  first_label: string;
  second_label: string | null;
  link: string;
  image: string;
};

export type SearchSuggestionsResponseType = (
  | SearchSuggestionProductSlice
  | SearchSuggestionTopCategorySlice
  | SearchSuggestionContentSlice
)[];
