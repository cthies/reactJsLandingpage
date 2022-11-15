import { ApiResponse } from 'lib/api/Types';
import fetcher from 'src/utils/fetcher';
import { Product } from './Types';

const requestOptions: RequestInit = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export async function getProduct(productSKU: string, baseUrl: string): Promise<ApiResponse<Product>> {
  try {
    const result = await fetcher(`${baseUrl}/foodspring_api/catalog/product/sku/${productSKU}`, requestOptions);
    return await result.json();
  } catch (e) {
    console.error(e);
    return {
      success: false,
      errors: [String(e)],
    };
  }
}
