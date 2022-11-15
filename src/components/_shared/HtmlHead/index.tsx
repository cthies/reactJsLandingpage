import Head from 'next/head';
import React from 'react';
import { useMicrocopyTranslations } from 'src/hooks/useTranslations';

type Props = {
  title: string;
  keywords: string;
  description: string;
  alternate?: string;
};

const alternateUrls = [
  { base_url: 'https://www.foodspring.co.uk', hrefLang: 'en-gb' },
  { base_url: 'https://www.foodspring.be', hrefLang: 'fr-be' },
  { base_url: 'https://www.foodspring.be/nl', hrefLang: 'nl-be' },
  { base_url: 'https://www.foodspring.be/en', hrefLang: 'en-be' },
  { base_url: 'https://www.foodspring.nl', hrefLang: 'nl-nl' },
  { base_url: 'https://www.foodspring.nl/en', hrefLang: 'en-nl' },
  { base_url: 'https://www.foodspring.at', hrefLang: 'de-at' },
  { base_url: 'https://www.foodspring.at/en', hrefLang: 'en-at' },
  { base_url: 'https://www.foodspring.ch', hrefLang: 'de-ch' },
  { base_url: 'https://www.foodspring.ch/fr', hrefLang: 'fr-ch' },
  { base_url: 'https://www.foodspring.de', hrefLang: 'de-de' },
  { base_url: 'https://www.foodspring.de/en', hrefLang: 'en-de' },
  { base_url: 'https://www.foodspring.it', hrefLang: 'it-it' },
  { base_url: 'https://www.foodspring.it/en', hrefLang: 'en-it' },
  { base_url: 'https://www.foodspring.es', hrefLang: 'es-es' },
  { base_url: 'https://www.foodspring.es/en', hrefLang: 'en-es' },
  { base_url: 'https://www.foodspring.fi/en', hrefLang: 'en-fi' },
  { base_url: 'https://www.foodspring.fi/sv', hrefLang: 'sv-fi' },
  { base_url: 'https://www.foodspring.pl', hrefLang: 'en-pl' },
  { base_url: 'https://www.foodspring.fr', hrefLang: 'fr-fr' },
  { base_url: 'https://www.foodspring.fr/en', hrefLang: 'en-fr' },
  { base_url: 'https://www.foodspring.dk/en', hrefLang: 'en-dk' },
  { base_url: 'https://www.foodspring.se', hrefLang: 'sv-se' },
  { base_url: 'https://www.foodspring.se/en', hrefLang: 'en-se' },
];

function HtmlHead({ title, keywords, description, alternate }: Props): JSX.Element {
  const t = useMicrocopyTranslations();

  return (
    <Head>
      <title>{title || t('meta_title')}</title>
      <meta name="description" content={description || t('meta_description')} />
      <meta name="keywords" content={keywords || t('meta_keywords')} />
      <meta name="robots" content="INDEX,FOLLOW" />
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="icon" href="/images/favicon.ico" />

      {alternate !== undefined && (
        <>
          {alternateUrls.map(function (domain, index) {
            return (
              <link rel="alternate" href={`${domain.base_url}${alternate}`} hrefLang={domain.hrefLang} key={index} />
            );
          })}
        </>
      )}
    </Head>
  );
}

export default HtmlHead;
