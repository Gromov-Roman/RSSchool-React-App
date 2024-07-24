import React from 'react';
import ReactDOM from 'react-dom/client';
import ThemeContextProvider from '@context/ThemeContext';
import { setupStore } from '@core/store';
import { Provider } from 'react-redux';
import App from './App';
import './index.scss';

const store = setupStore();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
        <App />
      </ThemeContextProvider>
    </Provider>
  </React.StrictMode>,
);
