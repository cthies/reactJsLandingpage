import { ApiResponse } from 'lib/api/Types';

import fetcher from 'src/utils/fetcher';
import recipeSearchTemplate from './recipeSearchTemplate';
import { SearchRecipesResultItemProps, SearchRecipesResultProps } from './Types';

const requestOptions: RequestInit = {
  method: 'POST',
  headers: {
    authorization: 'Basic cmVhZG9ubHk6bDB4OXd0aDU3bg==\n',
  },
};

export type SearchOptions = {
  q?: string;
  lang?: string;
  storeId?: string | number;
};

/**
 * TODO: this api call is unfinished! It was decoupled from SearchContent component logic.
 * Recipe search was not used in shop-next so we just moved this partial implementation here for future use.
 */
export async function searchRecipes({
  q = '',
  lang = 'en',
  storeId = 17,
}: SearchOptions): Promise<ApiResponse<SearchRecipesResultProps>> {
  try {
    const response = await fetcher('/esearch.php?v=magento/recipe/_search', {
      ...requestOptions,
      body: JSON.stringify(recipeSearchTemplate(q, lang, Number(storeId))),
    });

    const json = await response.json();
    const { total, hits } = json.hits;

    const items: SearchRecipesResultItemProps[] = hits.map((item: Record<string, unknown>) => {
      if (item.fields !== undefined) {
        const obj = item.fields as Record<string, string[]>;
        const slug = `url_${lang}`;
        return {
          title: obj[`name_${lang}`][0],
          link: `/${obj[slug][0]}`,
        };
      }
    });

    return {
      success: true,
      data: {
        total,
        items,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      errors: [String(e)],
    };
  }
}
