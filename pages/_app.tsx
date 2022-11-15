import { useEffect } from 'react';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { Provider } from 'react-redux';
import Layout from 'src/containers/Layout';
import { initializeStore, useStore } from 'src/store';
import { setCountry, setDeviceType, setInitialUrl, setLang, setPreviewRef, setUserAgent } from 'src/store/slices/ui';

import 'src/styles/globals.css';
import { setFeatures } from 'src/store/slices/features';
import { setMainConfig } from 'src/store/slices/config';
import { ServerResponseBolted } from 'lib/bolts';

import { LocalCache, LocalCacheBuilder } from 'src/utils/localCache';
import { setHeadData, setStoreSwitcherData } from 'src/store/slices/head';
import { Client, locale } from 'lib/content/client';
import { setFooterData, setNewsletterData } from 'src/store/slices/footer';
import { getStoreSwitcher } from 'lib/api/content/getStoreSwitcher';
import { getHeader } from 'lib/api/content/getHeader';
import { HeaderResponseType } from 'lib/api/content/getHeader/Types';
import getPreviewRefFromReq from 'src/utils/getPreviewRefFromReq';
import { getFooter } from 'lib/api/content/getFooter';
import { setTranslations, Translations } from 'src/store/slices/translations';
import { getNewsletter } from 'lib/api/content/getNewsletter';
import getTranslations from 'lib/api/content/getTranslations';
import { commitPreConsentEvents } from 'src/tracking';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const store = useStore(pageProps.initialReduxState);

  useEffect(() => {
    window.addEventListener('CookiebotOnAccept', commitPreConsentEvents);
  }, []);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

const _localCache = {} as LocalCache<HeaderResponseType>;
const cachedHeadData = LocalCacheBuilder(_localCache, getHeader);

const _localMicroCopyCache = {} as LocalCache<Translations['microcopy']>;
const cachedMicroCopy = LocalCacheBuilder(_localMicroCopyCache, getTranslations);

// TODO: Add type for PageProps!
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  // Note: There are plenty of instances where server response comes in without bolted properties.
  const boltedResponse = appContext.ctx.res as ServerResponseBolted;

  const store = initializeStore(undefined);

  const props = boltedResponse?.props;
  if (!props) {
    appProps.pageProps = {
      ...appProps.pageProps,
      initialReduxState: store.getState(),
    };

    return appProps;
  }

  const UA = appContext.ctx.req?.headers['user-agent'];
  const isMobile = Boolean(UA?.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
  store.dispatch(setDeviceType(isMobile ? 'mobile' : 'desktop'));
  store.dispatch(setUserAgent(UA || ''));

  const config = boltedResponse.props.mainConfig;
  const language = boltedResponse.props.language;
  const region = boltedResponse.props.region;
  const features = boltedResponse.props.features;

  store.dispatch(setLang(language));
  store.dispatch(setCountry(region));

  const previewRef = getPreviewRefFromReq(appContext.ctx.req);

  store.dispatch(setPreviewRef(previewRef));

  // TODO: Handle exception here with grace (preferably a 404 instead of 500)
  const headData = await cachedHeadData(language, region, previewRef);
  if (headData) {
    store.dispatch(setHeadData(headData));
  }

  store.dispatch(setInitialUrl(appContext.ctx.req?.url ?? ''));
  store.dispatch(setFeatures(features));

  const lang = locale(language, region);

  const footer = await getFooter(language, region, previewRef);
  if (footer) {
    store.dispatch(setFooterData(footer));
  }

  const newsletter = await getNewsletter(language, region, previewRef);
  if (newsletter) {
    store.dispatch(setNewsletterData(newsletter));
  }

  const siteConfig = await Client().getSingle('config', { lang, ref: previewRef });
  if (siteConfig && siteConfig.data) {
    store.dispatch(setMainConfig({ ...config, ...siteConfig.data }));
  } else {
    store.dispatch(setMainConfig(config));
  }

  const microcopy = await cachedMicroCopy('microcopy', language, region, previewRef);
  if (microcopy) {
    store.dispatch(setTranslations({ microcopy: microcopy as Translations['microcopy'] }));
  }

  const storeSwitcher = await getStoreSwitcher(previewRef);
  if (storeSwitcher) {
    store.dispatch(setStoreSwitcherData(storeSwitcher));
  }

  appProps.pageProps = {
    ...appProps.pageProps,
    initialReduxState: store.getState(),
    hasProxyContent: props.hasProxyContent,
    language,
  };

  return appProps;
};

export default MyApp;
