import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default function prismicPreviewEnabled(): boolean {
  return publicRuntimeConfig.PRISMIC_PREVIEW === 'true';
}
