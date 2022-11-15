export type SearchProductsResultProps = {
  total?: number;
  items?: SearchProductsResultItemProps[];
};

export type SearchProductsResultItemProps = {
  title: string;
  link: string;
  priceOld: string;
  priceNew: string;
  discount: boolean;
  image: string;
};
