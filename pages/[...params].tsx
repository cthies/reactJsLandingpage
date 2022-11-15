/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import tracer from 'src/tracer';
import scrollTo from 'src/utils/scrollTo';
import legacyStickyTabs from 'src/utils/legacyStickyTabs';
import { ServerResponseBolted } from 'lib/bolts';
import ErrorBoundary from 'src/components/_shared/ErrorBoundary';

type CatchAllProps = {
  html: string;
  metas: string[][];
};

declare global {
  interface Window {
    jQuery: any;
  }
}

function makeKey(key: string): string {
  switch (key) {
    case 'itemprop':
      return 'itemProp';
    case 'hreflang':
      return 'hrefLang';
    case 'charset':
      return 'charSet';
    case 'http-equiv':
      return 'httpEquiv';
    default:
      return key;
  }
}

export default function CatchAll({ html = '', metas }: CatchAllProps): JSX.Element {
  useEffect(() => {
    const { jQuery: $ } = window; // LOL

    if ($) {
      $('#main').before($('#ajax_global_messages'));

      $('.cart-bubble').remove();

      $(document).on('show.bs.modal', () => {
        $('.modal-backdrop').remove();
      });

      $(document).on('shown.bs.modal', () => {
        $('.modal-backdrop').on('click', () => $('.modal').modal('hide'));
      });

      $(document).on('hidden.bs.modal', () => {
        $('.modal .modal-backdrop').remove();
      });

      $(document).on('mouseup', 'a[role=tab]', (e: any) => {
        document.body.classList.add('ignore-scroll');
        setTimeout(() => {
          scrollTo(
            window.scrollY + $(e.target.dataset.target)[0].getBoundingClientRect().top - $(e.target).outerHeight(),
            () => document.body.classList.remove('ignore-scroll')
          );
        }, 50);
      });

      legacyStickyTabs($);
    }
  }, []);

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : '';

  let __html = html;
  __html = __html.replace(/<\/?head>/g, '');
  __html = __html.replace(/<!doctype[\s\S]*?>/gi, '');
  __html = __html.replace(/<\/?html[\s\S]*?>/g, '');
  __html = __html.replaceAll(/(<\/?body[\s\S]*?>)/gim, '<!--$1-->');
  __html = __html.replaceAll(/<title>([\s\S]*?)<\/title>/gim, '');
  __html = __html.replaceAll(/<meta(?! itemprop)[\s\S]*?\/?>/gim, '');
  __html = __html.replaceAll(/<link rel=['"](shortcut )?icon['"] href=['"]([\s\S]*?)['"][\s\S]*?\/?>/gim, '');
  __html = __html.replaceAll(/<!--\[if lte IE 9\]>[\s\S]*?<!\[endif\]-->/gim, '');
  __html = __html.replaceAll(/<link[\s\S]*?\/?>/gim, '');

  return (
    <ErrorBoundary>
      {typeof window === 'undefined' && (
        <Head>
          <title dangerouslySetInnerHTML={{ __html: title }} />
          <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link rel="icon" href="/images/favicon.ico" />
          {metas?.map((item) => {
            const [tag, content] = item;
            const Tag = `${tag}`;
            if (content.indexOf('style-ie9.css') > -1) {
              return null;
            }
            const matches = content.replace(/\?_=\d+/, '?').matchAll(/([\s\S]*?)=["']([\s\S]*?)["']/gim);
            const results = {} as any;
            for (const match of matches) {
              results[makeKey(match[1].trim())] = match[2];
            }
            return <Tag key={content} {...results} />;
          })}
        </Head>
      )}
      <div id="legacy-content" dangerouslySetInnerHTML={{ __html }} suppressHydrationWarning={true} />
    </ErrorBoundary>
  );
}

export const getServerSideProps: GetServerSideProps = tracer.wrap(
  'getServerSideProps',
  async (context: GetServerSidePropsContext) => {
    const boltedResponse = context.res as ServerResponseBolted;

    if (!boltedResponse || !boltedResponse.content) {
      return { props: {} };
    }

    const { decode } = await import('html-entities');
    let html = boltedResponse.content.htmlContent;
    html = html.replaceAll(
      'skin/frontend/default/egg/css/style.css',
      'skin/frontend/default/egg/css/style-shopnext.css'
    );
    html = html.replaceAll('skin/frontend/default/egg/js/script.js', 'skin/frontend/default/egg/js/script-shopnext.js');

    const metas = html.matchAll(/<(meta|link)(?! itemprop)([\s\S]*?)\/?>/gim);
    const metasResult = [];

    for (const match of metas) {
      metasResult.push([match[1], decode(match[2])]);
    }

    return { props: { html, metas: metasResult } };
  }
);
