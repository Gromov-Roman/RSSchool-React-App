import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@core/slices/api';
import { pagingResultsReducer } from '@core/slices/pagingResults';
import { detailReducer } from '@core/slices/detail';
import { favoritesReducer } from '@core/slices/favorites';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  pagingResultsReducer,
  detailReducer,
  favoritesReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
