import { InterestLandingPageDocument, InterestLandingPageProductsSlice } from './Types';
import { getPrismicByUID } from '../prismic';
import { populateProductData } from 'lib/api/foodspring/populateProductData';

export async function getInterestLandingPageDocument(
  uid: string,
  language: string,
  region: string,
  baseUrl: string,
  ref: string
): Promise<InterestLandingPageDocument | undefined> {
  const ilpData = await getPrismicByUID('ilp', uid, language, region, ref);
  if (ilpData) {
    const document: InterestLandingPageDocument = {
      page_title: ilpData.page_title,
      page_keywords: ilpData.page_keywords,
      page_description: ilpData.page_description,
      tracking_page_type: ilpData.tracking_page_type,
      slices: ilpData.body,
    };
    await fetchProducts(document, baseUrl);
    return document;
  }

  return undefined;
}

const fetchProducts = async (document: InterestLandingPageDocument, baseUrl: string) => {
  const productSlice = document.slices.find(
    (slice): slice is InterestLandingPageProductsSlice => slice?.slice_type === 'article_product_slider'
  );

  if (!productSlice) {
    console.warn('article_product_slider slice not found');
    return;
  }

  productSlice.items = await populateProductData(productSlice.items, {
    keySKU: 'tracking_dimension14',
    keyProduct: 'product',
    removeItemsWithEmptyProducts: true,
    baseUrl,
  });
};
