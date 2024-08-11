'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { setupStore } from '@core/store';
import '../index.scss';
import ThemeContextProvider from '@context/ThemeContext';
import ErrorBoundary from '@components/ErrorBoundary';

const store = setupStore();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Rick and Morty</title>
        <meta name="description" content="Rick and Morty application just for fun" />
      </head>
      <body>
        <React.StrictMode>
          <ErrorBoundary fallback={<div>Oops! Something went wrong.</div>}>
            <ThemeContextProvider>
              <Provider store={store}>
                <div id="stars" />
                <div id="stars2" />
                <div id="stars3" />
                {children}
              </Provider>
            </ThemeContextProvider>
          </ErrorBoundary>
        </React.StrictMode>
      </body>
    </html>
  );
}
