/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { appWithTranslation } from 'next-i18next';
import { ToastContainer, Slide } from 'react-toastify';
import { Analytics } from '@vercel/analytics/react';

import 'react-toastify/dist/ReactToastify.min.css';

// Styles
import '../styles/reset.css';
import '../styles/theme.css';
import '../styles/fonts.css';

// Hooks
import useCanonicalUrl from '../hooks/useCanonicalUrl';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const canonicalUrl = useCanonicalUrl();

  return (
    <>
      <Head>
        <title>Dokkan Battle Battle - Fight your friends in multiplayer game mode</title>
        <meta
          name="description"
          content="Dokkan Battle Battle allows you to fight your friends on Dokkan Battle in different game modes"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "${process.env.NEXT_PUBLIC_ADS_ID}",
              enable_page_level_ads: true
            });
          `,
        }}
      />

      <Component {...pageProps} />
      <ToastContainer
        theme=""
        closeButton={false}
        position="top-right"
        autoClose={4000}
        closeOnClick
        transition={Slide}
        limit={2}
      />
      <Analytics />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  let appProps = {};

  if (appContext.Component.getInitialProps) {
    appProps = await App.getInitialProps(appContext);
  }

  if (appContext.ctx.res?.statusCode === 404) {
    appContext.ctx.res.writeHead(302, { Location: '/' });
    appContext.ctx.res.end();
  }

  return { ...appProps };
};

export default appWithTranslation(MyApp);
