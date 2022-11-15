import { getPrismicSingle } from '../prismic';
import { FooterResponseType } from './Types';

export async function getFooter(
  language: string,
  region: string,
  ref: string
): Promise<FooterResponseType | undefined> {
  try {
    const response = await getPrismicSingle('footer_v2', language, region, ref);
    return {
      top: response.body,
      middle: response.body1,
      bottom: response.body2,
    };
  } catch (e) {
    console.error(e);
  }

  return undefined;
}
