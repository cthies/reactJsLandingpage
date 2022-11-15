import { CountrySliceType, StoreSwitcherResponseType } from './Types';
import { getPrismicSingle } from 'lib/api/content/prismic';

export async function getStoreSwitcher(ref: string): Promise<StoreSwitcherResponseType | undefined> {
  const response = await getPrismicSingle('store_switcher', 'en', 'gb', ref);
  const data = response?.body as CountrySliceType[];

  return data?.map((slice) => ({
    ...slice.primary,
    stores: slice.items,
  }));
}
