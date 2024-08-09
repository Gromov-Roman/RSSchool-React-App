import { Provider } from 'react-redux';
import React from 'react';
import ThemeContextProvider from '@context/ThemeContext';
import { setupStore } from '@core/store';
import ErrorBoundary from '@components/ErrorBoundary';
import Head from 'next/head';
import { AppProps } from 'next/app';
import '../index.scss';

const store = setupStore();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rick and Morty</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
      </Head>
      <React.StrictMode>
        <ErrorBoundary fallback={<div>Oops! Something went wrong.</div>}>
          <Provider store={store}>
            <ThemeContextProvider>
              <div id="stars" />
              <div id="stars2" />
              <div id="stars3" />
              <Component {...pageProps} />
            </ThemeContextProvider>
          </Provider>
        </ErrorBoundary>
      </React.StrictMode>
    </>
  );
}
