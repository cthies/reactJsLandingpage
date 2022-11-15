import { getPrismicSingle } from '../prismic';
import { NewsletterResponse } from './Types';

export async function getNewsletter(
  language: string,
  region: string,
  ref: string
): Promise<NewsletterResponse | undefined> {
  try {
    const response = await getPrismicSingle('newsletter', language, region, ref);
    return response;
  } catch (e) {
    console.error(e);
  }

  return undefined;
}
