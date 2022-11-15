/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Document, { Head, Html, Main, NextScript } from 'next/document';
import datadogRumScript from 'src/utils/datadogRumScript';
import prismicPreviewEnabled from 'src/utils/prismicPreviewEnabled';

class MyNextScript extends NextScript {
  render(): JSX.Element | null {
    if (this.context.__NEXT_DATA__.props) {
      delete this.context.__NEXT_DATA__.props.pageProps.html; // LOL
    }
    return super.render();
  }
}

class MyDocument extends Document {
  render() {
    const bodyMatch = this.props.html.match(/<body([\s\S]*?)>/im);
    const bodyParams = {} as any;
    if (bodyMatch) {
      const attributes = bodyMatch[1].replace(/\?_=\d+/, '').matchAll(/([\s\S]*?)=["']([\s\S]*?)["']/gim);
      for (const attribute of attributes) {
        bodyParams[attribute[1].trim()] = attribute[2];
      }
    }

    const rum = datadogRumScript();
    const preview = prismicPreviewEnabled();
    const pageProps = this.props.__NEXT_DATA__.props.pageProps;

    return (
      <Html lang={pageProps.language}>
        <Head>
          <link rel="preload" as="image" href="/images/logo.svg" />
          <link rel="preload" as="font" href="/fonts/Lato-Regular.ttf" type="font/ttf" crossOrigin="" />
          <link
            rel="preload"
            as="font"
            href="/fonts/6297046/4d5961b1-831a-470f-bc80-81d689f88c2a.woff2"
            type="font/woff2"
            crossOrigin=""
          />
          <link
            rel="preload"
            as="font"
            href="/fonts/6297046/e3237fe1-7dd2-43a0-b6ba-57ca1af4c10d.woff"
            type="font/woff"
            crossOrigin=""
          />
        </Head>
        <body {...bodyParams}>
          {rum && <script dangerouslySetInnerHTML={{ __html: rum }} />}
          {preview && <script async defer src="https://static.cdn.prismic.io/prismic.js?new=true&repo=foodspring" />}
          <script
            type="text/javascript"
            async
            src="https://fast.fonts.net/lt/1.css?apiType=css&c=e582f783-b739-4814-b924-08f570f8c88b&fontids=6297046"
          />
          <Main />
          <MyNextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
