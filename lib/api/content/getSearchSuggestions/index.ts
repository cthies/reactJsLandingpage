import { getPrismicSingle } from '../prismic';
import { SearchSuggestionsResponseType } from './Types';

export async function getSearchSuggestions(
  language: string,
  region: string,
  ref: string
): Promise<SearchSuggestionsResponseType | undefined> {
  try {
    const response = await getPrismicSingle('search_suggestions', language, region, ref);
    return response.body;
  } catch (e) {
    console.error(e);
  }

  return undefined;
}
