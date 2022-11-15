import Prismic from '@prismicio/client';
import getConfig from 'next/config';
import { DefaultClient } from '@prismicio/client/types/client';
import { NextApiRequest } from 'next';

const { publicRuntimeConfig } = getConfig();

const apiEndpoint = publicRuntimeConfig.PRISMIC_ENDPOINT;
const apiToken = publicRuntimeConfig.PRISMIC_API_TOKEN;

export function Client(req?: NextApiRequest): DefaultClient {
  const options = {
    accessToken: apiToken,
    ...(req ? { req } : {}),
  };
  return Prismic.client(apiEndpoint, options);
}

export function locale(language: string, region: string): string {
  // Known exceptions and mismatches:
  // ours        ->  prismic
  // region:uk   ->  region:gb
  const validRegion = (region === 'uk' ? 'gb' : region).toLowerCase();
  return `${language}-${validRegion}`;
}

type _doc = { id: string; uid: string; type: string; lang: string; isBroken: boolean; tags: string[] };

export const linkResolver = (_doc: _doc) => {
  return '/';
};
