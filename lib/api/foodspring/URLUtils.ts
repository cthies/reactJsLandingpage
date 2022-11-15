import { ResponseBolted } from 'lib/bolts';
import { GetServerSidePropsContext } from 'next';
import getApiUrl from 'next-api-url';

/**
 * Returns Foodspring API url with language extensions where needed for non-default language locales
 */
export function getFoodspringApiUrl(context: GetServerSidePropsContext): string {
  const { res } = context;
  const boltedResponse = res as ResponseBolted;

  const language = boltedResponse.props.language;
  const region = boltedResponse.props.region;

  const defaultLanguage = boltedResponse.props.mainConfig.defaultLanguage;

  const url = getApiUrl(context, false);

  if (language !== defaultLanguage) {
    return `${url}/${language}`;
  } else {
    //Check for workaround required for DK & FI locale which requires language extension to work.
    return region === 'dk' || region === 'fi' ? `${url}/en` : url;
  }
}
