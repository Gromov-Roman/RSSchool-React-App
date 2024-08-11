import React from 'react';
import { Provider } from 'react-redux';
import { setupStore } from '@core/store';
import ThemeContextProvider from '@context/ThemeContext';
import ErrorBoundary from '@components/ErrorBoundary';
import { Links, Meta, Scripts, ScrollRestoration } from '@remix-run/react';
import { LinksFunction, MetaFunction } from '@remix-run/node';
import { Outlet } from 'react-router-dom';
import './index.scss';

const store = setupStore();

// eslint-disable-next-line react-refresh/only-export-components
export const meta: MetaFunction = () => [
  { title: 'Rick and Morty' },
  {
    name: 'description',
    content: 'Rick and Morty application just for fun',
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export const links: LinksFunction = () => [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <React.StrictMode>
      <ErrorBoundary fallback={<div>Oops! Something went wrong.</div>}>
        <ThemeContextProvider>
          <Provider store={store}>
            <div id="stars" />
            <div id="stars2" />
            <div id="stars3" />
            <Outlet />
            <ScrollRestoration />
            <Scripts />
          </Provider>
        </ThemeContextProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
