import { populateProductData } from 'lib/api/foodspring/populateProductData';
import { getPrismicSingle } from '../prismic';
import { HomePageBestSellersSlice } from './Types';
import HomePageDocument from './mock_UK-en.json'

export async function getHomePageDocument(
  language: string,
  region: string,
  baseUrl: string,
  ref: string
) {
  //const response = await getPrismicSingle('home_page', language, region, ref);
  // USE MOCK DATA
  const response = HomePageDocument;
  if (response) {
    //Rename "body" to "slices"
    //delete Object.assign(response, { ['slices']: response['body'] })['body'];

    //await fetchProducts(response, baseUrl);
    return response;
  }
  return undefined;
}

/*
const fetchProducts = async (document: HomePageDocument, baseUrl: string) => {
  const productSlice = document.slices.find(
    (slice): slice is HomePageBestSellersSlice => slice.slice_type === 'bestsellers'
  );

  if (!productSlice) {
    console.warn('product_slider slice not found');
    return;
  }

  productSlice.items = await populateProductData(productSlice.items, {
    keySKU: 'product_sku',
    keyProduct: 'product',
    removeItemsWithEmptyProducts: true,
    baseUrl,
  });
};
*/

