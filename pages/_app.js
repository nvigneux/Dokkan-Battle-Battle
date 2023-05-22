/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { appWithTranslation } from 'next-i18next';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// Styles
import '../styles/reset.css';
import '../styles/theme.css';
import '../styles/fonts.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [queryClient] = React.useState(() => new QueryClient());

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

      <Script
        async
        src={
          `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADS_ID}`
        }
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
          <ToastContainer
            theme=""
            closeButton={false}
            position="top-right"
            autoClose={4000}
            closeOnClick
            transition={Slide}
            limit={2}
          />
        </Hydrate>
      </QueryClientProvider>
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
