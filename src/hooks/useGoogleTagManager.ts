import getConfig from 'next/dist/shared/lib/runtime-config';
import { useSelector } from 'react-redux';
import { selectCountry, selectLanguage } from 'src/store/slices/ui';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

declare global {
  interface Window {
    dataLayer: any;
    Cookiebot: any;
  }
}

function useGoogleTagManager(title: string): void {
  const { publicRuntimeConfig } = getConfig();
  const country = useSelector(selectCountry).toUpperCase();
  const countryCode = country === 'UK' ? 'GB' : country;

  /* load GTM script with correct variables for dev and stage or production */
  const tagManagerArgs = {
    gtmId: publicRuntimeConfig.GTM_ID,
    auth: publicRuntimeConfig.GTM_AUTH,
    preview: publicRuntimeConfig.GTM_PREVIEW,
    dataLayer: {
      page_type: title || '',
      country: countryCode,
      language: useSelector(selectLanguage),
    },
  };

  // initialize GTM only once
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);
}

export default useGoogleTagManager;
