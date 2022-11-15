import { ApiResponse } from 'lib/api/Types';

import fetcher from 'src/utils/fetcher';
import productSearchTemplate from './productSearchTemplate';
import { SearchProductsResultProps } from './Types';

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
  customerGroupId?: string | number;
  websiteId?: string | number;
};

export async function searchProducts({
  q = '',
  lang = 'en',
  storeId = 17,
  customerGroupId = 0,
  websiteId = 1,
}: SearchOptions): Promise<ApiResponse<SearchProductsResultProps>> {
  try {
    const response = await fetcher('/esearch.php?v=magento/product/_search', {
      ...requestOptions,
      body: JSON.stringify(productSearchTemplate(q, lang, Number(storeId), Number(customerGroupId), Number(websiteId))),
    });

    const json = await response.json();
    const { total, hits } = json.hits;
    const items = hits.map((item: Record<string, unknown>) => {
      if (item.fields !== undefined) {
        const obj = item.fields as Record<string, string[]>;
        const slug = `url_${lang}`;
        return {
          title: obj[`name_${lang}`][0],
          link: `/${obj[slug][0]}`,
          priceOld: obj.price[0],
          priceNew: obj[`price_${customerGroupId}_${websiteId}`][0],
          discount: obj[`has_discount_${customerGroupId}_${websiteId}`][0],
          image: obj[`thumbnail_${lang}`][0],
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
