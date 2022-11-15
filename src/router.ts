import { Request, RequestHandler, Response } from 'express';
import { getMainConfig } from 'src/utils/config';
import { FeatureKey, Features, getFeatures } from 'src/utils/features';
import getLanguageFromUrl from 'src/utils/getLanguageFromUrl';
import { ResponseBolted } from 'lib/bolts';
import proxy from 'src/utils/proxy';
import { NextServer } from 'next/dist/server/next';
import tracer from 'src/tracer';
import { normalizeLocalePath } from 'next/dist/shared/lib/i18n/normalize-locale-path';

import { i18n } from '../next.config';
import { IncomingMessage } from 'http';
import { TLSSocket } from 'tls';

export function parseRequestUrl(req: IncomingMessage): URL {
  // A workaround for private entry that actually makes sense to use.
  type shortcut = { _parsedUrl: URL };
  if ((req as unknown as shortcut)._parsedUrl) {
    return (req as unknown as shortcut)._parsedUrl;
  }

  let protocol = 'http';
  if ((req.socket as TLSSocket).encrypted) {
    protocol = 'https';
  }

  const baseUrl = `${protocol}://${req.headers.host}`;

  if (!req.url) {
    return new URL(baseUrl);
  }

  return new URL(req.url, `${protocol}://${req.headers.host}`);
}

function fallback(...values: string[]): string {
  return values.find((value) => !!value) || values[values.length - 1];
}

function firstMatch(content: string, regex: { [Symbol.match](string: string): RegExpMatchArray | null }): string {
  const m = content.match(regex);
  return m ? m[1] : '';
}

function sanitiseHtmlLanguage(language: string): string {
  return language.toLowerCase();
}

function sanitiseHtmlRegion(region: string): string {
  // UK is GB in Magento
  if (region === 'GB') {
    region = 'UK';
  }
  return region.toLowerCase();
}

//TODO: Move this out to configuration
const validPairs = [
  'de-at',
  'de-ch',
  'de-de',
  'en-at',
  'en-be',
  'en-de',
  'en-dk',
  'en-es',
  'en-fi',
  'en-fr',
  'en-gb',
  'en-it',
  'en-nl',
  'en-pl',
  'en-se',
  'es-es',
  'fr-be',
  'fr-ch',
  'fr-fr',
  'it-it',
  'nl-be',
  'nl-nl',
  'sv-fi',
  'sv-se',
].reduce((map, key) => {
  map[key] = true;
  return map;
}, {} as Record<string, boolean>);

function sanitiseRegionLanguagePair(region: string, language: string): string[] {
  if (validPairs[`${language}-${region}`]) {
    return [region, language];
  }
  return ['', ''];
}

const NEXT_PATHS = /^\/(_next|api)(\/|$)/;

function isNextPathname(pathname: string): boolean {
  return NEXT_PATHS.test(pathname);
}

const NATIVE_PATHS = {
  'home-page': /^\/$/,
  ilp: /^\/interests(\/|$)/,
};

const PATH_BASED_FEATURES: FeatureKey[] = ['home-page', 'ilp'];

function isNativePathname(pathname: string, features: Features): boolean {
  for (const feature of PATH_BASED_FEATURES) {
    if (features[feature] && NATIVE_PATHS[feature].test(pathname)) {
      return true;
    }
  }
  return false;
}

function router(app: NextServer): RequestHandler {
  const next = app.getRequestHandler();

  return async (req: Request, res: Response): Promise<void> => {
    const config = getMainConfig(req.hostname);
    const features = getFeatures(req.hostname);

    let urlLanguage = getLanguageFromUrl(req.url);
    let urlRegion = config?.region;

    if (urlRegion === 'be' && urlLanguage === 'be') {
      return res.redirect(301, `${req.protocol}://${req.headers.host}${req.originalUrl.replace(/^\/be/, '/nl')}`);
    }

    [urlRegion, urlLanguage] = sanitiseRegionLanguagePair(urlRegion, urlLanguage);

    const defaultLanguage = config?.defaultLanguage;
    const defaultRegion = config?.region; // Region is done the same way for symmetry

    if (defaultLanguage && urlLanguage === defaultLanguage && !(urlRegion === 'dk' || urlRegion === 'fi')) {
      const langRegExp = new RegExp(`^\\/${urlLanguage}`);
      return res.redirect(301, `${req.protocol}://${req.headers.host}${req.originalUrl.replace(langRegExp, '')}`);
    }

    // General pattern for fallbacks: urlValue | htmlValue | defaultValue
    // At this point we have no html entry, so we skip it
    // Later we recalculate these values with all entries.
    (res as ResponseBolted).props = {
      mainConfig: config,
      features: features,
      language: fallback(urlLanguage, defaultLanguage),
      region: fallback(urlRegion, defaultRegion),
      hasProxyContent: false,
    };

    const url = parseRequestUrl(req);

    if (isNextPathname(url.pathname)) {
      return next(req, res);
    }

    const { pathname } = normalizeLocalePath(url.pathname, i18n.locales);

    if (isNativePathname(pathname, features)) {
      return next(req, res);
    }

    const wrappableContent = await proxy(req, res);
    if (!wrappableContent) {
      // Proxy already returned to client.
      return;
    }

    let htmlLanguage = sanitiseHtmlLanguage(firstMatch(wrappableContent, /language['"]:\s?['"](\w+)['"]/im));
    let htmlRegion = sanitiseHtmlRegion(firstMatch(wrappableContent, /country['"]:\s?['"](\w+)['"]/im));
    [htmlRegion, htmlLanguage] = sanitiseRegionLanguagePair(htmlRegion, htmlLanguage);

    // Some pages lie about language in html.
    if (!(/\/magazine/.test(req.url) || /\/checkout-survey/.test(req.url))) {
      // Others actualy have valuable information.
      (res as ResponseBolted).props.language = fallback(urlLanguage, htmlLanguage, defaultLanguage);
      (res as ResponseBolted).props.region = fallback(urlRegion, htmlRegion, defaultRegion);
    }
    (res as ResponseBolted).content = {
      htmlContent: wrappableContent,
    };
    (res as ResponseBolted).props.hasProxyContent = true;

    // Proxy content must go through catchall page.
    return app.render(req, res, '/[...params]');
  };
}

export default (app: NextServer): RequestHandler => {
  return tracer.wrap('router', router(app));
};
