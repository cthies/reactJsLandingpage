import { getPrismicSingle } from '../prismic';
import { HeaderResponseType } from './Types';

export async function getHeader(
  language: string,
  region: string,
  ref: string
): Promise<HeaderResponseType | undefined> {
  const header = await getPrismicSingle('header', language, region, ref);
  if (header) {
    return {
      mainMenu: header.body,
      secondLevelMenu: header.body1,
    };
  }
  return undefined;
}
