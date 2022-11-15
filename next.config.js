const config = {
  compress: true, // After few experiments, compression gives a better user experience. And we can't enable it elsewhere.
  serverRuntimeConfig: {
    APP_HOST: process.env.APP_HOST,
    APP_DOMAIN: process.env.APP_DOMAIN,
  },
  publicRuntimeConfig: {
    DD_RUM_APPLICATION_ID: process.env.DD_RUM_APPLICATION_ID,
    DD_RUM_CLIENT_TOKEN: process.env.DD_RUM_CLIENT_TOKEN,
    DD_RUM_SITE: process.env.DD_RUM_SITE,
    DD_RUM_SERVICE_NAME: process.env.DD_RUM_SERVICE_NAME,
    DD_RUM_ENV: process.env.DD_RUM_ENV,
    DD_RUM_SAMPLE_RATE: process.env.DD_RUM_SAMPLE_RATE,
    GTM_ID: process.env.GTM_ID,
    GTM_AUTH: process.env.GTM_AUTH,
    GTM_PREVIEW: process.env.GTM_PREVIEW,
    PRISMIC_ENDPOINT: process.env.PRISMIC_ENDPOINT,
    PRISMIC_API_TOKEN: process.env.PRISMIC_API_TOKEN,
    PRISMIC_PREVIEW: process.env.PRISMIC_PREVIEW,
  },
  images: {
    domains: ['d23o500odzh64r.cloudfront.net', 'www.foodspring.co.uk', 'i3.ytimg.com'],
  },
  productionBrowserSourceMaps: true,
  i18n: {
    // https://nextjs.org/docs/advanced-features/i18n-routing
    locales: ['be', 'de', 'en', 'es', 'fr', 'it', 'nl', 'sv'],
    defaultLocale: 'en',
  },
  webpack: (config, { webpack, buildId }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.BUILD_ID': JSON.stringify(buildId),
      })
    );
    return config;
  },
  generateBuildId: async () => {
    const fs = require('fs');
    let rev = fs.readFileSync('.git/HEAD').toString().trim();
    if (rev.indexOf(':') !== -1) {
      rev = fs
        .readFileSync('.git/' + rev.substring(5))
        .toString()
        .trim();
    }
    return Promise.resolve(rev);
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports.i18n = config.i18n;
module.exports = withBundleAnalyzer(config);
