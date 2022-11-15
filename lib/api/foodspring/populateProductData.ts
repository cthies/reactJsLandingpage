import { isResponseSuccess } from '../Types';
import { getProduct } from './getProduct';
import { Product } from './getProduct/Types';

/**
 * Adds product information for items in array by calling product API for every product
 *
 * @param items array of items that contains product SKU value & product field that needs to be populated.
 * @param keySKU field name for product sku value of type 'string'.
 * @param keyProduct field name for product data to be populated on of type 'Product'.
 * @param removeItemsWithEmptyProducts If set to true - removes items which has no product data from the array.
 * @returns array of items that should contain populated product field.
 */
export const populateProductData = async <
  T extends Record<KeySKU, string> & Record<KeyProduct, Product | undefined>,
  KeySKU extends keyof T,
  KeyProduct extends keyof T
>(
  items: T[],
  {
    keySKU,
    keyProduct,
    removeItemsWithEmptyProducts,
    baseUrl,
  }: {
    keySKU: KeySKU;
    keyProduct: KeyProduct;
    removeItemsWithEmptyProducts?: boolean;
    baseUrl: string;
  }
): Promise<T[]> => {
  //TODO: Require improvement from backend for a single API call instead one per product
  const responses = await Promise.all(
    items.map((i) => {
      return getProduct(i[keySKU], baseUrl);
    })
  );

  const successResponses = responses.filter(isResponseSuccess);

  return items
    .map((i) => {
      const sku = i[keySKU];
      const product = successResponses.find((r) => r.data.sku === sku)?.data;

      if (!product) {
        console.warn(`appendProducts: Product not found with sku ${sku}`);
        if (removeItemsWithEmptyProducts) {
          return null;
        } else {
          return i;
        }
      } else {
        return {
          ...i,
          [keyProduct]: product,
        };
      }
    })
    .filter((item: T | null): item is T => {
      return !!item;
    });
};
