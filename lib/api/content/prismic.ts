import { Client, locale } from 'lib/content/client';
import { InterestLandingPageDocument } from 'lib/api/content/getInterestPage/Types';

export async function getPrismicSingle(type: string, language: string, region: string, ref: string): Promise<any> {
  const response = await Client().getSingle(type, { lang: locale(language, region), ref });
  return response?.data;
}

type InterestLandingPageResponse = InterestLandingPageDocument & {
  body: InterestLandingPageDocument['slices'];
};

export async function getPrismicByUID(
  type: string,
  uid: string,
  language: string,
  region: string,
  ref: string
): Promise<InterestLandingPageResponse> {
  const response = await Client().getByUID(type, uid, { lang: locale(language, region), ref });
  return response?.data;
}
