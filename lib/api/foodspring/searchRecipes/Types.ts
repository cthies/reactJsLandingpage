export type SearchRecipesResultProps = {
  total?: number;
  items?: SearchRecipesResultItemProps[];
};

export type SearchRecipesResultItemProps = {
  title: string;
  link: string;
};
